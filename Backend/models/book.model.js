import mongoose from "mongoose";
const bookSchema = new mongoose.Schema({
    name: { 
      type: String, 
      required: true 
    },
    author: { 
      type: String, 
      required: true 
    },
    serialNumber: { 
      type: String, 
      unique: true, 
      required: true 
    },
    category: {
      type: String 
    },
    cost: { 
      type: Number
    },
    procurementDate: { 
      type: Date, 
      required: true, 
      default: Date.now 
    },
    status: { 
      type: String,
      enum: ['Available','Unavailable','Removed','OnRepair'], 
      default: 'Available' 
    },
    issuedTo: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User', 
      default: null 
    },
    issueDate: {
      type: Date, 
      default: null 
    },
    returnDate: { 
      type: Date, 
      default: null 
    },
  }, { timestamps: true });
  
export const Book = mongoose.model('Book', bookSchema);