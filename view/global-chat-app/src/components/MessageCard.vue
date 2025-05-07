<template>
  <div class="message-card" :style="{ backgroundColor: getColor(messageData.weather) }">
    <div class="top-row">
      <div class="user-info">
        <img class="profile-pic" :src="messageData.profilePic || defaultPic" alt="User" />
        <h3 class="username">{{ messageData.username }}</h3>
      </div>
      <div class="weather">
        <span>{{ getIcon(messageData.weather) }}</span>
        {{ messageData.temp }}°F
      </div>
    </div>

    <p class="text">{{ messageData.message }}</p>

    <div class="bottom-row">
      <p class="meta">{{ messageData.date }}</p>
      <p class="meta">📍 {{ messageData.city || 'Unknown Location' }}</p>
    </div>

    <div class="reactions">
      <button @click="react('like')">👍 {{ messageData.likes }}</button>
      <button @click="react('dislike')">👎 {{ messageData.dislikes }}</button>

      <button
        v-if="currentUser?.username === messageData.username"
        @click="deleteMessage"
        class="delete-btn"
      >
        🗑️
      </button>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios'

const props = defineProps({
  messageData: Object,
  currentUser: Object
})

const emit = defineEmits(['messageChanged'])

const defaultPic = 'https://i.imgur.com/0y0y0y0.png' // fallback pic

const getIcon = (weather) => {
  switch (weather) {
    case 'Clear': return '☀️'
    case 'Clouds': return '☁️'
    case 'Rain': return '🌧️'
    case 'Snow': return '❄️'
    case 'Thunderstorm': return '⛈️'
    case 'Drizzle': return '🌦️'
    case 'Mist':
    case 'Fog':
    case 'Haze': return '🌫️'
    default: return '🌡️'
  }
}

const getColor = (weather) => {
  switch (weather) {
    case 'Clear': return '#fefcbf'
    case 'Clouds': return '#e0e0e0'
    case 'Rain': return '#cce5ff'
    case 'Snow': return '#f0faff'
    case 'Thunderstorm': return '#e5ccff'
    case 'Drizzle': return '#d6ecff'
    case 'Mist':
    case 'Fog':
    case 'Haze': return '#dddddd'
    default: return '#f8f8f8'
  }
}

const react = async (type) => {
  try {
    await axios.post(`http://localhost:3000/${type}/${props.messageData.id}`)
    emit('messageChanged')
  } catch (err) {
    alert('Failed to send reaction')
    console.error(err)
  }
}

const deleteMessage = async () => {
  if (!confirm('Delete this message?')) return
  try {
    await axios.post(`http://localhost:3000/deleteMessage/${props.messageData.id}`, {
      username: props.currentUser.username
    })
    emit('messageChanged')
  } catch (err) {
    alert('Failed to delete message')
    console.error(err)
  }
}
</script>

<style scoped>
.message-card {
  padding: 16px;
  border-radius: 12px;
  margin: 12px 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  border: 1px solid #ccc;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.top-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.user-info {
  display: flex;
  align-items: center;
  gap: 10px;
}
.profile-pic {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #ccc;
}
.username {
  font-weight: 600;
  font-size: 1.1rem;
}
.weather {
  font-size: 1rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 6px;
}
.text {
  font-size: 1.05rem;
  line-height: 1.4;
  text-align: center;
}
.bottom-row {
  display: flex;
  justify-content: space-between;
  font-size: 0.85rem;
  color: #444;
}
.reactions {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
}
.reactions button {
  background: none;
  border: none;
  font-size: 1rem;
  cursor: pointer;
}
.delete-btn {
  color: red;
}
</style>
