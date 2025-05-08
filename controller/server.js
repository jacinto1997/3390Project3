const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const { addComment, getComments } = require('../model/db')

const {
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
} = require('../model/db')

const app = express()
const PORT = 3000

// ✅ Fix for CORS (allowing Netlify frontend to talk to Render backend)
const corsOptions = {
  origin: 'https://global-chat-project3.netlify.app',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}
app.use(cors(corsOptions))
app.options('*', cors(corsOptions))

app.use(bodyParser.json())

// POST /addMessage
app.post('/addMessage', async (req, res) => {
  const { username, message, lat, lon, weather, temp, city, profilePic } = req.body
  const date = new Date().toLocaleString()

  try {
    await addMessage({ username, message, date, lat, lon, weather, temp, city, profilePic })
    res.json({ success: true })
  } catch (err) {
    console.error('Error saving message:', err.message)
    res.status(500).json({ error: 'Failed to save message' })
  }
})

// GET /getMessages
app.get('/getMessages', async (req, res) => {
  try {
    const messages = await getMessages()
    res.json(messages)
  } catch (err) {
    console.error('Error fetching messages:', err.message)
    res.status(500).json({ error: 'Failed to fetch messages' })
  }
})

// POST /signup
app.post('/signup', async (req, res) => {
  const { username, password, profilePic } = req.body
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required.' })
  }

  try {
    await createUser({ username, password, profilePic })
    res.json({ success: true, username, profilePic })
  } catch (err) {
    console.error('Signup error:', err.message)
    res.status(500).json({ error: 'Signup failed. Username may already exist.' })
  }
})

// POST /login
app.post('/login', async (req, res) => {
  const { username, password } = req.body
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required.' })
  }

  try {
    const user = await verifyUser({ username, password })
    res.json({
      username: user.username,
      profilePic: user.profilePic || null
    })
  } catch (err) {
    console.error('Login error:', err.message)
    res.status(401).json({ error: 'Invalid username or password.' })
  }
})

// POST /deleteAccount
app.post('/deleteAccount', (req, res) => {
  const { username } = req.body
  if (!username) {
    return res.status(400).json({ error: 'Username required' })
  }

  db.run(`DELETE FROM users WHERE username = ?`, [username], function (err) {
    if (err) {
      console.error('Delete error:', err.message)
      return res.status(500).json({ error: 'Could not delete account' })
    }

    db.run(`DELETE FROM messages WHERE username = ?`, [username], function (err2) {
      if (err2) {
        console.error('Message cleanup failed:', err2.message)
      }
    })

    res.json({ success: true })
  })
})

// POST /like/:id
app.post('/like/:id', async (req, res) => {
  try {
    await likeMessage(req.params.id)
    res.json({ success: true })
  } catch (err) {
    console.error('Like failed:', err)
    res.status(500).json({ error: 'Failed to like message' })
  }
})

// POST /dislike/:id
app.post('/dislike/:id', async (req, res) => {
  try {
    await dislikeMessage(req.params.id)
    res.json({ success: true })
  } catch (err) {
    console.error('Dislike failed:', err)
    res.status(500).json({ error: 'Failed to dislike message' })
  }
})

// POST /deleteMessage/:id
app.post('/deleteMessage/:id', async (req, res) => {
  const { username } = req.body
  if (!username) return res.status(400).json({ error: 'Username required' })

  try {
    await deleteMessage(req.params.id, username)
    res.json({ success: true })
  } catch (err) {
    console.error('Delete message failed:', err)
    res.status(500).json({ error: 'Failed to delete message' })
  }
})

app.get('/dailyQuestion', async (req, res) => {
  try {
    const result = await getDailyQuestion()
    res.json(result)
  } catch (err) {
    console.error('Daily question error:', err)
    res.status(500).json({ error: 'Failed to get daily question' })
  }
})

app.get('/trendingMessages', async (req, res) => {
  try {
    const result = await getTrendingMessages()
    res.json(result)
  } catch (err) {
    console.error('Trending messages error:', err)
    res.status(500).json({ error: 'Failed to get trending messages' })
  }
})

app.post('/dailyResponse', async (req, res) => {
  const { username, response } = req.body
  if (!username || !response) return res.status(400).json({ error: 'Missing data' })

  try {
    await addDailyResponse({ username, response })
    res.json({ success: true })
  } catch (err) {
    console.error('Failed to save daily response:', err)
    res.status(500).json({ error: 'Could not save response' })
  }
})

app.get('/dailyResponses', async (req, res) => {
  try {
    const rows = await getDailyResponses()
    res.json(rows)
  } catch (err) {
    console.error('Failed to get daily responses:', err)
    res.status(500).json({ error: 'Could not fetch responses' })
  }
})

// POST /addComment
app.post('/addComment', async (req, res) => {
  const { message_id, username, comment } = req.body
  const date = new Date().toLocaleString()

  if (!username || !comment || !message_id) {
    return res.status(400).json({ error: 'Missing data' })
  }

  try {
    await addComment({ message_id, username, comment, date })
    res.json({ success: true })
  } catch (err) {
    console.error('Failed to save comment:', err)
    res.status(500).json({ error: 'Could not save comment' })
  }
})

// GET /getComments/:messageId
app.get('/getComments/:messageId', async (req, res) => {
  try {
    const comments = await getComments(req.params.messageId)
    res.json(comments)
  } catch (err) {
    console.error('Failed to fetch comments:', err)
    res.status(500).json({ error: 'Could not fetch comments' })
  }
})

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
