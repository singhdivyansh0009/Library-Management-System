import { User } from "../models/user.model.js";
import { Admin } from "../models/admin.model.js";
import { Book } from "../models/book.model.js";
import { Movie } from "../models/movie.model.js";
import uuidv4 from "uuid/v4";

export const addMembership = async(req,res) => {
    try
    {
        const {name,email,contactNo,adadharCardNo,startDate,endDate,membership} = req.body;
        if(!name || !email || !adadharCardNo || !startDate || !endDate || !membership)
        {
            return res.status(404).json({
                success: false,
                message: "All fields are required",
            })
        }
        const user = await User.create({
            name,
            email,
            contactNo,
            password: uuidv4(),
            adadharCardNo,
            membership,
            startDate,
            endDate
        });
        res.status(200).json({ status: true,data:user, message: "User added successfully" });
    }
    catch(e)
    {
        res.status(500).json({ error: "Error adding user", details: e.message });
    }
}

export const updateUser = async (req, res) => {
    try {
        const { membershipId, startDate, endDate, membershipExtension } = req.body;

        // Check if all required fields are provided
        if (!membershipId || !startDate || !endDate || !membershipExtension) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        // Validate membershipExtension
        const validExtensions = ["6 months", "1 year", "2 years"];
        if (!validExtensions.includes(membershipExtension)) {
            return res.status(400).json({
                success: false,
                message: `Invalid membershipExtension. Allowed values are: ${validExtensions.join(", ")}`,
            });
        }

        // Find the user by membershipId
        const user = await User.findById(membershipId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Parse dates and calculate new endDate
        const newEndDate = new Date(endDate);
        if (membershipExtension === "6 months") {
            newEndDate.setMonth(newEndDate.getMonth() + 6);
        } else if (membershipExtension === "1 year") {
            newEndDate.setFullYear(newEndDate.getFullYear() + 1);
        } else if (membershipExtension === "2 years") {
            newEndDate.setFullYear(newEndDate.getFullYear() + 2);
        }

        // Update user's membership details
        user.startDate = new Date(startDate);
        user.endDate = newEndDate;

        // Save the user
        await user.save();

        return res.status(200).json({
            success: true,
            message: "User membership updated successfully",
            user,
        });
    } catch (e) {
        res.status(500).json({
            success: false,
            message: "Error updating user",
            details: e.message,
        });
    }
};

export const addBook = async(req,res) => {
    try
    {
        const {name,
            serialNumber,
            status,
            issuedTo,
            issueDate,
            returnDate,
            cost,
            category,
            } =  req.body;
        if(!name || !serialNumber || !status || !cost || !category)
        {
            return res.status(404).json({
                success: false,
                message: "All fields are required",
            })
        }
        const book = await Book.create({
            name,
            serialNumber: uuidv4(),
            status,
            issuedTo,
            issueDate,
            returnDate,
            cost,
            category
        });
        res.status(200).json({ status: true,data:book, message: "Book added successfully" });
    } 
    catch(e)
    {
        res.status(500).json({ error: "Error adding book", details: e.message });
    }
};

export const updateBook = async (req, res) => {
    try
    {
        const {name, serialNumber, status,cost, issuedTo, issueDate, returnDate} = req.body;
        if(!name || !serialNumber || !status)
        {
            return res.status(404).json({
                success: false,
                message: "All fields are required",
            })
        }
        let updatedValue = {};
        if(name) updatedValue.name = name;
        if(serialNumber) updatedValue.serialNumber = serialNumber;
        if(status) updatedValue.status = status;
        if(issuedTo) updatedValue.issuedTo = issuedTo;
        if(issueDate) updatedValue.issueDate = issueDate;
        if(returnDate) updatedValue.returnDate = returnDate;
        if(cost) updatedValue.cost = cost;
        const book = await Book.findOneAndUpdate({serialNumber: serialNumber}, updatedValue, {new: true});
        res.status(200).json({ status: true,data:book, message: "Book updated successfully" });
    }
    catch(e)
    {
        res.status(500).json({ error: "Error updating book", details: e.message });
    }
};

export const addMovie = async(req,res) => {
    try
    {
        const {name,
            serialNumber,
            status,
            category,
            cost,
            issuedTo,
            issueDate,
            returnDate
            } =  req.body;
        if(!name || !serialNumber || !status)
        {
            return res.status(404).json({
                success: false,
                message: "All fields are required",
            })
        }
        const book = await Movie.create({
            name,
            serialNumber: uuidv4(),
            status,
            category,
            cost,
            issuedTo,
            issueDate,
            returnDate
        });
        res.status(200).json({ status: true,data:book, message: "Movie added successfully" });
    } 
    catch(e)
    {
        res.status(500).json({ error: "Error adding movie", details: e.message });
    }
}

export const updateMovie = async (req, res) => {
    try
    {
        const {name, serialNumber, status,cost, issuedTo, issueDate, returnDate} = req.body;
        if(!name || !serialNumber || !status)
        {
            return res.status(404).json({
                success: false,
                message: "All fields are required",
            })
        }
        let updatedValue = {};
        if(name) updatedValue.name = name;
        if(serialNumber) updatedValue.serialNumber = serialNumber;
        if(status) updatedValue.status = status;
        if(issuedTo) updatedValue.issuedTo = issuedTo;
        if(issueDate) updatedValue.issueDate = issueDate;
        if(returnDate) updatedValue.returnDate = returnDate;
        if(cost) updatedValue.cost = cost;
        const movie = await Movie.findOneAndUpdate({serialNumber: serialNumber}, updatedValue, {new: true});
        res.status(200).json({ status: true,data:movie, message: "Movie updated successfully" });
    }
    catch(e)
    {
        return res.status(500).json({ error: "Error updating movie", details: e.message });
    }
};

export const userManagement = async(req,res) => {
    try
    {
        const {userId,name, status,isAdmin} = req.body;
        if(!userId || !name || !status || !isAdmin)
        {
            return res.status(404).json({
                success: false,
                message: "All fields are required",
            })
        }
        const user = await User.findOneAndUpdate({_id: userId}, {name: name, status: status}, {new: true});
        return res.status(200).json({ status: true,data:user, message: "User updated successfully" });
    }
    catch(e)
    {
        return res.status(500).json({ error: "Error managing user", details: e.message });
    }
};