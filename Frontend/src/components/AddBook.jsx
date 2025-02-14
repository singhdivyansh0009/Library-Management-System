import React, { useState } from 'react';
import styles from './AddBook.module.css'; // Import the CSS module
import axios from 'axios';
const AddBook = () => {
    const [formData, setFormData] = useState({
        type: 'book',
        name: '',
        procurementDate: '',
        quantity: '',
        category: '',
        author: '',
        cost:'',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const {type,...dataToSend} = formData;
        if(type === 'book'){
           axios.post("http://localhost:8000/api/admin/book",dataToSend,{withCredentials:true})
             .then(res => {
              console.log(res);
              alert(res.data.message);
           })
           .catch(err => console.log(err));
        }else{
            axios.post("http://localhost:8000/api/admin/movie",dataToSend,{withCredentials:true})
            .then(res => {
             console.log(res);
             alert(res.data.message);
          })
          .catch(err => console.log(err));
        }

    };

    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit}>
            <h1 className={styles.title}>Add Book/Movie</h1>
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
                        Date of Procurement:
                        <input
                            type="date"
                            name="procurementDate"
                            value={formData.date}
                            onChange={handleChange}
                            className={styles.input}
                        />
                    </label>
                </div>

                <div className={styles.inputGroup}>
                    <label>
                        Copies:
                        <input
                            type="number"
                            name="quantity"
                            value={formData.copies}
                            onChange={handleChange}
                            className={styles.input}
                        />
                    </label>
                </div>

                <div className={styles.inputGroup}>
                    <label>
                        Category:
                        <input
                            type="text"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className={styles.input}
                        />
                    </label>
                </div>

                <div className={styles.inputGroup}>
                    <label>
                        Author name:
                        <input
                            type="text"
                            name="author"
                            value={formData.author}
                            onChange={handleChange}
                            className={styles.input}
                        />
                    </label>
                </div>
                <div className={styles.inputGroup}>
                    <label>
                        Cost:
                        <input
                            type="text"
                            name="cost"
                            value={formData.cost}
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

export default AddBook;
