import styles from "../pages/Home.module.css"

const SearchResult = ({ books, handleBookSelection}) => {
    const handleSelection = (book) => {
        handleBookSelection(book); 

    };

    return (
        <>
            <div className={styles.container}>
                <h2 className={styles.pageTitle}>List of Books</h2>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Book Name</th>
                            <th>Author Name</th>
                            <th>Serial Number</th>
                            <th>Available</th>
                            <th>Issue the book</th>
                        </tr>
                    </thead>
                    <tbody>
                        {books?.map((book) => (
                            <tr key={book.serialNumber}>
                                <td>{book.bookDetails.name}</td>
                                <td>{book.bookDetails.author}</td>
                                <td>{book.serialNumber}</td>
                                <td>{book.status}</td>
                                <td>
                                    <input
                                        type="radio"
                                        name="bookSelection"
                                        onClick={() => handleSelection(book)}
                                    />
                                    Issue
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default SearchResult;
