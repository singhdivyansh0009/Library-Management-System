import mongoose from "mongoose"

const CopiesSchema = new mongoose.Schema({
        bookId: {
           type: mongoose.Schema.Types.ObjectId,
           ref: 'Book',
           required: true
        },
        serialNumber: { 
            type: String, 
            unique: true, 
        },
        status: { 
            type: String,
            enum: ['Available', 'Unavailable', 'Removed', 'OnRepair'], 
            default: 'Available' 
        },

})

export const Copies = mongoose.model('Copies',CopiesSchema);