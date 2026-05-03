import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTicketStore = defineStore('ticketStore', () => {
  const apiUrl = import.meta.env.VITE_API_URL
  const ticketBaseUrl = `${apiUrl}/tickets`
  const ticketsList = ref([])
  const selectedTicket = ref(null)

  /**
   * Fetches the list of tickets created by the client.
   *
   * @param {string} token - Token used to authenticate the request.
   * @returns {Promise<void>} Updates the tickets list in the store.
   * @throws {Error} Throws an error if the request fails.
   */
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

  /**
   * Fetches the list of tickets assigned to the technician.
   *
   * @param {string} token - Token used to authenticate the request.
   * @returns {Promise<void>} Updates the tickets list in the store.
   * @throws {Error} Throws an error if the request fails.
   */
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

  /**
   * Fetches a specific ticket by its ID.
   *
   * @param {number} ticketId - ID of the ticket to fetch.
   * @param {string} token - Token used to authenticate the request.
   * @returns {Promise<void>} Updates the selected ticket in the store.
   * @throws {Error} Throws an error if the request fails.
   */
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

  
  async function createTicket(title, description, category, priority, token) {
    try {
      const response = await fetch(`${ticketBaseUrl}`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token
        },
        body: JSON.stringify({
          title,
          description,
          category,
          priority
        })
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

  /**
   * Assigns a ticket to the currently authenticated technician.
   *
   * @param {number} ticketId - ID of the ticket to assign.
   * @param {string} token - Token used to authenticate the request.
   * @returns {Promise<void>} Refreshes the technician tickets list after assignment.
   * @throws {Error} Throws an error if the request fails.
   */
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
    getTicket,
    createTicket
  }
})