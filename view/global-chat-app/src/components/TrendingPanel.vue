<template>
    <div class="trending-card">
      <h2>🔥 Trending</h2>
      <table>
        <thead>
          <tr>
            <th>Words</th>
            <th>Mentions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="msg in trendingMessages" :key="msg.id">
            <td>{{ msg.word }}</td>
            <td>{{ msg.count }}</td>
          </tr>
        </tbody>
      </table>
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
  table {
    width: 100%;
    border-collapse: collapse;
  }
  th,
  td {
    text-align: left;
    padding: 6px;
  }
  tbody tr:nth-child(even) {
    background-color: rgba(255, 255, 255, 0.1);
  }
  </style>
  