import mongoose from "mongoose";
const transactionSchema = new mongoose.Schema({
    member: { 
      type: String,
      ref: 'memberships', 
      required: true 
    },
    book: { 
      type: String, 
      ref: 'copies', 
      required: true 
    },
    issueDate: { 
      type: Date, 
      required: true 
    },
    returnDate: {
      type: Date,
      required:true
    },
    returnedOn : {
      type: Date,
      default: null
    },
    fine: {
      type: Number,
      default:0
    },
    paidOn : {
      type: Date,
      default: null
    },
    fineRemark: {
      type: String,
      default: null
    },
    issueRemark: { 
      type: String ,
      default: null
    },
    returnRemark: {
      type: String ,
      default: null
    }
}, { timestamps: true });
  
export const Transaction = mongoose.model('Transaction', transactionSchema);