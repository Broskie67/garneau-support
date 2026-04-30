import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTicketStore = defineStore('ticketStore', () => {
  const apiUrl = import.meta.env.VITE_API_URL
  const ticketsList = ref([])

  async function getTickets(token) {
    try {
      const response = await fetch(`${apiUrl}/tickets`, {
        method: 'GET',
        headers: {
          "Authorization": "Bearer " + token
        }
      })
      if(response.ok) {
        const data = await response.json()
        console.log('Réponse complète tickets:', data)
        console.log('data.data:', data.data)

        ticketsList.value = data.data
      } else {
        const errorData = await response.json()
        throw new Error(errorData.message)
      }
    } catch (error) {
      throw error
    }
  }

  return {
    ticketsList,
    getTickets
  }
})