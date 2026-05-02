import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTicketStore = defineStore('ticketStore', () => {
  const apiUrl = import.meta.env.VITE_API_URL
  const ticketBaseUrl = `${apiUrl}/tickets`
  const ticketsList = ref([])
  const selectedTicket = ref(null)

  async function getClientTickets(token) {
    try {
      const response = await fetch(`${ticketBaseUrl}/client`, {
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
      const response = await fetch(`${ticketBaseUrl}/technician`, {
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

  async function getTicket(ticketId, token) {
    try {
      const response = await fetch(`${ticketBaseUrl}/${ticketId}`, {
        method: 'GET',
        headers: {
          "Authorization": "Bearer " + token
        }
      })
      if(response.ok) {
        const data = await response.json()
        selectedTicket.value = data.data
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
      const response = await fetch(`${ticketBaseUrl}/${ticketId}/assign/me`, {
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
    selectedTicket,
    getClientTickets,
    getTechTickets,
    selfAssignTicket,
    getTicket
  }
})