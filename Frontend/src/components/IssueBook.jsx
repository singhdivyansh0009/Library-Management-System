import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./CheckBook.module.css";

const IssueBook = ({ selectedBook }) => {
  const [formData, setFormData] = useState({
    serialNumber: selectedBook?.serialNumber || "",
    name: selectedBook?.bookDetails?.name || "",
    author: selectedBook?.bookDetails?.author || "",
    issueDate: "",
    returnDate: "",
    remarks: "",
    memberShipId:"",
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
    // setShowSuggestions(true);
  };

  const handleSerialSuggestionClick = (book) => {
    // Set the form data based on the selected book
    setFormData({
      ...formData,
      serialNumber: book.serialNumber,
      name: book.name,
      author: book.author,
    });

    setFilteredSerialOptions([]);
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
        `http://localhost:8000/api/transaction/issue-book`,
        formData,
        { withCredentials: true }
      )
      .then((response) => {
        console.log("Book issued successfully:", response.data.data);
        alert(response.data.message);
      })
      .catch((error) => {
        console.log(error);
        alert(error.response.data.message);
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
    // setShowSuggestions(false);
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <h1 className={styles.title}>Issue Book</h1>

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
              className={styles.input}
            />
          </label>
        </div>

        <div className={styles.inputGroup}>
          <label>
          MemberShip Id:
            <input
              type="text"
              name="memberShipId"
              value={formData.memberShipId}
              className={styles.input}
              onChange={handleDateChange}
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
            Issue Book
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

export default IssueBook;
