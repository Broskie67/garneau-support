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