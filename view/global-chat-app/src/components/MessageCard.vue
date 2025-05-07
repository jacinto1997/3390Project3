<template>
  <div class="message-card">
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
  </div>
</template>

<script setup>
const props = defineProps({
  messageData: Object
})

const defaultPic = 'https://i.imgur.com/0y0y0y0.png' // Replace with a real default image URL

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
</script>

<style scoped>
.message-card {
  background: #fefcbf;
  border-radius: 12px;
  padding: 16px;
  margin: 12px 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  gap: 8px;
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
  margin: 0;
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
  margin: 8px 0;
}

.bottom-row {
  display: flex;
  justify-content: space-between;
  font-size: 0.85rem;
  color: #444;
}
.meta {
  margin: 0;
}
</style>
