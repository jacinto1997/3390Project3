<template>
    <div class="login-container">
      <div class="login-card">
        <h2>Sign In</h2>
        <input v-model="loginUsername" placeholder="Username" />
        <input v-model="loginPassword" type="password" placeholder="Password" />
        <button @click="login">Login</button>
      </div>
  
      <div class="login-card">
        <h2>Sign Up</h2>
        <input v-model="signupUsername" placeholder="Username" />
        <input v-model="signupPassword" type="password" placeholder="Password" />
        <button @click="signup">Create Account</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import axios from 'axios'
  
  const emit = defineEmits(['loginSuccess'])
  
  const loginUsername = ref('')
  const loginPassword = ref('')
  const signupUsername = ref('')
  const signupPassword = ref('')
  
  const login = async () => {
    try {
      const res = await axios.post('http://localhost:3000/login', {
        username: loginUsername.value,
        password: loginPassword.value
      })
      localStorage.setItem('currentUser', JSON.stringify(res.data))
      emit('loginSuccess', res.data)
    } catch (err) {
      alert('Login failed: ' + (err.response?.data?.error || err.message))
    }
  }
  
  const signup = async () => {
    try {
      await axios.post('http://localhost:3000/signup', {
        username: signupUsername.value,
        password: signupPassword.value
      })
      alert('Account created! You can now log in.')
      signupUsername.value = ''
      signupPassword.value = ''
    } catch (err) {
      alert('Signup failed: ' + (err.response?.data?.error || err.message))
    }
  }
  </script>
  
  <style scoped>
  .login-container {
    display: flex;
    justify-content: center;
    gap: 40px;
    margin-top: 60px;
    flex-wrap: wrap;
  }
  
  .login-card {
    background: #ffffff;
    border-radius: 12px;
    padding: 24px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
    min-width: 280px;
    max-width: 340px;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  
  h2 {
    margin-bottom: 8px;
    text-align: center;
    color: #4caf50;
  }
  
  input {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-size: 1rem;
    outline-color: #4caf50;
  }
  
  button {
    background: #4caf50;
    color: white;
    border: none;
    padding: 10px;
    font-size: 1rem;
    font-weight: bold;
    border-radius: 8px;
    cursor: pointer;
    transition: background 0.2s ease;
  }
  
  button:hover {
    background: #388e3c;
  }
  </style>
  