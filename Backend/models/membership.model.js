import mongoose from "mongoose";

const membershipSchema = new mongoose.Schema({
      name : {
        type: String,
        required: true,
      },
      memberShipId:{
        type: String,
        required: true,
      },
      contactNo: { 
        type: String,
        required: true, 
      },
      amountPending: { 
        type: Number,
        default: 0 
      },
      aadharNo: { 
        type: String,
        unique:true
      },
      contactAdd:{
        type: String,
        required: true,
      },
      startDate: { 
        type: String
      },
      endDate: { 
        type: String,
      },
  }, { timestamps: true });

export const Membership = mongoose.model('Membership', membershipSchema);  
