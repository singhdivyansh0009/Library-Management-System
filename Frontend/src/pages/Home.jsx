import { useEffect, useState } from "react";
import NavBar from "../components/Navbar";
import styles from './Home.module.css';  
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = ({loginedUser}) => {
    const [products,setProducts] = useState(null);
    const navigate = useNavigate();
    
    console.log(loginedUser);
    useEffect(() => {
        if(!loginedUser)
            navigate('/');

        axios.get('http://localhost:8000/api/report/products',{withCredentials:true})
        .then(response => {
            console.log(response.data);
            setProducts(response.data.products);
        }).catch(
            error => {
                console.log(error);
            }
        )
    }, []);

    return (
        <>
        <NavBar loginedUser = {loginedUser} />
        <div className={styles.container}>
            {
                loginedUser?.isAdmin ? <h2 className={styles.pageTitle}>Admin Homepage</h2> : <h1 className={styles.pageTitle}>Home Page</h1>
            }
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Code No From</th>
                        <th>Code No To</th>
                        <th>Category</th>
                    </tr>
                </thead>
                {
                products?.map((item)=>{
                    return(
                    <tbody>
                    <tr>
                        <td>{item.start}</td>
                        <td>{item.end}</td>
                        <td>{item.category}</td>
                    </tr>
                    </tbody>
                    )
                })    
                }
            </table>
        </div>
      </>
    );
};

export default Home;
