<template>
  <div class="daily-question">
    <div class="question-box">
      <h3 class="panel-title">❓ Daily Question</h3>
      <p class="question-text">{{ question }}</p>
      <input v-model="response" placeholder="Write your response..." />
      <button @click="submitResponse">Submit</button>
    </div>

    <div v-if="responses.length" class="responses-box">
      <h4><span class="panel-title"> 💬 Responses:</span></h4>
      <div class="response-item" v-for="(entry, index) in responses" :key="index">
        <strong>{{ entry.username }}:</strong> {{ entry.response }}
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
const responses = ref([])

const fetchQuestion = async () => {
  const res = await axios.get('http://localhost:3000/dailyQuestion')
  question.value = res.data.question
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
  const currentUser = JSON.parse(localStorage.getItem('currentUser'))
  if (!currentUser) return alert('Please log in first.')

  if (!response.value.trim()) return

  await axios.post('http://localhost:3000/dailyResponse', {
    username: currentUser.username,
    response: response.value.trim()
  })

  response.value = ''
  fetchResponses()
}

onMounted(() => {
  fetchQuestion()
  fetchResponses()
})
</script>

<style scoped>
.daily-question {
  background-color: var(--response-bg);
  padding: 16px;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  color: inherit;
  border: 1px solid rgba(255, 255, 255, 0.1); /* subtle border in dark */

}

.question-box {
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  
}


.question-text {
  font-size: 1.1rem;
  margin: 8px 0 12px;
  color: #2C3E50;
  
}

input {
  display: block;
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
  font-size: 1rem;
  margin: 0 auto 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
  outline-color: #4A90E2;
  
}


button {
  background-color: var(--primary-button);
  color: var(--button-text);
  border: none;
  padding: 10px 14px;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.2s ease;
  border: 1px solid rgba(255, 255, 255, 0.1); /* subtle border in dark */

}

button:hover {
  background-color: #357ABD;
}

.responses-box {
  margin-top: 20px;
  
}

.response-item {
  background-color: var(--bubble-bg);
  padding: 12px 16px;
  border-radius: 12px;
  margin-bottom: 8px;
  color: inherit;
  border: 1px solid rgba(255, 255, 255, 0.1); /* subtle border in dark */

}

.timestamp {
  font-size: 0.75rem;
  color: var(--title-text);
  margin-top: 4px;
}
.panel-title {
  background-color: var(--title-bg);
  color: var(--title-text);
  padding: 10px 16px;
  border-radius: 10px;
  font-weight: 600;
  font-size: 1.2rem;
  margin-bottom: 12px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
}

</style>
