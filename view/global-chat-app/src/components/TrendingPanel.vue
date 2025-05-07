<template>
    <div class="trending-card">
      <h2>🔥 Trending Posts</h2>
      <div v-if="trendingMessages.length === 0">No trending posts yet.</div>
      <ul>
        <li v-for="msg in trendingMessages" :key="msg.message" class="trending-item">
          <strong>{{ msg.username }}:</strong> "{{ msg.message }}"
          <span class="likes">👍 {{ msg.likes }}</span>
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
  .trending-card {
    background-color: #2196f3;
    color: white;
    padding: 16px;
    border-radius: 16px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
  h2 {
    margin-bottom: 12px;
  }
  ul {
    list-style: none;
    padding: 0;
  }
  .trending-item {
    margin-bottom: 10px;
    font-size: 0.95rem;
  }
  .likes {
    float: right;
    font-weight: bold;
  }
  </style>
  