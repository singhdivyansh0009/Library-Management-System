import mongoose from "mongoose";
import { Book } from "./book.model.js";
const productSchema = new mongoose.Schema(
    {
        category: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            enum: ['Book', 'Movie'],
            required: true,
        },
        start: {
            type: String,
        },
        end: {
            type: String,
        },
        count: {
            type: Number,
            default: 1,
        },
    },
    { timestamps: true }
);

productSchema.pre('save', async function (next) {
    try {
        if (!this.start) {
            this.start = this.category.trim().toUpperCase().slice(0, 2)
                        + this.type.trim().toUpperCase().slice(0, 1)
                        + '0000001';
        } 
        this.end = this.category.trim().toUpperCase().slice(0, 2)
                    + this.type.trim().toUpperCase().slice(0, 1)
                    + String(this.count).padStart(7, '0'); 
        next();
    } catch (err) {
        next(err); 
    }
});

export const Product = mongoose.model('Product', productSchema);
