import mongoose from "mongoose";
const fineSchema = new mongoose.Schema({
    user: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User'
    },
    book: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Book' 
    },
    amount: { 
      type: Number, 
      required: true 
    },
    paidOn: { 
      type: Date, 
      default: Date.now 
    },
  }, { timestamps: true });
  
export const Fine = mongoose.model('Fine', fineSchema);  