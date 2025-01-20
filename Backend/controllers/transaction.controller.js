import { Book } from "../models/book.model";
import { BookIssue } from "../models/overdue.model";

export const checkBookAvailability = async (req, res) => {
  try {
    const { bookName } = req.body;

    // Find the book from the database (example: "Book" model)
    const book = await Book.findOne({ name: bookName });

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    const isAvailable = book.status === "Available"; // Assuming status field

    return res.status(200).json({
      success: true,
      isAvailable,
      message: isAvailable ? "Book is available" : "Book is not available",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error checking book availability",
      details: error.message,
    });
  }
};

export const issueBook = async (req, res) => {
  try {
    const { bookName, author, issueDate, returnDate, membershipId } = req.body;

    if (!bookName || !author || !issueDate || !returnDate || !membershipId) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    const newIssue = new BookIssue({
      nameOfBook: bookName,
      membershipId,
      daateOfIssue: issueDate,
      dateOfReturn: returnDate,
    });

    await newIssue.save();

    return res.status(201).json({
      success: true,
      message: "Book issued successfully",
      bookIssue: newIssue,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error issuing book",
      details: error.message,
    });
  }
};

export const returnBook = async (req, res) => {
  try {
    const { bookName, serialNo, returnDate } = req.body;

    if (!bookName || !serialNo || !returnDate) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    const bookIssue = await BookIssue.findOne({ serialNo });
    if (!bookIssue) {
      return res.status(404).json({
        success: false,
        message: "Book issue not found",
      });
    }

    bookIssue.returnDate = returnDate;

    await bookIssue.save();

    return res.status(200).json({
      success: true,
      message: "Book returned successfully",
      bookIssue,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error returning book",
      details: error.message,
    });
  }
};

export const payFine = async (req, res) => {
  try {
    const { user, bookName, finePaid, paidOn } = req.body;

    if (!bookName || !serialNo || !finePaid) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    const bookIssue = await BookIssue.findOne({ bookName });
    if (!bookIssue) {
      return res.status(404).json({
        success: false,
        message: "Book issue not found",
      });
    }

    bookIssue.user = user;
    bookIssue.amount = finePaid;
    bookIssue.paidOn = Date.now();

    await bookIssue.save();

    return res.status(200).json({
      success: true,
      message: "Fine paid successfully",
      bookIssue,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error paying fine",
      details: error.message,
    });
  }
};
