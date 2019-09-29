const express = require('express');

const feedController = require('../controllers/controller');

const router = express.Router();

// GET /feed/posts
console.log("route reached.....")
router.post('/posts', feedController.createPost);
console.log("route reached.....")
module.exports = router;