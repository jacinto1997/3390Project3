<template>
  <div class="login-container">
    <div class="login-card">
      <h2><span class="form-title">Sign In</span></h2>        <input v-model="loginUsername" placeholder="Username" />
      <input v-model="loginPassword" type="password" placeholder="Password" />
      <button @click="login">Login</button>
    </div>

    <div class="login-card">
      <h2><span class="form-title">Sign Up</span></h2>
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
background-color: var(--login-container-bg);
padding: 40px 0;
border-radius: 16px;
box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1); /* subtle lift effect */
border: 1px solid rgba(0, 0, 0, 0.05);      /* subtle border in light mode */
}


.login-card {
background-color: var(--login-bg); /* use the variable instead of fixed white */
color: var(--login-text);
border-radius: 12px;
padding: 24px;
box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
min-width: 280px;
max-width: 340px;
display: flex;
flex-direction: column;
gap: 12px;
}

.form-title {
background-color: var(--title-bg);
color: var(--title-text);
padding: 8px 16px;
border-radius: 10px;
font-weight: 600;
font-size: 1.1rem;
display: inline-block;
box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
}



h2 {
  margin-bottom: 8px;
  text-align: center;
  color: #2C3E50;
}

input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
  outline-color: #4A90E2;
}

button {
  background: #4A90E2;
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
  background: #357ABD;
}
</style>
