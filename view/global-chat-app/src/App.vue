<template>
  <div class="app-container">
    <header class="header">
      <h1>🌍 Global Chat</h1>
      <div v-if="currentUser" class="profile-menu">
        <span class="username-label">{{ currentUser.username }}</span>
        <button @click="showMenu = !showMenu" class="profile-icon">👤</button>
        <div v-if="showMenu" class="dropdown">
          <button @click="logout">Logout</button>
          <button @click="deleteAccount">Delete Account</button>
        </div>
      </div>
    </header>

    <LoginForm v-if="!currentUser" @loginSuccess="onLogin" />

    <div v-else class="main-grid">
      <div class="left-column">
        <DailyQuestion />
      </div>

      <div class="center-column">
        <PostForm @messagePosted="fetchMessages" :currentUser="currentUser" />
        <div v-for="msg in messages" :key="msg.id">
          <MessageCard
            :messageData="msg"
            :currentUser="currentUser"
            @messageChanged="fetchMessages"
          />
        </div>
      </div>

      <div class="right-column">
        <TrendingPanel />
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
const showMenu = ref(false)

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
  showMenu.value = false
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
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
.profile-menu {
  position: relative;
  display: flex;
  align-items: center;
}
.username-label {
  margin-right: 8px;
  font-weight: 500;
}
.profile-icon {
  font-size: 24px;
  background: none;
  border: none;
  cursor: pointer;
}
.dropdown {
  position: absolute;
  top: 35px;
  right: 0;
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}
.dropdown button {
  display: block;
  width: 100%;
  background: none;
  border: none;
  padding: 6px 12px;
  text-align: left;
  cursor: pointer;
}
.main-grid {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  gap: 20px;
}
.left-column,
.center-column,
.right-column {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>
