# 🌍 Global Chat App

A real-time global messaging platform where users can post messages, see local weather/location, respond to daily questions, and view trending content — all built using Vue.js and Express with a SQLite backend.

---

## 🚀 Features

- ✅ User authentication (Sign up, Log in, Delete account)
- ✅ Profile icon & username display
- ✅ Global message board with geolocation + weather tagging
- ✅ Like / Dislike functionality
- ✅ Daily Question with public responses
- ✅ Trending section based on message content
- ✅ Responsive UI built with Vue 3

---

## 🧱 Technologies

- **Frontend**: Vue.js, Vite
- **Backend**: Node.js, Express
- **Database**: SQLite
- **APIs**: OpenWeatherMap, HTML5 Geolocation
- **Version Control**: Git & GitHub

---

## 🗂 Folder Structure

3390Project3/
├── controller/ # Express server (server.js)
├── model/ # SQLite logic (db.js)
├── view/
│ └── global-chat-app/
│ ├── src/
│ │ ├── components/
│ │ │ ├── App.vue
│ │ │ ├── MessageCard.vue
│ │ │ ├── LoginForm.vue
│ │ │ └── DailyQuestion.vue
│ │ └── main.js
│ └── index.html
├── README.md
└── .gitignore

---

## 🧪 How to Run Locally

### 1. Clone the repo

```bash
git clone https://github.com/30percentother/3390Project3.git
cd 3390Project3


## 2. Set up Backend
cd controller
npm install
node server.js

## 3. Set up Frontend
cd view/global-chat-app
npm install
npm run dev

## 4. Access App
Visit http://localhost:5173 in your browser.


