import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './NavBar.module.css'; 

const NavBar = ({ isAdmin = true }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate('/');
    };

    return (
        <nav className={styles.nav}>
            <ul className={styles.ul}>
                {isAdmin && (
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
                        onClick={() => navigate(-1)}
                    >
                        Back
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
