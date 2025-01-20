import mongoose from "mongoose";
const transactionSchema = new mongoose.Schema({
    user: { 
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', 
      required: true 
    },
    book: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Book', 
      required: true 
    },
    issueDate: { 
      type: Date, 
      required: true 
    },
    returnDate: { 
      type: Date, 
      required: true 
    },
    fine: { 
      type: Number, 
      default: 0 
    }, 
    finePaid: { 
      type: Boolean, 
      default: false 
    },
    remarks: { 
      type: String 
    },
  }, { timestamps: true });
  
export const Transaction = mongoose.model('Transaction', transactionSchema);