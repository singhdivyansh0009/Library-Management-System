import React, { useState } from 'react';
import styles from './AddMemberShip.module.css';  
import { useNavigate } from 'react-router-dom';
import { calculateEndDate } from '../utils';  // Import the utility function
import axios from 'axios';

const UpdateMembership = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        memberShipId: '',
        startDate: '',
        endDate: '',
        membershipDuration: '6 Months',
        removeMembership: false, // Checkbox for removing membership
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

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
        } else if (type === 'checkbox') {
            setFormData({
                ...formData,
                [name]: checked, 
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
        const { removeMembership, ...dataToSend } = formData;
        
        // If the checkbox is checked, you might want to handle removal logic
        if (removeMembership) {
            // Make a delete request or handle removal logic here
            axios.delete(`http://localhost:8000/api/admin/membership/${dataToSend.memberShipId}`,
                {withCredentials:true}
            )
            .then(res => {
                console.log(res),
                alert(res.data.message)
            })
            .catch(err => alert(err.response.data.message));
        } else {
            // Proceed with the update or addition
            axios.patch("http://localhost:8000/api/admin/membership", 
                         dataToSend,
                         {withCredentials:true}
                )
                .then(res => {
                    alert(res.message);
                    console.log('Membership updated successfully:', res.data)}
                )
                .catch(err => console.error('Failed to update membership:', err));
        }
        console.log('Form Submitted: ', dataToSend);
    };

    const handleCancel = () => {
        navigate('/cancel');
    };

    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit}>
                <h2 className={styles.title}>Update Membership</h2>
                
                <div className={styles.inputGroup}>
                    <label>Membership ID:</label>
                    <input
                        type="text"
                        name="memberShipId"
                        value={formData.memberShipId}
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
                    <label>Membership Extention:</label>
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

                {/* Remove Membership Checkbox */}
                <div className={styles.inputGroup}>
                    <label>
                        <input
                            type="checkbox"
                            name="removeMembership"
                            checked={formData.removeMembership}
                            onChange={handleChange}
                        />
                        Remove Membership
                    </label>
                </div>

                <div className={styles.buttonGroup}>
                    <button type="button" onClick={handleCancel} className={styles.cancelButton}>Cancel</button>
                    <button type="submit" className={styles.confirmButton}>Confirm</button>
                </div>
            </form>
        </div>
    );
};

export default UpdateMembership;
