import axios from "axios";
import styles from "./CheckBook.module.css";
import { useEffect, useState } from "react";
import SearchResult from "./SearchResult";

const CheckBook = ({handleBookSelection}) => {
  const [formData, setFormData] = useState({
    name: "",
    author: "",
  });

  const [filteredBooks, setFilteredBooks] = useState([]);
  const [filteredAuthors, setFilteredAuthors] = useState([]);
  const [bookOptions,setBookOptions] = useState([]);
  const [authorOptions,setAuthorOptions] = useState([]);
  const [isClicked,setIsClicked] = useState(false);
  const [book,setBook] = useState();
  
  useEffect(() => {
    axios.get('http://localhost:8000/api/report/books',{withCredentials:true})
    .then(response => {
        console.log(response.data);
        const books = response.data.data.map(book => book.name);
        const authors = response.data.data.map(book => book.author);
        setBookOptions(books);
        setAuthorOptions(authors);
    }).catch(
        error => {
            console.log(error);
        }
    )
}, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === "name") {
      const matches = bookOptions.filter((book) =>
        book.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredBooks(matches);
    }

    if (name === "author") {
      const matches = authorOptions.filter((author) =>
        author.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredAuthors(matches);
    }
  };

  const handleSelectBook = (book) => {
    setFormData({ ...formData, name: book });
    setFilteredBooks([]);
  };

  const handleSelectAuthor = (author) => {
    setFormData({ ...formData, author: author });
    setFilteredAuthors([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.get(`http://localhost:8000/api/report/single-book-copies?name=${formData.name}&author=${formData.author}`,
      {withCredentials:true}
    )
    .then(response => {
        setBook(response.data.data);
        setIsClicked(true);
    }).catch(
        error => {
            console.log(error);
        }
    )
  };

  const handleCancel = () => {
    setFormData({ name: "", author: "" });
    setFilteredBooks([]);
    setFilteredAuthors([]);
  };

  return (
    
    <div className={styles.container}>
     {
        isClicked ? <SearchResult books={book}  handleBookSelection={handleBookSelection}/> :
      <form onSubmit={handleSubmit}>
        <h1 className={styles.title}>Search Book</h1>

        {/* Book Name Input */}
        <div className={styles.inputGroup}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={styles.input}
              placeholder="Enter book name"
            />
          </label>
          {filteredBooks.length > 0 && (
            <ul className={styles.dropdown}>
              {filteredBooks.map((book, index) => (
                <li
                  key={index}
                  onClick={() => handleSelectBook(book)}
                  className={styles.option}
                >
                  {book}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Author Name Input */}
        <div className={styles.inputGroup}>
          <label>
            Author Name:
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleChange}
              className={styles.input}
              placeholder="Enter author name"
            />
          </label>
          {filteredAuthors.length > 0 && (
            <ul className={styles.dropdown}>
              {filteredAuthors.map((author, index) => (
                <li
                  key={index}
                  onClick={() => handleSelectAuthor(author)}
                  className={styles.option}
                >
                  {author}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Buttons */}
        <div className={styles.buttonGroup}>
          <button type="submit" className={styles.confirmButton}>
            Search
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
    }
    </div>
  );
};

export default CheckBook;
