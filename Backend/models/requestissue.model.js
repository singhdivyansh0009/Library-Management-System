import mongoose from 'mongoose';

const requestSchema = new mongoose.Schema({
    membershipId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true,
    },
    nameOfBookMovie: {
        type: String,
        required: true,
    },
    requestedDate: {
        type: Date,
        required: true,
    },
    requestFulfilledDate: {
        type: Date,
        required: false,
    }
}, { timestamps: true });

const Request = mongoose.model('Request', requestSchema);

export default Request;
