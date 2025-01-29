import mongoose from "mongoose";
const movieSchema = new mongoose.Schema({
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
      required: true
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
  }, { timestamps: true });

movieSchema.pre('save', async function (next) {
      try {
          if (!this.serialNumber) {
              const randomNumber = Date.now().toString().slice(-4); // Timestamp-based number
              this.serialNumber = this.name.trim().toUpperCase().slice(0, 3) + randomNumber;
  
              // Check uniqueness
              const existingBook = await mongoose.model('Movie').findOne({ serialNumber: this.serialNumber });
              if (existingBook) {
                  throw new Error('Serial number collision detected. Please try saving again.');
              }
          }
          next();
      } catch (error) {
          next(error); // Pass error to the next middleware
      }
  });
  
export const Movie = mongoose.model('Movie', movieSchema);