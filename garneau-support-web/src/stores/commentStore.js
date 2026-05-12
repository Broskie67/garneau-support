import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCommentStore = defineStore('commentStore',  () => {
  const apiUrl = import.meta.env.VITE_API_URL
  const commentBaseUrl = `${apiUrl}/tickets`
  const commentList = ref([])

  /**
   * Récupère les commentaires d'un incident.
   *
   * @param {number} ticketId Identifiant de l'incident
   * @param {string} token Token utilisé pour authentifier la requête
   * @returns {Promise<void>} Met à jour la liste des commentaires dans le store
   * @throws {Error} Lance une erreur si la requête échoue
   */
  async function getTicketComments(ticketId, token) {
    try {
      const response = await fetch(`${commentBaseUrl}/${ticketId}/comments`, {
        method: 'GET',
        headers: {
          "Authorization": "Bearer " + token
        }
      })
      const data = await response.json()

      if(response.ok) {
        commentList.value = data.data 
      } else {
        throw new Error(data.message)
      }
    } catch (error) {
      throw error
    }
  }

  /**
   * Crée un nouveau commentaire pour un incident.
   *
   * @param {number} ticketId Identifiant de l'incident
   * @param {string} content Contenu du commentaire
   * @param {File|null} attachment Pièce jointe du commentaire
   * @param {string} type Type de commentaire
   * @param {string} token Token utilisé pour authentifier la requête
   * @returns {Promise<void>} Ajoute le commentaire dans le store
   * @throws {Error} Lance une erreur si la requête échoue
   */
  async function createComment(ticketId, content, attachment, type, token) {
    const formData = new FormData()

    formData.append('content', content)
    formData.append('type', type)

    if(attachment) {
      formData.append('attachment', attachment)
    }

    try {
      const response = await fetch(`${commentBaseUrl}/${ticketId}/comments/create`, {
        method: 'POST',
        headers: {
          "Authorization": "Bearer " + token
        },
        body: formData
      })
      const data = await response.json()
      console.log('attachment envoyé:', attachment)

      if(response.ok){
        return data
      } else {
        throw new Error(data.message)
      }
    } catch (error) {
      throw error
    }
  }

  return {
    commentList,
    getTicketComments,
    createComment
  }
}, {
  persist: true
})