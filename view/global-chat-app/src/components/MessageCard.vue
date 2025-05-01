<template>
  <div class="card" :style="{ backgroundColor: getColor(weather) }">
    <div class="info">
      <strong>{{ username }}</strong>
      <p>{{ message }}</p>
      <small>{{ date }}</small>
    </div>
    <div class="weather">
      <span>{{ getIcon(weather) }}</span>
      <p>{{ temp }}°F</p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  messageData: Object
})

const { username, message, date, weather, temp } = props.messageData

const getIcon = (condition) => {
  switch (condition) {
    case 'Clear': return '☀️'
    case 'Clouds': return '🌥️'
    case 'Rain': return '🌧️'
    case 'Snow': return '❄️'
    case 'Thunderstorm': return '⛈️'
    default: return '❓'
  }
}

const getColor = (condition) => {
  switch (condition) {
    case 'Clear': return '#FF6961'
    case 'Clouds': return '#85C1E9'
    case 'Rain': return '#A9A9A9'
    case 'Snow': return '#ADD8E6'
    case 'Thunderstorm': return '#555555'
    default: return '#D3D3D3'
  }
}
</script>

<style scoped>
.card {
  display: flex;
  justify-content: space-between;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 10px;
  color: #fff;
}
.weather {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 18px;
}
</style>