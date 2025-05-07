<template>
  <div class="app-container">
    <h1>🌍 Global Chat</h1>

    <LoginForm v-if="!currentUser" @loginSuccess="onLogin" />

    <div v-else>
      <div class="top-bar">
        <p>👋 Hello, {{ currentUser.username }}</p>
        <div>
          <button @click="logout">Logout</button>
          <button @click="deleteAccount">Delete Account</button>
        </div>
      </div>

      <!-- New Daily Question and Trending Panels -->
      <DailyQuestion />
      <TrendingPanel />

      <PostForm @messagePosted="fetchMessages" :currentUser="currentUser" />

      <div v-for="msg in messages" :key="msg.id">
        <MessageCard
          :messageData="msg"
          :currentUser="currentUser"
          @messageChanged="fetchMessages"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import LoginForm from './components/LoginForm.vue'
import PostForm from './components/PostForm.vue'
import MessageCard from './components/MessageCard.vue'
import DailyQuestion from './components/DailyQuestion.vue'
import TrendingPanel from './components/TrendingPanel.vue'

const messages = ref([])
const currentUser = ref(null)

const fetchMessages = async () => {
  try {
    const res = await axios.get('http://localhost:3000/getMessages')
    messages.value = res.data
  } catch (err) {
    console.error('Failed to fetch messages:', err)
  }
}

const onLogin = (user) => {
  currentUser.value = user
}

const logout = () => {
  localStorage.removeItem('currentUser')
  currentUser.value = null
}

const deleteAccount = async () => {
  if (!confirm('Are you sure you want to delete your account?')) return
  try {
    await axios.post('http://localhost:3000/deleteAccount', {
      username: currentUser.value.username
    })
    logout()
    alert('Account deleted successfully.')
  } catch (err) {
    console.error('Delete failed:', err)
    alert('Failed to delete account.')
  }
}

onMounted(() => {
  const savedUser = localStorage.getItem('currentUser')
  if (savedUser) {
    currentUser.value = JSON.parse(savedUser)
  }
  fetchMessages()
})
</script>

<style scoped>
.app-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}
.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  background: #f6f6f6;
  padding: 8px 16px;
  border-radius: 8px;
}
.top-bar button {
  margin-left: 10px;
  padding: 6px 10px;
  background: #d9534f;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
