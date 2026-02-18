import axios from 'axios';
import BP from './assets/bp.jpg'
import { useEffect, useState } from 'react';

const apiPath = "https://ec-course-api.hexschool.io/";


export default function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [BPtoken, setToken] = useState("");

    const handlePass = (e) => {
        setPassword(e.target.value);
    }

    const handleUser = (e) => {
        setUsername(e.target.value);

    }

    const singIn = async () => {
        try {
            const res = await axios.post(`${apiPath}v2/admin/signin`, {
                username: username,
                password: password
            });
            const { token, expired } = res.data;
            setToken(token);
            document.cookie = `BPToken=${BPtoken}; expires=${new Date(expired)}; path=/`;

            axios.defaults.headers.common['Authorization'] = BPtoken;

        } catch (error) {
            console.log(error.message);
        }
    }

    // hahahaha@test.com
    // 12345678

    return (
        <>
            <div className="background d-flex align-items-center justify-content-center">
                <div className="login_style">
                    <h1 className='pt-5 text-center text-light fs-1 fw-bold'>登入</h1>
                    <div className='maininput mt-3 mb-3'>
                        <label htmlFor="mail" className='form-label text-light fs-5'>請輸入帳號</label>
                        <input type="email" value={username} id='mail' className='form-control' onChange={handleUser} placeholder='請輸入信箱' />
                        <label htmlFor="password" className='pt-3 form-label text-light fs-5'>請輸入密碼</label>
                        <input type="password" value={password} id='password' className='form-control' onChange={handlePass} placeholder='請輸入密碼' />
                    </div>
                    <div className='d-flex justify-content-center'>
                        <button className='btn btn-primary text-center fw-bold px-4 fs-6 mt-4' onClick={singIn}>送出</button>
                    </div>
                </div>
            </div>
        </>
    )

}