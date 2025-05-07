<template>
  <form @submit.prevent="submitMessage">
    <input v-model="username" placeholder="Your Name" required />
    <textarea v-model="message" placeholder="Your Message" required />
    <button type="submit">Post</button>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

const emit = defineEmits(['messagePosted'])
const username = ref('')
const message = ref('')

const submitMessage = async () => {
  if (!navigator.geolocation) return alert('Location not supported.')

  navigator.geolocation.getCurrentPosition(async (pos) => {
    const lat = pos.coords.latitude
    const lon = pos.coords.longitude

    try {
      const apiKey = '9055233e47a5f72f45363e40bbad40f3'
      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`

      const weatherRes = await fetch(weatherUrl)
      const weatherData = await weatherRes.json()
      console.log('Weather data:', weatherData)  // <-- add this

      const weather = weatherData.weather[0].main
      const temp = Math.round(weatherData.main.temp)
      const city = weatherData.name || 'Unknown'

      const postData = {
        username: username.value,
        message: message.value,
        lat,
        lon,
        weather,
        temp,
        city
      }

      await axios.post('http://localhost:3000/addMessage', postData)
      emit('messagePosted')
      username.value = ''
      message.value = ''
    } catch (err) {
      console.error('Failed to post message:', err)
      alert('Could not fetch weather or post message.')
    }
  }, () => {
    alert('Failed to get location.')
  })
}
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
input, textarea {
  padding: 10px;
  font-size: 16px;
}
button {
  padding: 10px;
  background: #4CAF50;
  color: white;
  border: none;
  cursor: pointer;
}
</style>
