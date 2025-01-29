import { useEffect , useState} from "react";
import { useNavigate } from "react-router-dom";
import styles from "../pages/Home.module.css"
import axios from "axios";

const Members = () => {
    const [members,setMembers] = useState(null);

    // console.log(loginedUser);
    useEffect(() => {
        axios.get('http://localhost:8000/api/report/members',{withCredentials:true})
        .then(response => {
            console.log(response.data);
            setMembers(response.data.data);
        }).catch(
            error => {
                console.log(error);
            }
        )
    }, []);

    return (
        <>
        <div className={styles.container}>
         <h2 className={styles.pageTitle}>List of Membership</h2>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Membership Id</th>
                        <th>Name</th>
                        <th>Contact No.</th>
                        <th>Contact Add.</th>
                        <th>Aadhar No.</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Status</th>
                        <th>Fine Pending</th>
                    </tr>
                </thead>
                {
                members?.map((item)=>{
                    return(
                    <tbody>
                    <tr>
                        <td>{item.memberShipId}</td>
                        <td>{item.name}</td>
                        <td>{item.contactNo}</td>
                        <td>{item.contactAdd}</td>
                        <td>{item.aadharNo}</td>
                        <td>{item.startDate}</td>
                        <td>{item.endDate}</td>
                        <td>Active</td>
                        <td>{item.amountPending}</td>
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

export default Members;