import mongoose from "mongoose";
const membershipSchema = new mongoose.Schema({
    user: { 
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', 
      required: true 
    },
    type: { 
      type: String, 
      enum: ['6 months', '1 year', '2 years'], 
      default: '6 months' 
    },
    startDate: { 
      type: Date, 
      required: true 
    },
    endDate: { 
      type: Date, 
      required: true 
    },
    status: { 
      type: String, 
      enum: ['Active', 'Expired'], 
      default: 'Active' 
    },
  }, { timestamps: true });
  
export const Membership = mongoose.model('Membership', membershipSchema);  
