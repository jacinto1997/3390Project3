// ✅ DATABASE MODEL FILE (with users)
const sqlite3 = require('sqlite3').verbose()
const path = require('path')
const bcrypt = require('bcrypt')

const db = new sqlite3.Database(path.resolve(__dirname, 'messages.db'), (err) => {
  if (err) return console.error('DB connection error:', err)
  console.log('✅ Connected to SQLite database')
})

// Initialize tables
const init = () => {
  db.run(`
    CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT,
      message TEXT,
      date TEXT,
      lat REAL,
      lon REAL,
      weather TEXT,
      temp TEXT,
      city TEXT,
      profilePic TEXT,
      likes INTEGER DEFAULT 0,
      dislikes INTEGER DEFAULT 0
    )
  `)

  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE,
      password_hash TEXT,
      profilePic TEXT
    )
  `)

  db.run(`
    CREATE TABLE IF NOT EXISTS daily_responses (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT,
      response TEXT,
      timestamp TEXT
    )
  `)
}
init()

// Messages
function addMessage({ username, message, date, lat, lon, weather, temp, city, profilePic }) {
  return new Promise((resolve, reject) => {
    const sql = `INSERT INTO messages (username, message, date, lat, lon, weather, temp, city, profilePic) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
    db.run(sql, [username, message, date, lat, lon, weather, temp, city, profilePic], function (err) {
      if (err) reject(err)
      else resolve()
    })
  })
}

function getMessages() {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM messages ORDER BY id DESC', [], (err, rows) => {
      if (err) reject(err)
      else resolve(rows)
    })
  })
}

// Likes / Dislikes / Delete
function likeMessage(id) {
  return new Promise((resolve, reject) => {
    db.run(`UPDATE messages SET likes = likes + 1 WHERE id = ?`, [id], function (err) {
      if (err) reject(err)
      else resolve()
    })
  })
}

function dislikeMessage(id) {
  return new Promise((resolve, reject) => {
    db.run(`UPDATE messages SET dislikes = dislikes + 1 WHERE id = ?`, [id], function (err) {
      if (err) reject(err)
      else resolve()
    })
  })
}

function deleteMessage(id, username) {
  return new Promise((resolve, reject) => {
    db.run(`DELETE FROM messages WHERE id = ? AND username = ?`, [id, username], function (err) {
      if (err) reject(err)
      else resolve()
    })
  })
}

// Daily Question logic
function getDailyQuestion() {
  return Promise.resolve({
    question: "If you could have dinner with anyone, living or dead, who would it be?"
  })
}


function getTrendingMessages() {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT username, message, likes
      FROM messages
      WHERE likes > 0
      ORDER BY likes DESC
      LIMIT 5
    `
    db.all(sql, [], (err, rows) => {
      if (err) reject(err)
      else resolve(rows)
    })
  })
}

// Daily Responses
function addDailyResponse({ username, response }) {
  const timestamp = new Date().toLocaleString()
  return new Promise((resolve, reject) => {
    const sql = `INSERT INTO daily_responses (username, response, timestamp) VALUES (?, ?, ?)`
    db.run(sql, [username, response, timestamp], function (err) {
      if (err) reject(err)
      else resolve()
    })
  })
}

function getDailyResponses() {
  return new Promise((resolve, reject) => {
    db.all(`SELECT * FROM daily_responses ORDER BY id DESC`, [], (err, rows) => {
      if (err) reject(err)
      else resolve(rows)
    })
  })
}

// Users
function createUser({ username, password, profilePic }) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) return reject(err)
      const sql = `INSERT INTO users (username, password_hash, profilePic) VALUES (?, ?, ?)`
      db.run(sql, [username, hash, profilePic], function (err) {
        if (err) reject(err)
        else resolve()
      })
    })
  })
}

function verifyUser({ username, password }) {
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM users WHERE username = ?`
    db.get(sql, [username], (err, row) => {
      if (err) return reject(err)
      if (!row) return reject(new Error('User not found'))

      bcrypt.compare(password, row.password_hash, (err, result) => {
        if (err) return reject(err)
        if (result) {
          resolve({ username: row.username, profilePic: row.profilePic })
        } else {
          reject(new Error('Incorrect password'))
        }
      })
    })
  })
}

module.exports = {
  db,
  addMessage,
  getMessages,
  createUser,
  verifyUser,
  likeMessage,
  dislikeMessage,
  deleteMessage,
  getDailyQuestion,
  getTrendingMessages,
  addDailyResponse,
  getDailyResponses
}

