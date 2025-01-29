import { User } from "../models/user.model.js";
import { Membership } from "../models/membership.model.js";
import { Book } from "../models/book.model.js";
import { Movie } from "../models/movie.model.js";
import { Product } from "../models/product.model.js";
import { Copies } from "../models/copies.model.js";
import { MovieCopies } from "../models/movieCopies.js";
import { ObjectId } from "mongodb";

// handle Product
const handleProduct = async (category, type, quantity) => {
    const product = await Product.findOne({ category, type });
    if (!product) {
        const newProduct = await Product.create({
            category,
            type,
            count: quantity,
        });
        return newProduct;
    }   
    product.count += quantity;
    await product.save();
    return product;
};

const generateCopies = async (quantity, book) => {
    try {
        console.log("genrating copies..");
        const copiesData = [];
        for (let i = 1; i <= quantity; i++) {
            const serialNumber = `${book.name.slice(0, 3).toUpperCase()}-${new ObjectId()}`;
            console.log(serialNumber);
            copiesData.push({
                bookId: book._id,
                serialNumber,
            });
        }

        await Copies.insertMany(copiesData);

        console.log(`${quantity} copies of '${book.name}' added successfully.`);
    } catch (err) {
        console.error("Error generating copies:", err);
        throw new Error("Failed to generate book copies");
    }
};

const generateMovieCopies = async (quantity, movie) => {
    try {
        const copiesData = [];
        const timestamp = Date.now().toString().slice(-5);
        for (let i = 1; i <= quantity; i++) {
            const serialNumber = `${movie.name.slice(0, 3).toUpperCase()}-${timestamp}-${new ObjectId()}`;
            copiesData.push({
                movieId: movie._id,
                serialNumber,
            });
        }

        await MovieCopies.insertMany(copiesData);

        console.log(`${quantity} copies of '${movie.name}' added successfully.`);
    } catch (err) {
        console.error("Error generating copies:", err);
        throw new Error("Failed to generate movie copies");
    }
};


// Giving the membership to the user (tested)
export const addMembership = async(req,res) => {
    try {
        const { firstName, lastName, contactNo, contactAdd, aadharNo, startDate, endDate } = req.body;

        // Validate input
        if (!firstName || !lastName || !contactNo || !contactAdd || !aadharNo || !startDate || !endDate) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        console.log(req.body);

        // Check for existing member with the same Aadhar number
        const isPresent = await Membership.findOne({ aadharNo });
        if (isPresent) {
            return res.status(409).json({
                success: false,
                message: "Member with this Aadhar number already exists",
            });
        }

        // Create new member
        const user = await Membership.create({
            name: `${firstName} ${lastName}`,
            contactNo,
            aadharNo,
            startDate,
            endDate,
            contactAdd,
            memberShipId: `MEM${contactNo}`,
        });

        return res.status(201).json({ 
            success: true, 
            data: user, 
            message: "User added successfully" 
        });
    }
    catch(e)
    {
        console.log(e);
        res.status(500).json({ error: "Error adding user", details: e.message });
    }
}

// updating membership (tested)
export const updateMembership = async (req, res) => {
    try {
        const { memberShipId, startDate, endDate} = req.body;

        // Check if all required fields are provided
        if (!memberShipId || !startDate || !endDate) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        // Find the user by membershipId
        const user = await Membership.findOneAndUpdate({memberShipId},{endDate,startDate},{new:true});

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        return res.status(200).json({
            success: true,
            message: "User membership updated successfully",
            data: user,
        });

    } catch (e) {
        res.status(500).json({
            success: false,
            message: "Error updating user",
            details: e.message,
        });
    }
};

// removing the membership (tested)
export const deleteMembership = async(req,res) => {
    try{
        const {memberShipId} = req.params;
        console.log(memberShipId);
        if(!memberShipId){
            return res.status(404).json({
                success: false,
                message: "All fields are required",
            });
        }
        const member = await Membership.findOneAndDelete({memberShipId});
        if(!member) res.status(404).json({status:false,message:"Member not found"});

        res.status(200).json({ status: true, data:user, message: "User deleted successfully" });
    }catch(e){
        res.status(500).json({ error: "Error deleting user", details: e.message });
    }
}

// add a book (tested)
export const addBook = async(req,res) => {
    try
    {
        const {name,author,cost,category,procurementDate,quantity = 1} =  req.body;
        console.log(req.body);
        if(!name || !author || !category || !cost || !procurementDate)
        {
            return res.status(404).json({
                success: false,
                message: "All fields are required",
            })
        }

        let book = await Book.findOne({name,author});
        if(!book){
            console.log('BOOK:',book);
            book = await Book.create({
                name,
                author,
                procurementDate,
                cost,
                category,
                quantity
            });
            console.log('Book created:', book);
            if(!book) return res.status(404).json({success: false, message: "Error while adding book"});
        }
        else{
          book.quantity += quantity;
          await book.save();
        }
        console.log('xyz');
        // generate the copies serial Number
        generateCopies(quantity,book);
        
        const product = await handleProduct(category, 'Book', quantity);
        if(!product) return res.status(404).json({success: false, message: "Error while adding product"});

        return res.status(200).json({ status: true,data:book, message: "Book added successfully" });
    } 
    catch(e)
    {
        res.status(500).json({ error: "Error adding book", details: e.message });
    }
};

// update a book (tested)
export const updateBook = async (req, res) => {
    try
    {
        const {name, serialNumber, status} = req.body;

        if(!name || !serialNumber || !status)
        {
            return res.status(404).json({
                success: false,
                message: "All fields are required",
            })
        }
        
        const book = await Book.findOne({serialNumber});
        if(!book) return res.status(404).json({success: false, message: "Book not found"});

        if(book.quantity !== 0 && status === 'Unavailable' || book.quantity === 0 && status === 'Available') 
            return res.status(404).json({success: false, message: "Invalid operation"});

        
        book.status = status;
        await book.save();
        if(!book) return res.status(404).json({success: false, message: "Book not found"});

        res.status(200).json({ status: true,data:book, message: "Book updated successfully" });
    }
    catch(e)
    {
        res.status(500).json({ error: "Error updating book", details: e.message });
    }
};

// add a movie (tested)
export const addMovie = async (req, res) => {
    try {
      const { name, author, cost, category, procurementDate, quantity = 1 } = req.body;
  
      if (!name || !author || !category || !cost || !procurementDate) {
        return res.status(404).json({
          success: false,
          message: "All fields are required",
        });
      }
  
      let movie = await Movie.findOne({ name, author }); // Find the movie first
      if (!movie) {
        // If the movie doesn't exist, create it
        movie = await Movie.create({
          name,
          author,
          procurementDate,
          cost,
          category,
          quantity,
        });
  
        if (!movie) {
          return res
            .status(404)
            .json({ success: false, message: "Error while adding movie" });
        }
      } else {
        // Increment the quantity if the movie already exists
        movie.quantity += quantity;
        await movie.save();
      }
      
      generateMovieCopies(quantity,movie);

      const product = await handleProduct(category, "Movie", quantity);
      if (!product)
        return res
          .status(404)
          .json({ success: false, message: "Error while adding product" });
  
      res
        .status(200)
        .json({ status: true, data: movie, message: "Movie added successfully" });
    } catch (e) {
      res.status(500).json({ error: "Error adding movie", details: e.message });
    }
};
  

// update a movie
export const updateMovie = async (req, res) => {
    try
    {
        const {name, serialNumber, status} = req.body;
        
        if(!name || !serialNumber || !status)
        {
            return res.status(404).json({
                success: false,
                message: "All fields are required",
            })
        }

        const movie = await Movie.findOne({serialNumber});
        if(!movie) return res.status(404).json({success: false, message: "Book not found"});

        if(movie.quantity !== 0 && status === 'Unavailable' || movie.quantity === 0 && status === 'Available') 
            return res.status(404).json({success: false, message: "Invalid operation"});

        
        movie.status = status;
        await movie.save();
        if(!movie) return res.status(404).json({success: false, message: "Movie not found"});

        res.status(200).json({ status: true,data:movie, message: "Movie updated successfully" });
    }
    catch(e)
    {
        res.status(500).json({ error: "Error updating Movie", details: e.message });
    }
};

// user management (tested)
export const userManagement = async(req,res) => {
    try
    {
        const {userType,userId, name , status,isAdmin} = req.body;
        console.log(req.body);
        if(status === undefined || isAdmin === undefined || !userType)
        {
            return res.status(404).json({
                success: false,
                message: "All fields are required",
            })
        }

        if(userType === 'New User'){
            if(!name)  
                return res.status(404).json({success: false, message: "All flieds are required"});

            const user = await User.create({
                name,
                status,
                isAdmin,
                password: name.slice(0,2)+"1234"
            });
            return res.status(200).json({ status: true, data:user, message: "User added successfully" });
        }
        else{
            if(!userId) return res.status(404).json({success: false, message: "All flieds are required"});
            const user = await User.findOneAndUpdate(
                { userId }, 
                { status, isAdmin }, 
                { new: true } 
              );
            return res.status(200).json({ status: true,data:user, message: "User updated successfully" });
        }
    }
    catch(e)
    {
        return res.status(500).json({ error: "Error managing user", details: e.message });
    }
};