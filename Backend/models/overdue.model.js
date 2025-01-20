import mongoose from 'mongoose';

const bookIssueSchema = new mongoose.Schema({
    serialNo: {
        type: String,
        required: true,
        unique: true, 
    },
    nameOfBook: {
        type: String,
        required: true,
    },
    membershipId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true,
    },
    dateOfIssue: {
        type: Date,
        required: true,
    },
    dateOfReturn: {
        type: Date,
        required: false,
    },
    fine: {
        type: Number,
        default: 0,
    },
}, { timestamps: true });

const BookIssue = mongoose.model('BookIssue', bookIssueSchema);

export default BookIssue;