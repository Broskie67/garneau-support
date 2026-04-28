import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAdminStore = defineStore('adminStore', () => {
  const apiUrl = import.meta.env.VITE_API_URL
  const usersList = ref([])

  async function getUsers(token) {
    try {
      const response = await fetch(`${apiUrl}/admin/users`, {
        method: 'GET',
        headers: {
          "Authorization": "Bearer " + token
        }
      })
      if(response.ok) {
        const data = await response.json()
        usersList.value = data.data
      } else {
        const errorData = await response.json()
        throw new Error(errorData.message)
      }
    } catch (error) {
      throw error
    }
  }

  async function changeUserStatus(userId, token) {
    try{
      const response = await fetch(`${apiUrl}/admin/users/${userId}/status`, {
        method: 'PATCH',
        headers: {
          "Authorization": "Bearer " + token
        }
      })
      if(response.ok) {
        getUsers(token)
      } else {
        const errorData = await response.json()
        throw new Error(errorData.message)
      }

    } catch (error) {
      throw error
    }
  }
  return {
    usersList,
    getUsers,
    changeUserStatus
  }

})