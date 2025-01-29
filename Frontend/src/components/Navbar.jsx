import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './NavBar.module.css'; 
import axios from 'axios';

const NavBar = ({ loginedUser }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        if(!loginedUser)
            navigate('/');
        axios.post("http://localhost:8000/api/auth/logout",{},{withCredentials: true})
             .then(
                res => {
                console.log("logout success",res)
                navigate('/');
                }
             )
    };

    return (
        <nav className={styles.nav}>
            <ul className={styles.ul}>
            <li className={styles.li}>
                    <button 
                        className={styles.button} 
                        onClick={() => navigate('/home')}
                    >
                        Home
                    </button>
                </li>
                {loginedUser?.isAdmin && (
                    <li className={styles.li}>
                        <button 
                            className={styles.button} 
                            onClick={() => navigate('/maintenance')}
                        >
                            Maintenance
                        </button>
                    </li>
                )}
                <li className={styles.li}>
                    <button 
                        className={styles.button} 
                        onClick={() => navigate('/reports')}
                    >
                        Reports
                    </button>
                </li>
                <li className={styles.li}>
                    <button 
                        className={styles.button} 
                        onClick={() => navigate('/transactions')}
                    >
                        Transactions
                    </button>
                </li>
                <li className={styles.li}>
                    <button 
                        className={styles.button} 
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                </li>
            </ul>
        </nav>
    );
};

export default NavBar;
