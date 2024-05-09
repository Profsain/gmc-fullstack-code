const mongoose = require('mongoose') // Import mongoose

// create a schema database structure
const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    content: String,
    coverImg: String,
    tags: [String],
    likes: {
        type: Number,
        default: 0
    },
},
    { timestamps: true });

// create a model
module.exports = mongoose.model("Post", postSchema); // Export the model