import { User } from "../models/user.model.js";
import { Book } from "../models/book.model.js";
import { Movie } from "../models/movie.model.js";
import { Request } from "../models/requestissue.model.js";
import { BookIssue } from "../models/overdue.model.js";
import { Fine } from "../models/fine.model.js";
import { Transaction } from "../models/transaction.model.js";

export const getAllUser = async (req, res) => {
    try
    {
        const user = await User.find();
        if(!user) return res.status(404).json({ error: "User not found" });
        res.status(200).json({ status: true,data:user, message: "User found" });
    }
    catch(e)
    {
        return res.status(500).json({ error: "Error getting active user", details: e.message });
    }
};

export const getAllMovie = async (req, res) => {
    try
    {
        const movie = await Movie.find();
        if(!movie) return res.status(404).json({ error: "Movie not found" });
        res.status(200).json({ status: true,data:movie, message: "Movie found" });
    }
    catch(e)
    {
        return res.status(500).json({ error: "Error getting active movie", details: e.message });
    }
};

export const getAllBook = async (req, res) => {
    try
    {
        const book = await Book.find();
        if(!book) return res.status(404).json({ error: "Book not found" });
        res.status(200).json({ status: true,data:book, message: "Book found" });
    }
    catch(e)
    {
        return res.status(500).json({ error: "Error getting active book", details: e.message });
    }
};

export const getMemberUser = async (req, res) => {
    try
    {
        const user = await User.find({role: "Member"});
        if(!user) return res.status(404).json({ error: "User not found" });
        res.status(200).json({ status: true,data:user, message: "Member user found" });
    }
    catch(e)
    {
        return res.status(500).json({ error: "Error getting member user", details: e.message });
    }
};

export const getActiveIssues = async (req, res) => {
    try
    {
        const books = await Book.find({status: "Unavailable"});
        if(!books) return res.status(404).json({ error: "Book not found" });
        return res.status(200).json({ status: true,data:books, message: "Active issues found" });
    }
    catch(e)
    {
        return res.status(500).json({ error: "Error getting active issues", details: e.message });
    }
};

export const getPendingRequests = async (req, res) => {
    try {
        // Find all requests where requestFulfilledDate is not set (i.e., pending requests)
        const pendingRequests = await Request.find({
            requestFulfilledDate: { $exists: false }
        });

        if (pendingRequests.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No pending requests found."
            });
        }

        return res.status(200).json({
            success: true,
            message: "Pending requests fetched successfully",
            pendingRequests
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error fetching pending requests",
            details: error.message
        });
    }
};

export const addBookIssue = async (req, res) => {
    try {
        const { serialNo, nameOfBook, membershipId, dateOfIssue } = req.body;

        // Validate input
        if (!serialNo || !nameOfBook || !membershipId || !dateOfIssue) {
            return res.status(400).json({
                success: false,
                message: "Serial No, Name of Book, Membership Id, and Date of Issue are required.",
            });
        }

        const newBookIssue = new BookIssue({
            serialNo,
            nameOfBook,
            membershipId,
            dateOfIssue: new Date(dateOfIssue),
        });

        await newBookIssue.save();

        return res.status(201).json({
            success: true,
            message: "Book issue added successfully",
            bookIssue: newBookIssue,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error adding book issue",
            details: error.message,
        });
    }
};

export const getPendingIssueRequests = async (req, res) => {
    try {
        // Find all book issues where the dateOfReturn is not set (pending issues)
        const pendingRequests = await BookIssue.find({
            dateOfReturn: { $exists: false }
        });

        if (pendingRequests.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No pending issue requests found."
            });
        }

        return res.status(200).json({
            success: true,
            message: "Pending issue requests fetched successfully",
            pendingRequests
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error fetching pending issue requests",
            details: error.message
        });
    }
};

const calculateFine = (dateOfIssue, dateOfReturn) => {
    const issueDate = new Date(dateOfIssue);
    const returnDate = new Date(dateOfReturn);
    const timeDifference = returnDate - issueDate;
    const dayDifference = timeDifference / (1000 * 3600 * 24);
    
    // Assuming a fine of 10 units per day late
    const finePerDay = 10;
    return dayDifference > 0 ? finePerDay * dayDifference : 0;
};

export const updateBookReturn = async (req, res) => {
    try {
        const { bookIssueId } = req.params;
        const { dateOfReturn } = req.body;

        // Validate input
        if (!dateOfReturn) {
            return res.status(400).json({
                success: false,
                message: "Date of Return is required.",
            });
        }

        const bookIssue = await BookIssue.findById(bookIssueId);
        if (!bookIssue) {
            return res.status(404).json({ success: false, message: "Book issue not found" });
        }

        const fine = calculateFine(bookIssue.dateOfIssue, dateOfReturn);

        // Update the book return details and calculate the fine
        bookIssue.dateOfReturn = new Date(dateOfReturn);
        bookIssue.fine = fine;

        await bookIssue.save();

        return res.status(200).json({
            success: true,
            message: "Book return processed successfully",
            bookIssue,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error processing book return",
            details: error.message,
        });
    }
};
