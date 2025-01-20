import mongoose from "mongoose";
import bcrypt from "bcrypt";
// Define the schema for the user model
const userSchema = new mongoose.Schema(
  {
    name: { 
        type: String, 
        required: true
    },
    contactNo: { 
        type: String,
        required: true, 
        unique: true 
    },
    amountPending: { 
        type: Number,
        default: 0 
    },
    email: { 
        type: String,
        required: true, 
        unique: true 
    },
    password: { 
        type: String, 
        required: true 
    },
    role: { 
        type: String, 
        enum: ["Admin", "Member"], 
        default: "Member" 
    },
    membership: {
        type: String,
        enum: ["6 months", "1 year", "2 years"],
        default: "6 months",
    },
    status: { 
        type: String, 
        enum: ["Active", "Inactive"], 
        default: "Active" 
    },
    adadharCardNo: { 
        type: String,
        required: true, 
        unique: true 
    },
    startDate: { 
        type: Date, 
        default: Date.now 
    },
    endDate: { 
        type: Date, 
        required: false 
    },
  },
  { timeStamps: true }
);

// Hash the password before saving the user model
userSchema.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = await bcrypt.hashSync(this.password, 10);
  }
});
// Check if the password is correct
userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compareSync(password, this.password);
};
// Export the model
export const User = mongoose.model("User", userSchema);