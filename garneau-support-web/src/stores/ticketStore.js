import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTicketStore = defineStore('ticketStore', () => {
  const apiUrl = import.meta.env.VITE_API_URL
  const ticketBaseUrl = `${apiUrl}/tickets`
  const ticketsList = ref([])
  const selectedTicket = ref(null)

  /**
   * Récupère la liste des incidents créés par le client.
   *
   * @param {string} token Token utilisé pour authentifier la requête
   * @returns {Promise<void>} Met à jour la liste des incidents dans le store
   * @throws {Error} Lance une erreur si la requête échoue
   */
  async function getClientTickets(token) {
    try {
      const response = await fetch(`${ticketBaseUrl}/client`, {
        method: 'GET',
        headers: {
          "Authorization": "Bearer " + token
        }
      })
      const data = await response.json()

      if(response.ok) {
        ticketsList.value = data.data
      } else {
        throw new Error(data.message)
      }
    } catch (error) {
      throw error
    }
  }

  /**
   * Récupère la liste des incidents assignés au technicien.
   *
   * @param {string} token Token utilisé pour authentifier la requête
   * @returns {Promise<void>} Met à jour la liste des incidents dans le store
   * @throws {Error} Lance une erreur si la requête échoue
   */
  async function getTechTickets(token) {
    try {
      const response = await fetch(`${ticketBaseUrl}/technician`, {
        method: 'GET',
        headers: {
          "Authorization": "Bearer " + token
        }
      })
      const data = await response.json()

      if(response.ok) {
        ticketsList.value = data.data
      } else {
        throw new Error(data.message)
      }
    } catch (error) {
      throw error
    }
  }

  /**
   * Recherche la liste de tous les incident
   *
   * @param {string} token - Jeton utilisé pour authentifier la requête.
   * @returns {Promise<void>} Met a jours la liste d'incidents.
   * @throws {Error} Lance une erreur si la requête échoue.
   */
  async function getAllTickets(token) {
    try {
      const response = await fetch(`${ticketBaseUrl}/admin`, {
        method: 'GET',
        headers: {
          "Authorization": "Bearer " + token
        }
      })
      const data = await response.json()

      if(response.ok) {
        ticketsList.value = data.data
      } else {
        throw new Error(data.message)
      }
    } catch (error) {
      throw error
    }
  }

  /**
   * Récupère un incident précis selon son identifiant.
   *
   * @param {number} ticketId Identifiant de l'incident à récupérer
   * @param {string} token Token utilisé pour authentifier la requête
   * @returns {Promise<void>} Met à jour l'incident sélectionné dans le store
   * @throws {Error} Lance une erreur si la requête échoue
   */
  async function getTicket(ticketId, token) {
    try {
      const response = await fetch(`${ticketBaseUrl}/${ticketId}`, {
        method: 'GET',
        headers: {
          "Authorization": "Bearer " + token
        }
      })
      const data = await response.json()

      if(response.ok) {
        selectedTicket.value = data.data
      } else if(response.status === 404) {
        selectedTicket.value = null
      } else {
        throw new Error(data.message)
      }
    } catch (error) {
      throw error
    }
  }

  /**
   * Crée un nouvel incident.
   *
   * @param {string} title Titre de l'incident
   * @param {string} description Description de l'incident
   * @param {string} category Catégorie de l'incident
   * @param {string} priority Priorité de l'incident
   * @param {string} token Token utilisé pour authentifier la requête
   * @returns {Promise<void>} Ajoute le nouvel incident dans le store
   * @throws {Error} Lance une erreur si la requête échoue
   */
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
      const data = await response.json()

      if(response.ok) {  
        selectedTicket.value = data.data
      } else {
        throw new Error(data.message)
      }
    } catch (error) {
      throw error
    }
  }

  /**
   * Assigne un incident au technicien connecté.
   *
   * @param {number} ticketId Identifiant de l'incident à assigner
   * @param {string} token Token utilisé pour authentifier la requête
   * @returns {Promise<void>} Met à jour la liste des incidents du technicien
   * @throws {Error} Lance une erreur si la requête échoue
   */
  async function selfAssignTicket(ticketId, token) {
    try{
      const response = await fetch(`${ticketBaseUrl}/${ticketId}/assign/me`, {
        method: 'PATCH',
        headers: {
          "Authorization": "Bearer " + token
        }
      })
      const data = await response.json()

      if(response.ok) {
        getTechTickets(token)
      } else if (response.status === 404){
        selectedTicket.value = null
      } else {
        
        throw new Error(data.message)
      }
    } catch (error) {
      throw error
    }
  }

  /**
   * Modifie un incident existant.
   *
   * @param {number} ticketId Identifiant de l'incident à modifier
   * @param {string} token Token utilisé pour authentifier la requête
   * @param {Object} body Données de modification de l'incident
   * @returns {Promise<void>} Met à jour l'incident dans le store
   * @throws {Error} Lance une erreur si la requête échoue
   */
  async function updateTicket(ticketId, token, body) {
    try {
      const response = await fetch(`${ticketBaseUrl}/${ticketId}`, {
        method: 'PATCH',
         headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token
        },
        body: JSON.stringify(body)
      })
      const data = await response.json()

      if(response.ok) {
        selectedTicket.value = data.data
        return data
      } else {
        throw new Error(data.message)
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
    getAllTickets,
    getTicket,
    createTicket,
    updateTicket
  }
})