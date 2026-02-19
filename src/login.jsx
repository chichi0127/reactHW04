import axios from 'axios';
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

        </>
    )

}