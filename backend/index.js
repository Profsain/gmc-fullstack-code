const express = require('express') // Import express
const mongoose = require('mongoose') // Import mongoose
const cors = require('cors') // import cors
const postRoutes = require('./routes/postRoute') // Import the post routes

// connect to mongodb database
mongoose
    .connect('mongodb+srv://mudiprofsain:pass123@cluster0.ahlhfeo.mongodb.net/blogappdb?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => {
        console.log("Database connected successfully");

        const app = express(); // Create an express app
        const port = 3080; // Set the port

        // middleware
        app.use(cors());
        app.use(express.json()); // parse json data

        // use routes
        app.use('/api', postRoutes);

        // listen for requests
        app.listen(port, () => {
            console.log(`Server is listening on port http://localhost:${port}`);
        })
    })