<template>
  <form @submit.prevent="submitMessage">
    <textarea v-model="message" placeholder="Your Message" required />
    <button type="submit">Post</button>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

const emit = defineEmits(['messagePosted'])
const message = ref('')

const submitMessage = async () => {
  if (!navigator.geolocation) return alert('Location not supported.')

  const user = JSON.parse(localStorage.getItem('currentUser'))
  if (!user) return alert('You must be logged in to post.')

  navigator.geolocation.getCurrentPosition(async (pos) => {
    const lat = pos.coords.latitude
    const lon = pos.coords.longitude

    try {
      // Weather
      const weatherApiKey = '9055233e47a5f72f45363e40bbad40f3'
      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${weatherApiKey}&units=imperial`
      const weatherRes = await fetch(weatherUrl)
      const weatherData = await weatherRes.json()
      const weather = weatherData.weather[0].main
      const temp = Math.round(weatherData.main.temp)

      // Location
      const geoApiKey = '7992c03b9e8b44e2ab85717dac1b2e17'
      const geoUrl = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=${geoApiKey}`
      const geoRes = await fetch(geoUrl)
      const geoData = await geoRes.json()
      const city =
        geoData.results[0]?.components?.city ||
        geoData.results[0]?.components?.town ||
        geoData.results[0]?.components?.village ||
        geoData.results[0]?.components?.state_district ||
        'Unknown'

      const postData = {
        username: user.username,
        profilePic: user.profilePic,
        message: message.value,
        lat,
        lon,
        weather,
        temp,
        city,
        date: new Date().toLocaleString()
      }

      await axios.post('https://global-chat-backend-tnn2.onrender.com/addMessage', postData)
      emit('messagePosted')
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
textarea {
  padding: 10px;
  font-size: 16px;
  resize: none;
  
}
button {
  padding: 10px;
  background: #4CAF50;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  transition: background 0.2s ease;
  border: 1px solid rgba(255, 255, 255, 0.1); /* subtle border in dark */
  }

  button:hover {
  background-color: #3e8e41; /* darker green */
}
</style>
