import { StrictMode, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap'
import './assets/all.scss'
import axios from 'axios'


const apiBase = import.meta.env.VITE_API_BASE;
const apiPath = import.meta.env.VITE_API_PATH;


function Main() {

  const [isAuth, setIsAuth] = useState(false);
  const [BPtoken, setToken] = useState("");
  const [user, setUser] = useState({
    username: '',
    password: ''
  })


  const handleUser = (e) => {
    const { name, value } = e.target;
    setUser((pre) => ({
      ...pre,
      [name]: value,
    }));

  }

  const signIn = async () => {
    try {
      const res = await axios.post(`${apiBase}v2/admin/signin`, user);
      const { token, expired } = res.data;
      setToken(token);

      document.cookie = `BPToken=${token}; expires=${new Date(expired)}; path=/`;

      axios.defaults.headers.common['Authorization'] = token;

      setIsAuth(true);

    } catch (error) {
      console.log(error.message);
      setIsAuth(false);
    }
  }

  useEffect(() => {

    const BPCookie = document.cookie.replace(
      /(?:(?:^|.*;\s*)BPToken\s*\=\s*([^;]*).*$)|^.*$/,
      "$1",
    );

    if (!BPCookie) {
      setIsAuth(false);
      return;
    }

    axios.defaults.headers.common['Authorization'] = BPCookie;

    const checkLogin = async () => {
      try {
        const res = await axios.post(`${apiBase}v2/api/user/check`);

        console.log(res.data);

        setIsAuth(true);
      } catch (error) {
        setIsAuth(false);
      }
    }

    checkLogin();


  }, [])
  // function Main() {
  //   const apiPath = "https://ec-course-api.hexschool.io/";
  //   const [isAuth, setIsAuth] = useState(false);


  //   useEffect(() => {
  //     const BPCookie = document.cookie.replace(
  //       /(?:(?:^|.*;\s*)BPToken\s*\=\s*([^;]*).*$)|^.*$/,
  //       "$1",
  //     );
  //     if (!BPCookie) {
  //       setIsAuth(false);
  //       return;
  //     }

  //     axios.defaults.headers.common['Authorization'] = BPCookie;

  //     axios.post(`${apiPath}v2/api/user/check`)
  //       .then((res) => {
  //         console.log(res.data);
  //         setIsAuth(true);
  //       })
  //       .catch((error) => {
  //         setIsAuth(false);
  //       })

  //   }, [])

  return (
    <>
      {isAuth ? <App /> : <div className="background d-flex align-items-center justify-content-center">
        <div className="login_style">
          <h1 className='pt-5 text-center text-light fs-1 fw-bold'>登入</h1>
          <div className='maininput mt-3 mb-3'>
            <label htmlFor="mail" className='form-label text-light fs-5'>請輸入帳號</label>
            <input type="email" name='username' value={user.username} id='mail' className='form-control' onChange={handleUser} placeholder='請輸入信箱' />
            <label htmlFor="password" className='pt-3 form-label text-light fs-5'>請輸入密碼</label>
            <input type="password" name='password' value={user.password} id='password' className='form-control' onChange={handleUser} placeholder='請輸入密碼' />
          </div>
          <div className='d-flex justify-content-center'>
            <button className='btn btn-primary text-center fw-bold px-4 fs-6 mt-4' onClick={signIn}>送出</button>
          </div>
        </div>
      </div>}
    </>
  )

}



createRoot(document.getElementById('root')).render(
  <StrictMode>

    <Main />

  </StrictMode>,
)
