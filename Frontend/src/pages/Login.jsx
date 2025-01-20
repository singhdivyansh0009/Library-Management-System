import styles from './Login.module.css'; 
import { useState } from 'react';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';

const Login = () => {
   const [loginData, setLoginData] = useState({ userId: '', password: '' });
   const navigate = useNavigate();

   const handleInputChange = (e) => {
      const { name, value } = e.target;
      setLoginData({ ...loginData, [name]: value });
   };

   const handleLogin = async () => {
      try {
         // const response = await axios.post('/api/login', loginData);
         // console.log('Login successful:', response.data);
         navigate('/home');
      } catch (error) {
         console.error('Login failed:', error);
      }
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
         <div className={styles.btnContainer}>
            <button className={styles.button}>Cancel</button>
            <button className={styles.button} onClick={handleLogin}>Login</button>
         </div>
      </div>
   );
};

export default Login;
