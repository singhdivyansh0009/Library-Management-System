import mongoose from "mongoose"

const movieCopies = new mongoose.Schema({
        movieId: {
           type: mongoose.Schema.Types.ObjectId,
           ref: 'Movie',
           required: true
        },
        serialNumber: { 
            type: String, 
            required: true,
            unique: true, 
        },
        status: { 
            type: String,
            enum: ['Available', 'Unavailable', 'Removed', 'OnRepair'], 
            default: 'Available' 
        },

})

export const MovieCopies = mongoose.model('MovieCopies',movieCopies);