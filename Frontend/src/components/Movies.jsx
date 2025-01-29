import { useEffect , useState} from "react";
import styles from "../pages/Home.module.css"
import axios from "axios";

const Movies = () => {
    const [movies,setMovies] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:8000/api/report/movies',{withCredentials:true})
        .then(response => {
            console.log(response.data);
            setMovies(response.data.data);
        }).catch(
            error => {
                console.log(error);
            }
        )
    }, []);

    return (
        <>
        <div className={styles.container}>
         <h2 className={styles.pageTitle}>List of Movies</h2>
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
                movies?.map((item)=>{
                    return(
                    <tbody>
                    <tr>
                        <td>{item.serialNumber}</td>
                        <td>{item.movieDetails.name}</td>
                        <td>{item.movieDetails.author}</td>
                        <td>{item.movieDetails.category}</td>
                        <td>{item.status}</td>
                        <td>{item.movieDetails.cost}</td>
                        <td>{item.movieDetails.procurementDate}</td>
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
export default Movies;