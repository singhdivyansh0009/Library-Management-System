import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./CheckBook.module.css";
import { formatDate } from "../utils";

const PayFine = ({returnedBook}) => {
  
  const [formData, setFormData] = useState({
    serialNumber:returnedBook?.book||"",
    name:"",
    author:"",
    issueDate:returnedBook?.issueDate||"",
    returnDate:returnedBook?.returnedOn||"",
    fine:returnedBook?.fine||"",
    remarks:"",
  });

  const [serialOptions, setSerialOptions] = useState([]);
  const [filteredSerialOptions, setFilteredSerialOptions] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/report/book-copies", { withCredentials: true })
      .then((response) => {
        console.log(response.data.data);
        const books = response.data.data.map((book) => ({
          serialNumber: book.serialNumber,
          name: book.bookDetails.name,
          author: book.bookDetails.author,
        }));
        setSerialOptions(books);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleSerialChange = (e) => {
    const inputValue = e.target.value;
    setFormData({ ...formData, serialNumber: inputValue });

    // Filter serial numbers based on user input
    const filteredOptions = serialOptions.filter((book) =>
      book.serialNumber.toLowerCase().includes(inputValue.toLowerCase())
    );
    
    setFilteredSerialOptions(filteredOptions);
  };

  const handleSerialSuggestionClick = (book) => {
    // Set the form data based on the selected book
    axios.get(
      `http://localhost:8000/api/transaction/active-issue?serialNumber=${book.serialNumber}`,
       {withCredentials:true}
    )
    .then(res => {
        console.log(res.data.data)
        setFormData({ ...formData, 
                    serialNumber: book.serialNumber, 
                    name: book.name, 
                    author: book.author,
                    issueDate: formatDate(res.data.data.issueDate),
                    returnDate: formatDate(res.data.data.returnDate),
                    fine:res.data.data.fine
            })
            setFilteredSerialOptions([]);
            alert(res.data.message);
         })
         .catch(err => console.log(err));
  };

  const handleDateChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => {
      const updatedData = { ...prevData, [name]: value };

      if (name === "issueDate") {
        const issueDate = new Date(value);
        const returnDate = new Date(issueDate);
        returnDate.setDate(returnDate.getDate() + 15);
        updatedData.returnDate = returnDate.toISOString().split("T")[0];
      }

      return updatedData;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('formData:',formData);
    axios
      .post(
        `http://localhost:8000/api/transaction/return-book`,
        formData,
        { withCredentials: true }
      )
      .then((response) => {
        console.log("Fine paid successfully:", response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleCancel = () => {
    setFormData({
      serialNumber: "",
      name: "",
      author: "",
      issueDate: "",
      returnDate: "",
      remarks: "",
    });
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <h1 className={styles.title}>Return Book</h1>

        {/* Serial Number Input with Suggestions */}
        <div className={styles.inputGroup}>
          <label>
            Serial No.:
            <input
              type="text"
              name="serialNumber"
              value={formData.serialNumber}
              onChange={handleSerialChange}
              // onFocus={() => setShowSuggestions(true)}
              // onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              className={styles.input}
              placeholder="Enter Serial No."
            />
          </label>
           {filteredSerialOptions.length > 0 && (
              <ul className={styles.dropdown}>
                {filteredSerialOptions.map((book, index) => (
                  <li
                    key={index}
                    onClick={() => handleSerialSuggestionClick(book)}
                    className={styles.option}
                  >
                    {book.serialNumber}
                  </li>
                ))}
              </ul>
          )}
        </div>

        {/* Book Name (Non-editable) */}
        <div className={styles.inputGroup}>
          <label>
            Book Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              readOnly
              className={styles.input}
            />
          </label>
        </div>

        {/* Author Name (Non-editable) */}
        <div className={styles.inputGroup}>
          <label>
            Author Name:
            <input
              type="text"
              name="author"
              value={formData.author}
              readOnly
              className={styles.input}
            />
          </label>
        </div>

        {/* Issue Date */}
        <div className={styles.inputGroup}>
          <label>
            Issue Date:
            <input
              type="date"
              name="issueDate"
              value={formData.issueDate}
              onChange={handleDateChange}
              className={styles.input}
              readOnly
              max={new Date().toISOString().split("T")[0]}
            />
          </label>
        </div>
        {/* Return Date */}
        <div className={styles.inputGroup}>
          <label>
            Return Date:
            <input
              type="date"
              name="returnDate"
              value={formData.returnDate}
              onChange={(e) =>
                setFormData({ ...formData, returnDate: e.target.value })
              }
              readOnly
              className={styles.input}
            />
          </label>
        </div>

         <div className={styles.inputGroup}>
          <label>
            Fine :
            <input
              type="number"
              name="fine"
              value={formData.fine}
              onChange={(e) =>
                setFormData({ ...formData, fine: e.target.value })
              }
              className={styles.input}
            />
          </label>
        </div>

        {/* Remarks */}
        <div className={styles.inputGroup}>
          <label>
            Remarks:
            <input
              type="text"
              name="remarks"
              value={formData.remarks}
              onChange={(e) =>
                setFormData({ ...formData, remarks: e.target.value })
              }
              className={styles.input}
              placeholder="Enter remarks"
            />
          </label>
        </div>

        {/* Buttons */}
        <div className={styles.buttonGroup}>
          <button type="submit" className={styles.confirmButton}>
            Confirm
          </button>
          <button
            type="button"
            className={styles.cancelButton}
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default PayFine;
