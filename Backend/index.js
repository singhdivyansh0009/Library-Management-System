import express from 'express';
import cors from 'cors';
import { configDotenv } from 'dotenv';
import connectDB from './db/db.js';

configDotenv();  // Configure dotenv to use .env file

const app = express(); // Create express app
app.use(cors()); // Enable CORS
app.use(express.json()); // Enable req.body JSON type
app.use(express.urlencoded({ extended: true })); // Enable req.body URL encoded type

// To check if server is running
app.get('/', (req, res) => {
    res.json({message : 'Server is running'});
});

// Import the routes
import userRoutes from './routes/user.route.js';

// Use the routes
app.use('/api/users', userRoutes);

connectDB() 
.then(() => {
    // Start the server on PORT if the db connection is successful
    app.listen(process.env.PORT || 5000, () => { 
        console.log(`Server is running on http://localhost:${process.env.PORT || 5000}`);
    });
})
.catch((error) =>{
    console.log('Error in connecting to Database', error.message);
})