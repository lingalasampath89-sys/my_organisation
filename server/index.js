const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const multer = require('multer');
const path = require('path');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// --- SCHEMAS ---

// Contact Form Schema
const messageSchema = new mongoose.Schema({
  name: String,
  email: String,
  school: String,
  message: String,
  createdAt: { type: Date, default: Date.now }
});
const Message = mongoose.model('Message', messageSchema);

// Workshop Image Schema
const imageSchema = new mongoose.Schema({
  title: String,
  description: String,
  imageUrl: String,
  category: { type: String, default: 'workshop' },
  createdAt: { type: Date, default: Date.now }
});
const WorkshopImage = mongoose.model('WorkshopImage', imageSchema);

// --- MULTER SETUP (Image Upload) ---
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// Ensure uploads folder exists
const fs = require('fs');
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

// --- API ROUTES ---

// 1. Contact Form Submit
app.post('/api/contact', async (req, res) => {
  try {
    const newMessage = new Message(req.body);
    await newMessage.save();
    res.status(201).json({ message: 'Message sent successfully!' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to send message' });
  }
});

// 2. Upload Workshop Image
app.post('/api/upload', upload.single('image'), async (req, res) => {
  try {
    const newImage = new WorkshopImage({
      title: req.body.title,
      description: req.body.description,
      imageUrl: `/uploads/${req.file.filename}`
    });
    await newImage.save();
    res.status(201).json(newImage);
  } catch (err) {
    res.status(500).json({ error: 'Failed to upload image' });
  }
});

// 3. Get All Workshop Images
app.get('/api/images', async (req, res) => {
  try {
    const images = await WorkshopImage.find().sort({ createdAt: -1 });
    res.json(images);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch images' });
  }
});

app.get('/', (req, res) => {
  res.send('AISI Backend API is running...');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
