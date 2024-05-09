const express = require('express') // Import express
const router = express.Router() // Create a router
const Post = require('../models/Post') // Import the Post model


// get all posts
router.get('/posts', async (req, res) => {
    try {
        const posts = await Post.find(); // Get all posts
        res.status(200).json(posts); // Send the posts as response
    } catch (error) {
        res.status(404).json({ message: error });
    }
});

// get single post
router.get('/posts/:id', async (req, res) => {
    // extract id from the request
    const id = req.params.id;
    try {
        const post = await Post.findById(id); // Get a single post

        if (!post) {
            return res.status(404).json({ message: "Post not found" }); // If post is not found
        }

        res.status(200).json(post); // Send the post as response
    } catch (error) {
        res.status(404).json({ message: error });
    }
});

// create a post
router.post('/createPost', async (req, res) => {
    // destructuring the request body
    const { title, content, coverImg, tags } = req.body;

    // create a new post object from Post model
    const post = new Post({
        title: title,
        content: content,
        coverImg: coverImg,
        tags: tags
    });

    try {
        const savedPost = await post.save(); // Save the post
        res.status(201).json(savedPost); // Send the saved post as response
    } catch (error) {
        res.status(400).json({ message: error });
    }
});

// update a post
router.put('/updatePost/:id', async (req, res) => {
    // extract id from the request
    const id = req.params.id;

    // destructuring the request body
    const { title, content, coverImg, tags } = req.body;

    try {
        // find and update the post
        const updatedPost = await Post.findByIdAndUpdate(id, {
            title: title,
            content: content,
            coverImg: coverImg,
            tags: tags
        }, { new: true });

        res.status(200).json(updatedPost); // Send the updated post as response
    } catch (error) {
       res.status(404).json({ message: error }); 
    }
});

// delete a post
router.delete('/deletePost/:id', async (req, res) => {
    // extract id from the request
    const id = req.params.id;

    try {
        // find and delete the post
        const deletedPost = await Post.findByIdAndDelete(id);

        res.status(200).json(deletedPost); // Send the deleted post as response
    } catch (error) {
        res.status(404).json({ message: error });
    }
});
         
// CRUD operations for Post model

// export the router
module.exports = router; // Export the router