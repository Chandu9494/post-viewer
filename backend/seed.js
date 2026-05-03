const mongoose = require('mongoose');
const Post = require('./models/Post');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/post-viewer';

const seedPosts = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing posts
    await Post.deleteMany({});
    console.log('Cleared existing posts');

    // Seed initial posts
    const posts = [
      {
        title: 'First Post',
        body: 'This is the description for the first post. It contains some sample text to demonstrate the layout.'
      },
      {
        title: 'Second Post',
        body: 'Here is another post with different content. The description field can hold longer text.'
      },
      {
        title: 'Third Post',
        body: 'Posts can have images and text. Click the plus button to add your own posts!'
      }
    ];

    await Post.insertMany(posts);
    console.log('Seeded initial posts');

    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedPosts();
