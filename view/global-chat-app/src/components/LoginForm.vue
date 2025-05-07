<template>
    <div class="login-container">
      <h2>{{ isLoginMode ? 'Login' : 'Sign Up' }}</h2>
  
      <form @submit.prevent="handleSubmit">
        <input v-model="username" placeholder="Username" required />
        <input v-model="password" type="password" placeholder="Password" required />
  
        <input
          v-if="!isLoginMode"
          v-model="profilePic"
          placeholder="Profile Pic URL (optional)"
        />
  
        <button type="submit">{{ isLoginMode ? 'Login' : 'Sign Up' }}</button>
      </form>
  
      <p class="toggle">
        <span>
          {{ isLoginMode ? "Don't have an account?" : "Already have an account?" }}
        </span>
        <a href="#" @click.prevent="isLoginMode = !isLoginMode">
          {{ isLoginMode ? 'Sign up here' : 'Log in here' }}
        </a>
      </p>
  
      <p v-if="error" class="error">{{ error }}</p>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import axios from 'axios'
  
  const emit = defineEmits(['loginSuccess'])
  
  const username = ref('')
  const password = ref('')
  const profilePic = ref('')
  const isLoginMode = ref(true)
  const error = ref('')
  
  const handleSubmit = async () => {
    error.value = ''
    const payload = {
      username: username.value,
      password: password.value,
      profilePic: profilePic.value || undefined
    }
  
    try {
      const endpoint = isLoginMode.value ? '/login' : '/signup'
      const res = await axios.post(`http://localhost:3000${endpoint}`, payload)
  
      const user = isLoginMode.value ? res.data.user : { username: res.data.username, profilePic: res.data.profilePic }
      localStorage.setItem('currentUser', JSON.stringify(user))
      emit('loginSuccess', user)
    } catch (err) {
      error.value = err.response?.data?.error || 'Something went wrong'
    }
  }
  </script>
  
  <style scoped>
  .login-container {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    border: 2px solid #ccc;
    border-radius: 12px;
    background: #fffbe6;
    text-align: center;
  }
  input {
    display: block;
    width: 100%;
    padding: 10px;
    margin: 8px 0;
    font-size: 1rem;
  }
  button {
    width: 100%;
    padding: 10px;
    background: #4CAF50;
    color: white;
    border: none;
    cursor: pointer;
    margin-top: 10px;
  }
  .toggle {
    margin-top: 12px;
    font-size: 0.9rem;
  }
  .toggle a {
    color: #007bff;
    text-decoration: underline;
    cursor: pointer;
  }
  .error {
    margin-top: 10px;
    color: red;
  }
  </style>
  