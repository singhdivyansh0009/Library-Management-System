import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import styles from './UserManagement.module.css';  
import axios from 'axios';

const UserManagement = () => {
    const navigate = useNavigate();  
    const [formData, setFormData] = useState({
        userType: 'new',
        name: '',
        userId: '',
        status: false,
        isAdmin: false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        // Handling input field changes
        if (type === 'checkbox') {
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

    const handleRadioChange = (e) => {
        const { value } = e.target;
        setFormData({
            ...formData,
            userType: value,
            name: '', // Reset name when switching user types
            userId: '', // Reset userId when switching user types
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/admin/usermanagement', 
                    formData,
                    {withCredentials:true}
            )
            .then(res => console.log('User added successfully:', res.data))
            .catch(err => console.error('Failed to add user:', err));
    };

    // Handle cancel action (could reset form or navigate to another page)
    const handleCancel = () => {
        // Reset the form fields to initial state
        setFormData({
            userType: 'new',
            name: '',
            userId: '',
            status: false,
            isAdmin: false,
        });

        navigate('/cancel'); 
    };

    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit}>
            <h1 className={styles.title}>User Management</h1>
                {/* Radio Buttons for New or Existing User */}
                <div className={styles.inputGroup}>
                    <label>
                        <input
                            type="radio"
                            name="userType"
                            value="new"
                            checked={formData.userType === 'new'}
                            onChange={handleRadioChange}
                        />
                        New User
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="userType"
                            value="existing"
                            checked={formData.userType === 'existing'}
                            onChange={handleRadioChange}
                        />
                        Existing User
                    </label>
                </div>

                {/* Name Field for New User or UserID for Existing User */}
                <div className={styles.inputGroup}>
                    <label>
                        {formData.userType === 'new' ? 'Name' : 'User ID'}:
                        <input
                            type="text"
                            name={formData.userType === 'new' ? 'name' : 'userId'}
                            value={formData.userType === 'new' ? formData.name : formData.userId}
                            onChange={handleChange}
                            className={styles.input}
                            required
                        />
                    </label>
                </div>

                {/* Active Checkbox */}
                <div className={styles.inputGroup}>
                    <label>
                        <input
                            type="checkbox"
                            name="status"
                            checked={formData.status}
                            onChange={handleChange}
                        />
                        Active
                    </label>
                </div>

                {/* Admin Checkbox */}
                <div className={styles.inputGroup}>
                    <label>
                        <input
                            type="checkbox"
                            name="isAdmin"
                            checked={formData.isAdmin}
                            onChange={handleChange}
                        />
                        Admin
                    </label>
                </div>

                {/* Button Group */}
                <div className={styles.buttonGroup}>
                    <button type="submit" className={styles.confirmButton}>Submit</button>
                    <button type="button" className={styles.cancelButton} onClick={handleCancel}>Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default UserManagement;
