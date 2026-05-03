const express = require('express');
const cors = require('cors');
const multer = require('multer');
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
const Post = require('./models/Post');

const app = express();
const PORT = 3001;
const BASE_URL = process.env.BASE_URL || `http://localhost:${PORT}`;

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/post-viewer';

mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (extname && mimetype) {
      return cb(null, true);
    }
    cb(new Error('Only image files are allowed'));
  }
});

// GET all posts with sorting and pagination - optimized for initial load
app.get('/api/posts', async (req, res) => {
  try {
    const { 
      sortBy = 'createdAt', 
      sortOrder = 'desc', 
      page = 1, 
      limit = 6, // Reduced initial load for faster FCP
      initial = req.query.initial === 'true' // Flag for initial load
    } = req.query;

    const actualLimit = initial && parseInt(page) === 1 ? 3 : parseInt(limit);
    const skip = (parseInt(page) - 1) * actualLimit;
    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;

    // Use lean() for faster queries when we don't need Mongoose documents
    const posts = await Post.find()
      .sort(sortOptions)
      .skip(skip)
      .limit(actualLimit)
      .lean() // Returns plain JavaScript objects instead of Mongoose documents
      .select('title body imageUrl createdAt updatedAt'); // Only select needed fields

    const total = await Post.countDocuments();

    res.json({
      posts,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / actualLimit),
        totalPosts: total,
        hasMore: skip + actualLimit < total,
        initialLoad: initial && parseInt(page) === 1
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
});

// GET single post by ID
app.get('/api/posts/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch post' });
  }
});

// POST create new post
app.post('/api/posts', upload.single('image'), async (req, res) => {
  try {
    const { title, body } = req.body;
    
    if (!title || !body) {
      return res.status(400).json({ error: 'Title and body are required' });
    }

    const newPost = new Post({
      title,
      body,
      imageUrl: req.file ? `${BASE_URL}/uploads/${req.file.filename}` : null
    });

    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create post' });
  }
});

// PUT update post
app.put('/api/posts/:id', upload.single('image'), async (req, res) => {
  try {
    const { title, body } = req.body;
    
    const updateData = {};
    if (title) updateData.title = title;
    if (body) updateData.body = body;
    if (req.file) updateData.imageUrl = `${BASE_URL}/uploads/${req.file.filename}`;

    const post = await Post.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.json(post);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update post' });
  }
});

// DELETE post
app.delete('/api/posts/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    // Delete associated image if exists
    if (post.imageUrl) {
      // Extract filename from full URL
      const filename = post.imageUrl.split('/').pop();
      const imagePath = path.join(__dirname, 'uploads', filename);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await Post.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete post' });
  }
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
