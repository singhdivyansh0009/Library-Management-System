import styles from './Login.module.css'; 
import { useState } from 'react';
import axios from 'axios';
import {useNavigate } from 'react-router-dom';

const Login = ({handleLoginUser}) => {
   const [loginData, setLoginData] = useState({ userId: '', password: '' });
   const [message,setMessage] = useState('');
   const navigate = useNavigate();

   const handleInputChange = (e) => {
      const { name, value } = e.target;
      setLoginData({ ...loginData, [name]: value });
   };

   const handleLogin = () => {
         axios.post('http://localhost:8000/api/auth/login', loginData , {withCredentials:true})
              .then((res) => { 
               console.log(res.data.data);
               handleLoginUser(res.data.data);
               navigate('/home');
            })
            .catch((err) => { 
               setMessage(err.response.data.message);
               console.log(err)
            });
   };

   return (
      <div className={styles.container}>
         <h1 className={styles.title}>Library Management System</h1>
         <input 
            type="text" 
            name="userId" 
            className={styles.inputField} 
            placeholder='userId' 
            value={loginData.userId} 
            onChange={handleInputChange} 
         />
         <input 
            type="password" 
            name="password" 
            className={styles.inputField} 
            placeholder='password' 
            value={loginData.password} 
            onChange={handleInputChange} 
         />
         <p style={{color:"red"}}>{message}</p>
         <div className={styles.btnContainer}>
            <button className={styles.button}>Cancel</button>
            <button className={styles.button} onClick={handleLogin}>Login</button>
         </div>
      </div>
   );
};

export default Login;
