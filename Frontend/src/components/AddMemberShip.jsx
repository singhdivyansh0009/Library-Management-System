import React, { useState } from 'react';
import styles from './AddMemberShip.module.css';  
import { useNavigate } from 'react-router-dom';
import { calculateEndDate } from '../utils';  // Import the utility function
import axios from 'axios';

const AddMemberShip = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName:'',
        contactNo: '',
        contactAdd: '',
        aadharNo: '',
        startDate: '',
        endDate: '',
        membershipDuration: '6 Months',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        // If membershipDuration or startDate changes, recalculate the endDate
        if (name === 'membershipDuration' || name === 'startDate') {
            // Calculate the new end date based on the new start date and duration
            const updatedEndDate = calculateEndDate(
                name === 'startDate' ? value : formData.startDate, 
                name === 'membershipDuration' ? value : formData.membershipDuration
            );
            setFormData({
                ...formData,
                [name]: value,
                endDate: updatedEndDate, 
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { membershipDuration, ...dataToSend } = formData;
        axios.post("http://localhost:8000/api/admin/membership", 
            dataToSend,
            { headers: { 'Content-Type': 'application/json' } }
            ).then(res => {
                alert(res.data.message);
                console.log('Membership added successfully:', res.data)
            }).catch(err =>{
                 alert(err.response.data.message);
                 console.error('Failed to add membership:', err)
            });
        console.log('Form Submitted: ', dataToSend);
    };

    const handleCancel = () => {
        navigate('/cancel');
    };

    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit}>
                <h2 className={styles.title}>Add Membership</h2>
                <div className={styles.inputGroup}>
                    <label>First Name:</label>
                    <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className={styles.input}
                    />
                </div>
                <div className={styles.inputGroup}>
                    <label>Last Name:</label>
                    <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className={styles.input}
                    />
                </div>
                <div className={styles.inputGroup}>
                    <label>Contact No.:</label>
                    <input
                        type="text"
                        name="contactNo"
                        value={formData.contactNo}
                        onChange={handleChange}
                        className={styles.input}
                    />
                </div>
                <div className={styles.inputGroup}>
                    <label>Contact Address:</label>
                    <input
                        type="text"
                        name="contactAdd"
                        value={formData.contactAdd}
                        onChange={handleChange}
                        className={styles.input}
                    />
                </div>
                <div className={styles.inputGroup}>
                    <label>Aadhar No:</label>
                    <input
                        type="text"
                        name="aadharNo"
                        value={formData.aadharNo}
                        onChange={handleChange}
                        className={styles.input}
                    />
                </div>
                <div className={styles.inputGroup}>
                    <label>Start Date:</label>
                    <input
                        type="date"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleChange}
                        className={styles.input}
                    />
                </div>
                <div className={styles.inputGroup}>
                    <label>End Date:</label>
                    <input
                        type="date"
                        name="endDate"
                        value={formData.endDate}
                        readOnly
                        className={styles.input}
                    />
                </div>
                <div className={styles.inputGroup}>
                    <label>Membership Duration:</label>
                    <div>
                        <input
                            type="radio"
                            name="membershipDuration"
                            value="6 Months"
                            checked={formData.membershipDuration === '6 Months'}
                            onChange={handleChange}
                        />
                        <label>Six Months</label>
                    </div>
                    <div>
                        <input
                            type="radio"
                            name="membershipDuration"
                            value="1 Year"
                            checked={formData.membershipDuration === '1 Year'}
                            onChange={handleChange}
                        />
                        <label>One Year</label>
                    </div>
                    <div>
                        <input
                            type="radio"
                            name="membershipDuration"
                            value="2 Years"
                            checked={formData.membershipDuration === '2 Years'}
                            onChange={handleChange}
                        />
                        <label>Two Years</label>
                    </div>
                </div>
                <div className={styles.buttonGroup}>
                    <button type="button" onClick={handleCancel} className={styles.cancelButton}>Cancel</button>
                    <button type="submit" className={styles.confirmButton}>Confirm</button>
                </div>
            </form>
        </div>
    );
};

export default AddMemberShip;
