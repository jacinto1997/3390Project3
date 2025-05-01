<template>
  <div class="container">
    <h1>Global Chat</h1>
    <!-- <PostForm @messagePosted="fetchMessages" /> -->
    <PostForm @messagePosted="addFakeMessage" />
    <div class="message-list">
      <MessageCard
        v-for="msg in messages"
        :key="msg.id"
        :messageData="msg"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import PostForm from './components/PostForm.vue'
import MessageCard from './components/MessageCard.vue'


const messages = ref([
  {
    id: 1,
    username: "Matthew",
    message: "This is a test post.",
    date: "April 28, 2025 — 3:45 PM",
    weather: "Clear",
    temp: "72"
  },
  {
    id: 2,
    username: "Sarah",
    message: "It's cloudy where I am!",
    date: "April 28, 2025 — 3:46 PM",
    weather: "Clouds",
    temp: "68"
  }
])


const fetchMessages = async () => {
  try {
    const res = await axios.get('http://localhost:3000/getMessages')
    messages.value = res.data
  } catch (err) {
    console.error('Error fetching messages:', err)
  }
}

const addFakeMessage = (newMsg) => {
  newMsg.id = messages.value.length + 1
  messages.value.unshift(newMsg)
}

// onMounted(fetchMessages)
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: auto;
  padding: 20px;
  font-family: sans-serif;
}
.message-list {
  margin-top: 20px;
}
</style>