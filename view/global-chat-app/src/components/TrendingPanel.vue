<template>
  <div class="trending-panel">
      <h3 class="panel-title">🔥 Trending Posts</h3>
      <ul>
      <li v-for="(item, index) in trending" :key="index">
<strong>{{ item.username }}</strong>: "{{ item.message }}" — {{ item.likes }} 👍
</li>

    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const trending = ref([])

const fetchTrending = async () => {
  try {
    const res = await axios.get('http://localhost:3000/trendingMessages')
    trending.value = res.data
  } catch (err) {
    console.error('Failed to fetch trending messages:', err)
  }
}

onMounted(() => {
  fetchTrending()
})
</script>

<style scoped>
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

.trending-panel {
  background-color: #FFFFFF;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  color: #333333;
  border: 1px solid rgba(255, 255, 255, 0.1); /* subtle border in dark */

}

h3 {
  margin-bottom: 12px;
  /* Trending Post font color*/
  color: #2C3E50;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

li {
background-color: var(--bubble-bg);
padding: 12px 16px;
border-radius: 12px;
margin-bottom: 8px;
color: inherit;
border: 1px solid rgba(255, 255, 255, 0.1); /* subtle border in dark */

}

</style>
