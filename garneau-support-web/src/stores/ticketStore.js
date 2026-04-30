import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTicketStore = defineStore('ticketStore', () => {
  const apiUrl = import.meta.env.VITE_API_URL
  const ticketsList = ref([])

  async function getClientTickets(token) {
    try {
      const response = await fetch(`${apiUrl}/tickets/client`, {
        method: 'GET',
        headers: {
          "Authorization": "Bearer " + token
        }
      })
      if(response.ok) {
        const data = await response.json()
        ticketsList.value = data.data
      } else {
        const errorData = await response.json()
        throw new Error(errorData.message)
      }
    } catch (error) {
      throw error
    }
  }

  async function getTechTickets(token) {
    try {
      const response = await fetch(`${apiUrl}/tickets/technician`, {
        method: 'GET',
        headers: {
          "Authorization": "Bearer " + token
        }
      })
      if(response.ok) {
        const data = await response.json()
        ticketsList.value = data.data
      } else {
        const errorData = await response.json()
        throw new Error(errorData.message)
      }
    } catch (error) {
      throw error
    }
  }

  async function selfAssignTicket(ticketId, token) {
    try{
      const response = await fetch(`${apiUrl}/tickets/${ticketId}/assign/me`, {
        method: 'PATCH',
        headers: {
          "Authorization": "Bearer " + token
        }
      })
      if(response.ok) {
        getTechTickets(token)
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
    getClientTickets,
    getTechTickets,
    selfAssignTicket
  }
})