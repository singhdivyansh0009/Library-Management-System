import React, { useState } from 'react';
import styles from "./Maintenance.module.css";
import NavBar from "../components/NavBar";
import AddMemberShip from "../components/AddMemberShip";
import AddBook from "../components/AddBook";
import AddUser from "../components/AddUser";

const Maintenance = () => {
    const [showAddMembership, setShowAddMembership] = useState(false);
    const [showAddBook, setShowAddBook] = useState(false);
    const [showAddUser, setShowAddUser] = useState(false);

    const openAddMembership = () => {
        setShowAddMembership(true);
    };
    
    const openAddBook = () => {
        setShowAddBook(true);
    };

    const openAddUser = () => {
        setShowAddUser(true);
    };

    return (
        <>
            <NavBar />
            <div className={styles.container}>
                <h2>Housekeeping</h2>
                
                <div className={styles.lists}>
                    <span>Membership</span>
                    {showAddMembership && <AddMemberShip />}
                    <div>
                        <button onClick={openAddMembership}>Add</button>
                        <button>Update</button>
                    </div>
                </div>

                <div className={styles.lists}>
                    <span>Book/Movies</span>
                    {showAddBook && <AddBook />}
                    <div>
                        <button onClick={openAddBook}>Add</button>
                        <button>Update</button>
                    </div>
                </div>

                <div className={styles.lists}>
                    <span>User Management</span>
                    {showAddUser && <AddUser />}
                    <div>
                        <button onClick={openAddUser}>Add</button>
                        <button>Update</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Maintenance;
