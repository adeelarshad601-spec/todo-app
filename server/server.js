const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./db/db');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors({origin: "*", // Shuru mein verification ke liye sab allow kar dein
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true}));
app.use(express.json());

// Routes
app.use('/api/todos', require('./routes/todoRoutes'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});