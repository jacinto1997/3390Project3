<template>
    <div class="trending-panel">
      <h2>🔥 Trending Messages</h2>
      <ul>
        <li v-for="msg in trendingMessages" :key="msg.id">
          <strong>{{ msg.username }}:</strong> {{ msg.message }} (👍 {{ msg.likes }})
        </li>
      </ul>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import axios from 'axios'
  
  const trendingMessages = ref([])
  
  const fetchTrendingMessages = async () => {
    try {
      const res = await axios.get('http://localhost:3000/trendingMessages')
      trendingMessages.value = res.data
    } catch (err) {
      console.error('Failed to fetch trending messages:', err)
    }
  }
  
  onMounted(() => {
    fetchTrendingMessages()
  })
  </script>
  
  <style scoped>
  .trending-panel {
    background-color: #fff3e0;
    padding: 16px;
    border-radius: 8px;
    margin-bottom: 16px;
  }
  </style>
  