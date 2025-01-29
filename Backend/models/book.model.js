import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
    {
        name: { 
            type: String, 
            required: true 
        },
        author: { 
            type: String, 
            required: true 
        },
        category: {
            type: String,
            required: true,
        },
        cost: { 
            type: Number,
            required: true
        },
        procurementDate: { 
            type: Date, 
            required: true, 
            default: Date.now 
        },
        quantity: { 
            type: Number, 
            default: 1
        },
    },
    { timestamps: true }
);

export const Book = mongoose.model('Book', bookSchema);
