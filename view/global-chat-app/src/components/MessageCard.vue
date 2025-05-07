<template>
  <div class="card">
    <div class="card-header">
      <div class="profile">
        <div class="avatar">
          <img
            v-if="messageData.profilePic"
            :src="messageData.profilePic"
            alt="avatar"
          />
          <span v-else>{{ messageData.username.charAt(0).toUpperCase() }}</span>
        </div>
        <strong>{{ messageData.username }}</strong>
      </div>
      <div class="weather-info">
        <span>{{ messageData.city }}</span>
        <span>{{ weatherEmoji(messageData.weather) }} {{ messageData.temp }}°F</span>
      </div>
    </div>

    <p class="message-text">{{ messageData.message }}</p>

    <div class="card-footer">
      <div class="timestamp">{{ messageData.date }}</div>
      <div class="actions">
        <span @click="like" class="action">👍 {{ messageData.likes }}</span>
        <span @click="dislike" class="action">👎 {{ messageData.dislikes }}</span>
        <span
          v-if="currentUser?.username === messageData.username"
          @click="deleteMsg"
          class="action delete"
        >🗑️</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios'
const props = defineProps(['messageData', 'currentUser'])
const emit = defineEmits(['messageChanged'])

const like = async () => {
  await axios.post(`http://localhost:3000/like/${props.messageData.id}`)
  emit('messageChanged')
}
const dislike = async () => {
  await axios.post(`http://localhost:3000/dislike/${props.messageData.id}`)
  emit('messageChanged')
}
const deleteMsg = async () => {
  if (confirm('Delete this message?')) {
    await axios.post(`http://localhost:3000/deleteMessage/${props.messageData.id}`, {
  username: props.currentUser.username
})

    emit('messageChanged')
  }
}

const weatherEmoji = (weather) => {
  const map = {
    Clear: '☀️',
    Clouds: '⛅',
    Rain: '🌧️',
    Thunderstorm: '⛈️',
    Snow: '❄️',
    Drizzle: '🌦️',
    Mist: '🌫️'
  }
  return map[weather] || '🌡️'
}
</script>

<style scoped>
.card {
  background-color: #fff9c4;
  padding: 16px;
  border-radius: 12px;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 12px;
  position: relative;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.profile {
  display: flex;
  align-items: center;
  gap: 8px;
}

.avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  overflow: hidden;
  background-color: #4caf50;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1rem;
  border: 1px solid #ccc;
}

.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.weather-info {
  font-size: 0.9rem;
  text-align: right;
  color: #333;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 2px;
}

.message-text {
  margin: 16px 0;
  font-size: 1.1rem;
  word-wrap: break-word;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  font-size: 0.8rem;
  color: #444;
  padding-top: 10px;
}

.timestamp {
  align-self: flex-end;
}

.actions {
  display: flex;
  gap: 10px;
}

.action {
  cursor: pointer;
}

.delete {
  color: red;
}
</style>
