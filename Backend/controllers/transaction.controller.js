import { Transaction } from "../models/transaction.model.js";
import {Copies} from "../models/copies.model.js";

// issue book (tested)
export const issueBook = async (req, res) => {
  try {
    const { serialNumber, issueDate, returnDate, memberShipId, remarks } = req.body;
    // console.log(req.body);
    if (!serialNumber || !issueDate || !returnDate || !memberShipId) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }
     
    const isAvailable = await Copies.findOne({ serialNumber, status: "Available" });

    if(!isAvailable) return res.status(400).json({
      success: false,
      message: "Book is not available.",
    });

    const issuedBook = await Transaction.create({
      book: serialNumber,
      issueDate,
      returnDate,
      member: memberShipId,
      issueRemark : remarks,
    });
    
    if(!issuedBook)
      return res.status(400).json({
      success: false,
      message: "Failed to issue book.",
    });

    isAvailable.status = "Unavailable";
    await isAvailable.save();

    return res.status(201).json({
      success: true,
      message: "Book issued successfully",
      data: issuedBook,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error issuing book",
      details: error.message,
    });
  }
};

const calculateFine = (dateOfIssue, dateOfReturn) => {
    const issueDate = new Date(dateOfIssue);
    const returnDate = new Date(dateOfReturn);
    const timeDifference = returnDate - issueDate;
    const dayDifference = timeDifference / (1000 * 3600 * 24);
    
    // Assuming a fine of 10 units per day late
    const finePerDay = 5;
    return dayDifference > 0 ? finePerDay * dayDifference : 0;
};

// return Book
export const returnBook = async (req, res) => {
  try {
    const {serialNumber, returnDate, remarks} = req.body;
    
    if (!serialNumber || !returnDate) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    const isIssued = await Transaction.findOne({ book: serialNumber, returnedOn:null});

    if (!isIssued) {
      return res.status(404).json({
        success: false,
        message: "Book issue not found",
      });
    }

    isIssued.returnedOn = returnDate;
    isIssued.fine = calculateFine(isIssued.returnDate,returnDate);
    isIssued.returnRemark = remarks;

    await isIssued.save();

    const copies = await Copies.findOneAndUpdate({serialNumber},{status:"Available"});
   
    if(!copies){
      isIssued.returnedOn = null;
      isIssued.fine = 0;
      isIssued.returnRemark = null;
      await isIssued.save();
      
      return res.status(400).json({
         success:false,
         message: "Transaction failed",
         });
    }

    return res.status(200).json({
      success: true,
      message: "Book returned successfully",
      data: isIssued,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error returning book",
      details: error.message,
    });
  }
};

// pay fine
export const payFine = async (req, res) => {
  try {
    const {serialNumber , remark} = req.body;

    if (!serialNumber ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    const issuedBook = await Transaction.findOne({book:serialNumber});

    if (!issuedBook) {
      return res.status(404).json({
        success: false,
        message: "Book issue not found",
      });
    }
    
    issuedBook.paidOn = Date.now();
    issuedBook.fineRemark = remark;
    await issuedBook.save();

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

// get active issues
export const getActiveIssues = async (req, res) => {
  try
  {
      const {serialNumber} = req.query;
      console.log(serialNumber);
      const issuedBook = await Transaction.findOne({book:serialNumber});
      if(!issuedBook) return res.status(404).json({ error: "Book is not issued" });  
      return res.status(200).json({ status: true,data:issuedBook, message: "Active issues found" });
  }
  catch(e)
  {
      return res.status(500).json({ error: "Error getting active issues", details: e.message });
  }
};

// get all active issues
export const getAllActiveIssues = async (req, res) => {
  try{
    // const issuedBooks = await Transaction.find({returnedOn:null});
    const issuedBooks = await Transaction.aggregate([
      {
        $match: {
          returnedOn: null // Filter out transactions where the book is not yet returned
        }
      },
      {
        $lookup: {
          from: 'copies', // Join with the 'copies' collection
          localField: 'book', // Field in the Transaction schema
          foreignField: 'serialNumber', // Field in the Copies schema
          as: 'copyDetails' // Name of the new field to store the joined data
        }
      },
      {
        $unwind: '$copyDetails' // Flatten the array from the first $lookup
      },
      {
        $lookup: {
          from: 'books', // Join with the 'books' collection
          localField: 'copyDetails.bookId', // Field in the Copies schema that references the Book schema
          foreignField: '_id', // Field in the Books schema
          as: 'bookDetails' // Name of the new field to store the joined data
        }
      },
      {
        $unwind: '$bookDetails' // Flatten the array from the second $lookup
      },
      {
        $project: {
          _id: 1,
          issueDate: 1,
          returnDate: 1,
          member:1,
          'copyDetails.serialNumber': 1,
          'bookDetails.name': 1,
          'bookDetails.author': 1
        }
      }
    ]);
    

    if(!issuedBooks.length) return res.status(404).json({ success:false, message: "No active issues found" });
    return res.status(200).json({ status: true, data: issuedBooks, message:"All issued book sent"});
  }catch(err){
    return res.status(500).json({ error: "Error getting all active issues", details:err.details});
  }
}

// get all overDue returns
export const getOverdueReturns = async (req, res) => {
  try {
    const overdueReturns = await Transaction.aggregate([
      {
        $match: {
          $expr: {
            $and: [
              { $gt: ["$returnedOn", "$returnDate"] }, // returnedOn > returnDate
              { $ne: ["$returnedOn", null] } // Ensure returnedOn is not null
            ]
          }
        }
      },
      {
        $lookup: {
          from: 'copies', // Join with the 'copies' collection
          localField: 'book', // Field in Transaction schema
          foreignField: 'serialNumber', // Field in Copies schema
          as: 'copyDetails' // Output array
        }
      },
      {
        $unwind: '$copyDetails' // Flatten the copyDetails array
      },
      {
        $lookup: {
          from: 'books', // Join with the 'books' collection
          localField: 'copyDetails.bookId', // Field in Copies schema
          foreignField: '_id', // Field in Books schema
          as: 'bookDetails' // Output array
        }
      },
      {
        $unwind: '$bookDetails' // Flatten the bookDetails array
      },
      {
        $project: {
          _id: 1,
          issueDate: 1,
          returnDate: 1,
          returnedOn: 1,
          member: 1,
          fine:1,
          'copyDetails.serialNumber': 1,
          'bookDetails.name': 1,
          'bookDetails.author': 1
        }
      }
    ]);

    if (!overdueReturns.length) {
      return res.status(404).json({ success: false, message: "No overdue returns found" });
    }

    return res.status(200).json({ status: true, data: overdueReturns, message: "All overdue returns sent" });
  } catch (err) {
    return res.status(500).json({ error: "Error getting overdue returns", details: err.message });
  }
};
