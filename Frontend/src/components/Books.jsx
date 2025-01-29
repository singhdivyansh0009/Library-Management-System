import { useEffect , useState} from "react";
// import { useNavigate } from "react-router-dom";
import styles from "../pages/Home.module.css"
import axios from "axios";

const Books = () => {
    const [books,setBooks] = useState(null);

    // console.log(loginedUser);
    useEffect(() => {
        axios.get('http://localhost:8000/api/report/book-copies',{withCredentials:true})
        .then(response => {
            console.log(response.data);
            setBooks(response.data.data);
        }).catch(
            error => {
                console.log(error);
            }
        )
    }, []);

    return (
        <>
        <div className={styles.container}>
         <h2 className={styles.pageTitle}>List of Books</h2>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Serial No</th>
                        <th>Name</th>
                        <th>Author Name</th>
                        <th>Category</th>
                        <th>Status</th>
                        <th>Cost</th>
                        <th>Procurement Date</th>
                    </tr>
                </thead>
                {
                books?.map((item)=>{
                    return(
                    <tbody>
                    <tr>
                        <td>{item.serialNumber}</td>
                        <td>{item.bookDetails.name}</td>
                        <td>{item.bookDetails.author}</td>
                        <td>{item.bookDetails.category}</td>
                        <td>{item.status}</td>
                        <td>{item.bookDetails.cost}</td>
                        <td>{item.bookDetails.procurementDate}</td>
                    </tr>
                    </tbody>
                    )
                })    
                }
            </table>
        </div>
      </>
    );
}
export default Books;