/**
 * Express Backend Server with SQLite Database & JWT Authentication
 * Designed for self-practice and 2-friend study sharing
 */

const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'sql-secret-key-2026-practice';
const INVITE_CODE = process.env.INVITE_CODE || 'SQL2026'; // Secret code so only you & your friend can register!

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// SQLite Database Initialization
const DB_PATH = path.join(__dirname, 'practice.db');
const db = new sqlite3.Database(DB_PATH, (err) => {
  if (err) {
    console.error('Failed to open SQLite database:', err);
  } else {
    console.log('Connected to SQLite database at:', DB_PATH);
  }
});

// Create tables if they do not exist
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      display_name TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS progress (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      question_id TEXT NOT NULL,
      status TEXT DEFAULT 'notstarted',
      notes TEXT DEFAULT '',
      code TEXT DEFAULT '',
      time_spent TEXT DEFAULT '',
      marked_date TEXT,
      solved_at TEXT,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(user_id, question_id),
      FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
    )
  `);
});

// Middleware: Authenticate JWT Token
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
// Auth Endpoints
// ============================================================================

// Register new user (Protected with invite code)
app.post('/api/auth/register', (req, res) => {
  const { username, password, displayName, inviteCode } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password required' });
  }

  // Check invite code
  if (inviteCode !== INVITE_CODE) {
    return res.status(403).json({ error: 'Invalid invite code. Ask your study partner for the secret code!' });
  }

  const cleanUser = username.trim().toLowerCase();
  const cleanName = displayName ? displayName.trim() : username.trim();

  bcrypt.hash(password, 10, (err, hash) => {
    if (err) return res.status(500).json({ error: 'Error hashing password' });

    const sql = `INSERT INTO users (username, password_hash, display_name) VALUES (?, ?, ?)`;
    db.run(sql, [cleanUser, hash, cleanName], function (dbErr) {
      if (dbErr) {
        if (dbErr.message.includes('UNIQUE')) {
          return res.status(400).json({ error: 'Username already taken' });
        }
        return res.status(500).json({ error: 'Database error creating account' });
      }

      const token = jwt.sign({ id: this.lastID, username: cleanUser, displayName: cleanName }, JWT_SECRET, { expiresIn: '60d' });
      res.json({
        message: 'Account created successfully',
        token,
        user: { id: this.lastID, username: cleanUser, displayName: cleanName }
      });
    });
  });
});

// Login
app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password required' });
  }

  const cleanUser = username.trim().toLowerCase();
  const sql = `SELECT * FROM users WHERE username = ?`;

  db.get(sql, [cleanUser], (err, user) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    if (!user) return res.status(400).json({ error: 'Invalid username or password' });

    bcrypt.compare(password, user.password_hash, (bcryptErr, match) => {
      if (bcryptErr || !match) {
        return res.status(400).json({ error: 'Invalid username or password' });
      }

      const token = jwt.sign(
        { id: user.id, username: user.username, displayName: user.display_name },
        JWT_SECRET,
        { expiresIn: '60d' }
      );

      res.json({
        message: 'Login successful',
        token,
        user: { id: user.id, username: user.username, displayName: user.display_name }
      });
    });
  });
});

// Get current profile
app.get('/api/auth/me', authenticateToken, (req, res) => {
  res.json({ user: req.user });
});

// ============================================================================
// Progress Endpoints (Per-User)
// ============================================================================

// Get all progress for current user
app.get('/api/progress', authenticateToken, (req, res) => {
  const sql = `SELECT question_id, status, notes, code, time_spent, marked_date, solved_at FROM progress WHERE user_id = ?`;
  db.all(sql, [req.user.id], (err, rows) => {
    if (err) return res.status(500).json({ error: 'Failed to retrieve progress' });

    const progressMap = {};
    rows.forEach(r => {
      progressMap[r.question_id] = {
        status: r.status,
        notes: r.notes || '',
        code: r.code || '',
        timeSpent: r.time_spent || '',
        markedDate: r.marked_date || null,
        solvedAt: r.solved_at || null
      };
    });

    res.json({ progress: progressMap });
  });
});

// Update or insert question progress
app.post('/api/progress/:questionId', authenticateToken, (req, res) => {
  const qId = req.params.questionId;
  const { status, notes, code, timeSpent, markedDate, solvedAt } = req.body;

  const sql = `
    INSERT INTO progress (user_id, question_id, status, notes, code, time_spent, marked_date, solved_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
    ON CONFLICT(user_id, question_id) DO UPDATE SET
      status = coalesce(?, status),
      notes = coalesce(?, notes),
      code = coalesce(?, code),
      time_spent = coalesce(?, time_spent),
      marked_date = coalesce(?, marked_date),
      solved_at = coalesce(?, solved_at),
      updated_at = CURRENT_TIMESTAMP
  `;

  db.run(sql, [
    req.user.id, qId, status, notes, code, timeSpent, markedDate, solvedAt,
    status, notes, code, timeSpent, markedDate, solvedAt
  ], function (err) {
    if (err) return res.status(500).json({ error: 'Failed to save question progress' });
    res.json({ success: true });
  });
});

// Clear all progress for logged-in user
app.delete('/api/progress', authenticateToken, (req, res) => {
  db.run(`DELETE FROM progress WHERE user_id = ?`, [req.user.id], (err) => {
    if (err) return res.status(500).json({ error: 'Failed to clear progress' });
    res.json({ success: true, message: 'All progress cleared' });
  });
});

// ============================================================================
// Friend Stats / Study Buddy Comparison
// ============================================================================
app.get('/api/friends/summary', (req, res) => {
  const sql = `
    SELECT 
      u.id,
      u.username,
      u.display_name,
      COUNT(CASE WHEN p.status = 'solved' THEN 1 END) as solved_count,
      COUNT(CASE WHEN p.status = 'inprogress' THEN 1 END) as inprogress_count,
      COUNT(CASE WHEN p.status = 'revision' THEN 1 END) as revision_count,
      MAX(p.updated_at) as last_active
    FROM users u
    LEFT JOIN progress p ON u.id = p.user_id
    GROUP BY u.id
    ORDER BY solved_count DESC
  `;

  db.all(sql, [], (err, rows) => {
    if (err) return res.status(500).json({ error: 'Failed to fetch friends summary' });
    res.json({ friends: rows });
  });
});

// Fallback to index.html for client routing (Express 5 compatible)
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`⚡ SQL Practice Server running on http://localhost:${PORT}`);
  console.log(`Invite code for registrations: ${INVITE_CODE}`);
});
