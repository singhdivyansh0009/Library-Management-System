import { User } from "../models/user.model.js";
import { Book } from "../models/book.model.js";
import { Movie } from "../models/movie.model.js";
import {Copies} from "../models/copies.model.js"
import { Product } from "../models/product.model.js";
import { Membership } from "../models/membership.model.js";
import { MovieCopies } from "../models/movieCopies.js";

// its not used in the app currently
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

// to get the all movie
export const getAllMovie = async (req, res) => {
    try
    {
        const movieCopies = await MovieCopies.aggregate([
            {
                $lookup: {
                    from: 'movies', // The name of the "Books" collection in MongoDB
                    localField: 'movieId', // Field in the "Copies" collection
                    foreignField: '_id', // Field in the "Books" collection
                    as: 'movieDetails', // The name of the output array with joined data
                },
            },
            {
                $unwind: '$movieDetails', // Unwind to convert array to object for easier access
            },
            {
                $project: {
                    _id: 1,
                    serialNumber: 1,
                    status:1,
                    'movieDetails.name': 1,
                    'movieDetails.author': 1,
                    'movieDetails.category': 1,
                    'movieDetails.procurementDate': 1,
                },
            },
        ]);
        if(!movieCopies) return res.status(404).json({ error: "Movie not found" });
        res.status(200).json({ status: true,data:movieCopies, message: "Movie found" });
    }
    catch(e)
    {
        return res.status(500).json({ error: "Error getting active movie", details: e.message });
    }
};

// to get all books
export const getAllBook = async (req, res) => {
    try
    {
        const book = await Book.find();
            
        
        if(!book) return res.status(404).json({ error: "Book not found" });
        res.status(200).json({ status: true,data: book, message: "Book found" });
    }
    catch(e)
    {
        return res.status(500).json({ error: "Error getting active book", details: e.message });
    }
};

// to get all members
export const getMembers = async (req, res) => {
    try
    {
        const members = await Membership.find();
        if(!members) return res.status(404).json({ error: "Members not found" });
        res.status(200).json({ status: true,data:members, message: "Members sent succesfully" });
    }
    catch(e)
    {
        return res.status(500).json({ error: "Error getting member user", details: e.message });
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

// get all products (tested)
export const getAllProducts = async(req,res) =>{
    try{
        const products = await Product.find();
        if(!products) return res.status(404).json(
            {
                success:false,
                message:"Product not found"
            }
        )
        return res.status(200).json({
            success: true,
            message: "Products retrieved successfully",
            products
        });
    }catch(err){
        return res.status(500).json({status: false, message:"Internal server error"});
    }
}

export const getSingleBook = async(req,res)=>{
    try
    {
        const {name,author,serialNumber} = req.query;
        if(!name && !serialNumber)
            return res.status.json({
            success:false,
            message:"Please provide book name or serial number"
        });
        const book = await Book.findOne({
            $or: [
               {name},
               {serialNumber}
            ]
        });
        if(!book) return res.status(404).json({ error: "Book not found" });
        res.status(200).json({ status: true,data:book, message: "Book found" });
    }
    catch(e)
    {
        return res.status(500).json({ error: "Error getting active book", details: e.message });
    }
}

export const getAllBookCopies = async (req, res) => {
    try
    {
        const bookCopies = await Copies.aggregate([
            {
                $lookup: {
                    from: 'books', // The name of the "Books" collection in MongoDB
                    localField: 'bookId', // Field in the "Copies" collection
                    foreignField: '_id', // Field in the "Books" collection
                    as: 'bookDetails', // The name of the output array with joined data
                },
            },
            {
                $unwind: '$bookDetails', // Unwind to convert array to object for easier access
            },
            {
                $project: {
                    _id: 1,
                    serialNumber: 1,
                    status:1,
                    'bookDetails.name': 1,
                    'bookDetails.author': 1,
                    'bookDetails.category': 1,
                    'bookDetails.procurementDate': 1,
                },
            },
        ]);
        
        if(!bookCopies.length) return res.status(404).json({ error: "Book not found" });
        res.status(200).json({ status: true,data: bookCopies, message: "Book found" });
    }
    catch(e)
    {
        return res.status(500).json({ error: "Error getting active book", details: e.message });
    }
};

export const getSingleBookCopies = async(req,res)=>{
    try
    {
        const {name,author,serialNumber} = req.query;
        if(!name && !serialNumber)
            return res.status.json({
            success:false,
            message:"Please provide book name or serial number"
        });
        const bookCopies = await Copies.aggregate([
            {
                $lookup: {
                    from: 'books', // The name of the "Books" collection in MongoDB
                    localField: 'bookId', // Field in the "Copies" collection
                    foreignField: '_id', // Field in the "Books" collection
                    as: 'bookDetails', // The name of the output array with joined data
                },
            },
            {
                $unwind: '$bookDetails', // Unwind to convert array to object for easier access
            },
            {
                $match: {
                    'bookDetails.name': name,
                    'bookDetails.author': author
                },
            },
            {
                $project: {
                    _id: 1,
                    serialNumber: 1,
                    status: 1,
                    'bookDetails.name': 1,
                    'bookDetails.author': 1,
                    'bookDetails.category': 1,
                    'bookDetails.procurementDate': 1,
                },
            },
        ]);
        
        
        if(!bookCopies.length) return res.status(404).json({ error: "Book not found" });
        res.status(200).json({ status: true,data: bookCopies, message: "Book found" });
    }
    catch(e)
    {
        return res.status(500).json({ error: "Error getting active book", details: e.message });
    }
}