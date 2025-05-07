<template>
    <div class="daily-question">
      <h2>🗓️ Daily Question</h2>
      <p>{{ question }}</p>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import axios from 'axios'
  
  const question = ref('')
  
  const fetchQuestion = async () => {
    try {
      const res = await axios.get('http://localhost:3000/dailyQuestion')
      question.value = res.data.question
    } catch (err) {
      console.error('Failed to fetch daily question:', err)
    }
  }
  
  onMounted(() => {
    fetchQuestion()
  })
  </script>
  
  <style scoped>
  .daily-question {
    background-color: #e0f7fa;
    padding: 16px;
    border-radius: 8px;
    margin-bottom: 16px;
  }
  </style>
  