import { useEffect } from "react";
import NavBar from "../components/NavBar";
import styles from './Home.module.css';  

const Home = ({ isAdmin }) => {

    useEffect(() => {
        // Add your useEffect logic here if needed in the future
    }, []);

    return (
        <>
        <NavBar />
        <div className={styles.container}>
            {
                isAdmin ? <h2 className={styles.pageTitle}>Admin Homepage</h2> : <h1 className={styles.pageTitle}>Home Page</h1>
            }
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Code No From</th>
                        <th>Code No To</th>
                        <th>Category</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>001</td>
                        <td>010</td>
                        <td>Electronics</td>
                    </tr>
                    <tr>
                        <td>011</td>
                        <td>020</td>
                        <td>Clothing</td>
                    </tr>
                    <tr>
                        <td>021</td>
                        <td>030</td>
                        <td>Home Appliances</td>
                    </tr>
                </tbody>
            </table>
        </div>
      </>
    );
};

export default Home;
