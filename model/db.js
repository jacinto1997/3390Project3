// DATABASE MODEL FILE

const sqlite3 = require('sqlite3').verbose()
const path = require('path')

// Database connection
const db = new sqlite3.Database(path.resolve(__dirname, 'messages.db'), (err) => {
  if (err) return console.error('DB connection error:', err)
  console.log('✅ Connected to SQLite database')
})

// Create messages table if it doesn't exist
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
      temp TEXT
    )
  `)
}
init()

// Save a message to the database
function addMessage({ username, message, date, lat, lon, weather, temp }) {
  return new Promise((resolve, reject) => {
    const sql = `INSERT INTO messages (username, message, date, lat, lon, weather, temp) VALUES (?, ?, ?, ?, ?, ?, ?)`
    db.run(sql, [username, message, date, lat, lon, weather, temp], function (err) {
      if (err) reject(err)
      else resolve()
    })
  })
}

// Get all messages from the database
function getMessages() {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM messages ORDER BY id DESC', [], (err, rows) => {
      if (err) reject(err)
      else resolve(rows)
    })
  })
}

module.exports = { addMessage, getMessages }
