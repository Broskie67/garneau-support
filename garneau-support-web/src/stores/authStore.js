import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('authStore', () => {
  const apiUrl = import.meta.env.VITE_API_URL
  const user = ref(JSON.parse(localStorage.getItem('user')) || null)
  const token = ref(localStorage.getItem('token') || null)

  const isConnected = computed(() => !!token.value ) 

  function setUser(newUser) {
    user.value = newUser;
    localStorage.setItem('user', JSON.stringify(newUser))
  }

  function setToken(newToken) {
    token.value = newToken
    localStorage.setItem('token', newToken)
  }

  function logout() {
    user.value = null;
    token.value = null
    localStorage.removeItem('user')
    localStorage.removeItem('token')
  }

  async function signin(email, password) {
    try{
      const response = await fetch(`${apiUrl}/auth/signin`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          password
        })
      })

      if(response.ok) {
        const data = await response.json()
        setToken(data.data.token)
        setUser(data.data.user)
        return true
        
      } else {
        const errorData = await response.json()
        throw new Error(errorData.message)
      }

    } catch(error) {
      throw error
    } 
  }

  async function signup(firstName, lastName, email, phoneNumber, password, confirmPassword) {
    try {
      const response = await fetch(`${apiUrl}/auth/signup`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          phoneNumber,
          password,
          confirmPassword
        })
      })
      if(response.ok) {
        const data = await response.json()
        setToken(data.data.token)
        setUser(data.data.user)
      } else {
        const errorData = await response.json()
        throw new Error(errorData.message)
      }

    } catch (error) {
      throw error
    }
  }


  return {
    user,
    token,
    isConnected,
    setToken,
    setUser,
    logout,
    signin,
    signup
  };
},{
  persist: true
})