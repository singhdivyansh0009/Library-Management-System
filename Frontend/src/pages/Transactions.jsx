import React, { useState } from "react";
import styles from "./Reports.module.css"; // Import modular CSS
import CheckBook from "../components/CheckBook";
import IssueBook from "../components/IssueBook";
import NavBar from "../components/Navbar";
import PayFine from "../components/PayFine";
import ReturnBook from "../components/ReturnBook";

const Transaction = ({ loginedUser }) => {
  const [activeComponent, setActiveComponent] = useState("Book Aviability");
  const [selectedBook, setSelectedBook] = useState(null);
  const handleBookSelection = (book) => {
      setSelectedBook(book); 
      setActiveComponent("Issue Book");
  };

  const handleReturnedBook = (book) => {
    console.log(book);
    setSelectedBook(book);
    setActiveComponent("Pay Fine");
  };

  const renderComponent = () => {
    switch (activeComponent) {
      case "Book Aviability":
        return <CheckBook 
                handleBookSelection={handleBookSelection} 
                />;
      case "Issue Book":
        return <IssueBook selectedBook={selectedBook}/>;
      case "Return Book":
        return <ReturnBook handleReturnedBook={handleReturnedBook}/>;
      case "Pay Fine":
        return <PayFine returnedBook={selectedBook}/>;
      default:
        return <CheckBook />;
    }
  };

  return (
    <>
      <NavBar loginedUser={loginedUser} />
      <div className={styles.container}>
        {/* Menu Section */}
        <ul className={styles.menu}>
          {["Book Aviability", "Issue Book", "Return Book", "Pay Fine"].map((item) => (
            <li key={item} className={styles.menuItem}>
              <button
                className={`${styles.menuButton} ${
                  activeComponent === item ? styles.active : ""
                }`}
                onClick={() => setActiveComponent(item)}
               >
                {item}
              </button>
            </li>
          ))}
        </ul>

        {/* Content Section */}
        <div className={styles.content}>{renderComponent()}</div>
      </div>
    </>
  );
};

export default Transaction;
