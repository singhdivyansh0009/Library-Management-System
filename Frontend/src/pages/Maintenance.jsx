import React, { useEffect, useState } from 'react';
import styles from "./Maintenance.module.css";
import NavBar from "../components/Navbar";
import AddMemberShip from "../components/AddMemberShip";
import AddBook from "../components/AddBook";
import UserManagement from "../components/UserManagement";
import UpdateMembership from '../components/UpdateMemberShip';
import UpdateBook from '../components/UpdateBook';
import { useNavigate } from 'react-router-dom';

const Maintenance = ({loginedUser}) => {
    const [showAddMembership, setShowAddMembership] = useState(false);
    const [showUpdateMembership, setShowUpdateMembership] = useState(false);
    const [showUpdateBook, setShowUpdateBook] = useState(false);
    const [showAddBook, setShowAddBook] = useState(false);
    const [showAddUser, setShowAddUser] = useState(false);

    const openAddMembership = () => {
        setShowAddMembership(true);
        setShowUpdateMembership(false);
    };

    const openUpdateMembership = () => {
        setShowUpdateMembership(true);
        setShowAddMembership(false);
    }
    
    const openAddBook = () => {
        setShowAddBook(true);
        setShowUpdateBook(false);
    };
    const openUpdateBook = () => {
        setShowAddBook(false);
        setShowUpdateBook(true);
    }

    const openAddUser = () => {
        setShowAddUser(true);
    };

    const navigate = useNavigate();
    useEffect(()=>{
        if(!loginedUser)
            navigate('/')
    },[])

    return (
        <>
            <NavBar loginedUser = {loginedUser} />
            <div className={styles.container}>
                <h2>Housekeeping</h2>
                
                <div className={styles.lists}>
                    <span>Membership</span>
                    {showAddMembership && <AddMemberShip />}
                    {showUpdateMembership && <UpdateMembership/>}
                    <div>
                        <button onClick={openAddMembership}>Add</button>
                        <button onClick={openUpdateMembership}>Update</button>
                    </div>
                </div>

                <div className={styles.lists}>
                    <span>Book/Movies</span>
                    {showAddBook && <AddBook />}
                    {showUpdateBook && <UpdateBook/>}
                    <div>
                        <button onClick={openAddBook}>Add</button>
                        <button onClick={openUpdateBook}>Update</button>
                    </div>
                </div>

                <div className={styles.lists}>
                    <span>User Management</span>
                    {showAddUser && <UserManagement />}
                    <div>
                        <button onClick={openAddUser}>Add/Update</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Maintenance;
