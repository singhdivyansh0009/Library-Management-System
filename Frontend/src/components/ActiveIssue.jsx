import { useEffect , useState} from "react";
// import { useNavigate } from "react-router-dom";
import styles from "../pages/Home.module.css"
import axios from "axios";
import { formatDate } from "../utils";

const ActiveIssue = () => {
    const [books,setBooks] = useState([]);

    // console.log(loginedUser);
    useEffect(() => {
        axios.get('http://localhost:8000/api/transaction/all-active-issues',{withCredentials:true})
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
         <h2 className={styles.pageTitle}>Active Book issues</h2>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Serial No</th>
                        <th>Name</th>
                        <th>Author</th>
                        <th>Membership Id</th>
                        <th>Issue Date</th>
                        <th>Return Date</th>
                    </tr>
                </thead>
                {
                books?.map((item)=>{
                    return(
                    <tbody>
                    <tr>
                        <td>{item.copyDetails.serialNumber}</td>
                        <td>{item.bookDetails.name}</td>
                        <td>{item.bookDetails.author}</td>
                        <td>{item.member}</td>
                        <td>{formatDate(item.issueDate)}</td>
                        <td>{formatDate(item.returnDate)}</td>
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
export default ActiveIssue;