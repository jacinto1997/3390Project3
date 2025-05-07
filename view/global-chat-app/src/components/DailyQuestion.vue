<template>
    <div class="daily-card">
      <h2>📅 Daily Question</h2>
      <p class="question">{{ question }}</p>
  
      <textarea
        v-model="response"
        placeholder="Type your response..."
        class="response-box"
      ></textarea>
  
      <button @click="submitResponse" class="submit-btn">Submit</button>
  
      <p v-if="submitted" class="thank-you">Thanks for your response!</p>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import axios from 'axios'
  
  const question = ref('')
  const response = ref('')
  const submitted = ref(false)
  
  const fetchQuestion = async () => {
    try {
      const res = await axios.get('http://localhost:3000/dailyQuestion')
      question.value = res.data.question
    } catch (err) {
      console.error('Failed to fetch daily question:', err)
    }
  }
  
  const submitResponse = () => {
    if (!response.value.trim()) return
    // You could POST this to backend later
    console.log('Response submitted:', response.value)
    submitted.value = true
    response.value = ''
  }
  
  onMounted(() => {
    fetchQuestion()
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
  </style>
  