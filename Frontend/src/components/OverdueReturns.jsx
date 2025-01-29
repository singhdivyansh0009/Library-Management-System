import { useEffect , useState} from "react";
import styles from "../pages/Home.module.css"
import axios from "axios";
import { formatDate } from "../utils";

const OverdueReturns = () => {
    const [books,setBooks] = useState([]);

    // console.log(loginedUser);
    useEffect(() => {
        axios.get('http://localhost:8000/api/transaction/overdue-returns',{withCredentials:true})
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
         <h2 className={styles.pageTitle}>Overdue Returns</h2>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Serial No</th>
                        <th>Name</th>
                        <th>Author</th>
                        <th>Membership Id</th>
                        <th>Issue Date</th>
                        <th>Return Date</th>
                        <th>Returned On</th>
                        <th>Fine Calculated</th>
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
                        <td>{formatDate(item.returnedOn)}</td>
                        <td>{item.fine}</td>
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
export default OverdueReturns;