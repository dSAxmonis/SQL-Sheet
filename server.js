/**
 * Express Backend Server with MongoDB Atlas & JWT Authentication
 * Compatible with both local Node.js server and Netlify Serverless Functions
 */

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'sql-practice-secret-key-change-in-prod';
const MONGODB_URL = process.env.MONGODB_URL;

if (!MONGODB_URL) {
  console.warn('⚠️ MONGODB_URL environment variable is not set. Please configure it in .env or your hosting dashboard.');
}

app.use(cors());
app.use(express.json());

// Normalize Netlify function path prefix if present
app.use((req, res, next) => {
  if (req.url.startsWith('/.netlify/functions/api')) {
    req.url = req.url.replace('/.netlify/functions/api', '');
  }
  next();
});

app.use(express.static(path.join(__dirname)));

// Cached MongoDB Connection for Serverless & Local
let cachedConn = null;

async function connectToDatabase() {
  if (cachedConn && mongoose.connection.readyState === 1) {
    return cachedConn;
  }
  try {
    cachedConn = await mongoose.connect(MONGODB_URL, {
      serverSelectionTimeoutMS: 8000,
    });
    console.log('Connected to MongoDB Atlas');
    return cachedConn;
  } catch (err) {
    console.error('MongoDB connection error:', err);
    throw err;
  }
}

// Initial connection for server
connectToDatabase().catch(err => console.error('Initial DB connect failed:', err.message));

// Ensure DB connected middleware for API routes
app.use(async (req, res, next) => {
  if (req.path.startsWith('/api/')) {
    try {
      await connectToDatabase();
      next();
    } catch (err) {
      return res.status(503).json({ error: 'Database connection currently unavailable. Please try again.' });
    }
  } else {
    next();
  }
});

// ============================================================================
// Mongoose Models
// ============================================================================
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, lowercase: true, trim: true },
  passwordHash: { type: String, required: true },
  displayName: { type: String, trim: true },
  createdAt: { type: Date, default: Date.now }
});

const progressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  questionId: { type: String, required: true },
  status: { type: String, default: 'notstarted' },
  notes: { type: String, default: '' },
  code: { type: String, default: '' },
  timeSpent: { type: String, default: '' },
  markedDate: { type: String, default: null },
  solvedAt: { type: String, default: null },
  updatedAt: { type: Date, default: Date.now }
});

progressSchema.index({ userId: 1, questionId: 1 }, { unique: true });

const User = mongoose.models.User || mongoose.model('User', userSchema);
const Progress = mongoose.models.Progress || mongoose.model('Progress', progressSchema);

// ============================================================================
// Middleware: Authenticate JWT Token
// ============================================================================
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Session expired or invalid token' });
    req.user = user;
    next();
  });
}

// ============================================================================
// Auth Endpoints (Open to anyone — No invite code required!)
// ============================================================================

// Register (Open to any user)
app.post('/api/auth/register', async (req, res) => {
  try {
    const { username, password, displayName } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password required' });
    }

    if (password.length < 4) {
      return res.status(400).json({ error: 'Password must be at least 4 characters' });
    }

    const cleanUser = username.trim().toLowerCase();
    const cleanName = displayName ? displayName.trim() : username.trim();

    const existing = await User.findOne({ username: cleanUser });
    if (existing) {
      return res.status(400).json({ error: 'Username is already taken' });
    }

    const hash = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username: cleanUser,
      passwordHash: hash,
      displayName: cleanName
    });

    const token = jwt.sign(
      { id: newUser._id, username: newUser.username, displayName: newUser.displayName },
      JWT_SECRET,
      { expiresIn: '60d' }
    );

    res.json({
      message: 'Account created successfully',
      token,
      user: { id: newUser._id, username: newUser.username, displayName: newUser.displayName }
    });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ error: 'Failed to create account. Please try again.' });
  }
});

// Login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password required' });
    }

    const cleanUser = username.trim().toLowerCase();
    const user = await User.findOne({ username: cleanUser });
    if (!user) {
      return res.status(400).json({ error: 'Invalid username or password' });
    }

    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) {
      return res.status(400).json({ error: 'Invalid username or password' });
    }

    const token = jwt.sign(
      { id: user._id, username: user.username, displayName: user.displayName },
      JWT_SECRET,
      { expiresIn: '60d' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: { id: user._id, username: user.username, displayName: user.displayName }
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Server error during login' });
  }
});

// Current User Profile
app.get('/api/auth/me', authenticateToken, (req, res) => {
  res.json({ user: req.user });
});

// ============================================================================
// Progress Endpoints (MongoDB Atlas)
// ============================================================================

// Get all progress for logged-in user
app.get('/api/progress', authenticateToken, async (req, res) => {
  try {
    const items = await Progress.find({ userId: req.user.id });
    const progressMap = {};

    items.forEach(r => {
      progressMap[r.questionId] = {
        status: r.status,
        notes: r.notes || '',
        code: r.code || '',
        timeSpent: r.timeSpent || '',
        markedDate: r.markedDate || null,
        solvedAt: r.solvedAt || null
      };
    });

    res.json({ progress: progressMap });
  } catch (err) {
    console.error('Error fetching progress:', err);
    res.status(500).json({ error: 'Failed to retrieve progress' });
  }
});

// Update or insert question progress
app.post('/api/progress/:questionId', authenticateToken, async (req, res) => {
  try {
    const qId = req.params.questionId;
    const { status, notes, code, timeSpent, markedDate, solvedAt } = req.body;

    const updateDoc = { updatedAt: new Date() };
    if (status !== undefined) updateDoc.status = status;
    if (notes !== undefined) updateDoc.notes = notes;
    if (code !== undefined) updateDoc.code = code;
    if (timeSpent !== undefined) updateDoc.timeSpent = timeSpent;
    if (markedDate !== undefined) updateDoc.markedDate = markedDate;
    if (solvedAt !== undefined) updateDoc.solvedAt = solvedAt;

    await Progress.findOneAndUpdate(
      { userId: req.user.id, questionId: qId },
      { $set: updateDoc },
      { upsert: true, new: true }
    );

    res.json({ success: true });
  } catch (err) {
    console.error('Error saving question progress:', err);
    res.status(500).json({ error: 'Failed to save question progress' });
  }
});

// Clear all progress for logged-in user
app.delete('/api/progress', authenticateToken, async (req, res) => {
  try {
    await Progress.deleteMany({ userId: req.user.id });
    res.json({ success: true, message: 'All progress reset' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to reset progress' });
  }
});

// ============================================================================
// Study Buddy / All Users Progress Summary
// ============================================================================
app.get('/api/friends/summary', async (req, res) => {
  try {
    const summary = await User.aggregate([
      {
        $lookup: {
          from: 'progresses',
          localField: '_id',
          foreignField: 'userId',
          as: 'allProgress'
        }
      },
      {
        $project: {
          id: '$_id',
          username: 1,
          display_name: '$displayName',
          solved_count: {
            $size: {
              $filter: {
                input: '$allProgress',
                as: 'p',
                cond: { $eq: ['$$p.status', 'solved'] }
              }
            }
          },
          inprogress_count: {
            $size: {
              $filter: {
                input: '$allProgress',
                as: 'p',
                cond: { $eq: ['$$p.status', 'inprogress'] }
              }
            }
          },
          revision_count: {
            $size: {
              $filter: {
                input: '$allProgress',
                as: 'p',
                cond: { $eq: ['$$p.status', 'revision'] }
              }
            }
          }
        }
      },
      { $sort: { solved_count: -1 } }
    ]);

    res.json({ friends: summary });
  } catch (err) {
    console.error('Error fetching friends summary:', err);
    res.status(500).json({ error: 'Failed to load friends summary' });
  }
});

// Fallback to index.html for client-side routing
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Only start listening if run directly (not as a Netlify serverless function)
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`⚡ SQL Practice Server running on http://localhost:${PORT}`);
    console.log(`Connected to MongoDB Atlas`);
  });
}

module.exports = app;
