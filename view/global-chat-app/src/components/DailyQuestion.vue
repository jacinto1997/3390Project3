<template>
    <div class="daily-card">
      <h2>📅 Daily Question</h2>
      <p class="question">{{ question }}</p>
  
      <textarea
        v-model="response"
        placeholder="Type your response..."
        class="respons-box"
      ></textarea>
  
      <button @click="submitResponse" class="submit-btn">Submit</button>
  
      <p v-if="submitted" class="thank-you">Thanks for your response!</p>
  
      <div class="responses">
        <h3>💬 Community Responses</h3>
        <div
          v-for="entry in responses"
          :key="entry.id"
          class="response-item"
        >
          <strong>{{ entry.username }}</strong>:
          <span>{{ entry.response }}</span>
          <div class="timestamp">{{ entry.timestamp }}</div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import axios from 'axios'
  
  const question = ref('')
  const response = ref('')
  const submitted = ref(false)
  const responses = ref([])
  
  const fetchQuestion = async () => {
    try {
      const res = await axios.get('http://localhost:3000/dailyQuestion')
      question.value = res.data.question
    } catch (err) {
      console.error('Failed to fetch daily question:', err)
    }
  }
  
  const fetchResponses = async () => {
    try {
      const res = await axios.get('http://localhost:3000/dailyResponses')
      responses.value = res.data
    } catch (err) {
      console.error('Failed to load responses:', err)
    }
  }
  
  const submitResponse = async () => {
    if (!response.value.trim()) return
    const user = JSON.parse(localStorage.getItem('currentUser'))
    if (!user) return alert('You must be logged in to respond.')
  
    try {
      await axios.post('http://localhost:3000/dailyResponse', {
        username: user.username,
        response: response.value
      })
      response.value = ''
      submitted.value = true
      await fetchResponses()
    } catch (err) {
      console.error('Submit failed:', err)
      alert('Could not submit response.')
    }
  }
  
  onMounted(() => {
    fetchQuestion()
    fetchResponses()
  })
  </script>
  
  <style scoped>
  .daily-card {
    background-color: #ab47bc;
    color: white;
    padding: 16px;
    border-radius: 16px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
  h2 {
    margin-bottom: 10px;
  }
  .question {
    font-weight: bold;
    font-size: 1.2rem;
    text-align: center;
    margin-bottom: 12px;
  }
  .response-box {
    width: 100%;
    min-height: 60px;
    padding: 8px;
    border-radius: 8px;
    border: none;
    resize: none;
    font-size: 1rem;
    margin-bottom: 10px;
  }
  .submit-btn {
    background-color: #fff;
    color: #ab47bc;
    border: none;
    padding: 8px 16px;
    font-weight: bold;
    border-radius: 8px;
    cursor: pointer;
  }
  .thank-you {
    margin-top: 10px;
    font-size: 0.9rem;
    color: #fff8e1;
    text-align: center;
  }
  .responses {
    margin-top: 20px;
    background-color: #9c27b0;
    padding: 12px;
    border-radius: 12px;
  }
  .response-item {
    margin-bottom: 10px;
    font-size: 0.95rem;
  }
  .timestamp {
    font-size: 0.75rem;
    opacity: 0.7;
  }
  </style>
  