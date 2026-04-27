import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useProfileStore = defineStore('profileStore', () => {
  const apiUrl = import.meta.env.VITE_API_URL
  const userProfile = ref(null)

  async function getProfile(token) {
    try{
      const response = await fetch(`${apiUrl}/profile`, {
        method: 'GET',
        headers: {
          "Authorization": "Bearer " + token
        }
      })
      if(response.ok){
        const data = await response.json()
        userProfile.value = data.data
      } else {
        const errorData = await response.json()
        throw new Error(errorData.message)
      }
    } catch (error) {
      throw error
    }
  }
  
  return {
    userProfile,
    getProfile
  };
},{
  persist: true
})