import React, { useState, useEffect } from 'react';
import styles from './AddMemberShip.module.css'; // Ensure you have your styles in place

const UpdateBook = () => {
    const [formData, setFormData] = useState({
        type: 'book', // Default value
        name: '',
        serialNo: '',
        status: 'Available', // Default status
        date: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });

        // Automatically populate the Serial No when the Name changes
        if (name === 'name') {
            const autoSerialNo = generateSerialNo(value); // Generate serial number based on the name
            setFormData((prevState) => ({
                ...prevState,
                serialNo: autoSerialNo
            }));
        }
    };

    const generateSerialNo = (name) => {
        // Simple serial number generation logic based on book name
        return name ? `${name.slice(0, 3).toUpperCase()}-001` : ''; // Just an example format
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData); // Here you can send this to your backend
    };

    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit}>
            <h1 className={styles.title}>Update Book</h1>
                <div className={styles.inputGroup}>
                    <label>
                        <input
                            type="radio"
                            name="type"
                            value="book"
                            checked={formData.type === 'book'}
                            onChange={handleChange}
                        />
                        Book
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="type"
                            value="movie"
                            checked={formData.type === 'movie'}
                            onChange={handleChange}
                        />
                        Movie
                    </label>
                </div>

                <div className={styles.inputGroup}>
                    <label>
                        Name:
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className={styles.input}
                        />
                    </label>
                </div>

                <div className={styles.inputGroup}>
                    <label>
                        Serial No.:
                        <input
                            type="text"
                            name="serialNo"
                            value={formData.serialNo}
                            onChange={handleChange}
                            className={styles.input}
                            readOnly
                        />
                    </label>
                </div>

                <div className={styles.inputGroup}>
                    <label>
                        Status:
                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            className={styles.input}
                        >
                            <option value="Available">Available</option>
                            <option value="Unavailable">Unavailable</option>
                            <option value="On Repair">On Repair</option>
                            <option value="To Replace">To Replace</option>
                        </select>
                    </label>
                </div>

                <div className={styles.inputGroup}>
                    <label>
                        Date:
                        <input
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            className={styles.input}
                        />
                    </label>
                </div>

                <div className={styles.buttonGroup}>
                    <button type="submit" className={styles.confirmButton}>Submit</button>
                    <button type="button" className={styles.cancelButton}>Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default UpdateBook;
