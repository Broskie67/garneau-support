import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCommentStore = defineStore('commentStore',  () => {
  const apiUrl = import.meta.env.VITE_API_URL
  const commentBaseUrl = `${apiUrl}/tickets`
  const commentList = ref([])

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

  return {
    commentList,
    getTicketComments
  }
})

