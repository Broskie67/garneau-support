import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAdminStore = defineStore('adminStore', () => {
  const apiUrl = import.meta.env.VITE_API_URL
  const usersList = ref([])

  /**
   * Récupère la liste des utilisateurs.
   *
   * @param {string} token Token utilisé pour authentifier la requête
   * @returns {Promise<void>} Met à jour la liste des utilisateurs dans le store
   * @throws {Error} Lance une erreur si la requête échoue
   */
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

  /**
   * Modifie le statut d'un utilisateur.
   *
   * @param {number} userId Identifiant de l'utilisateur à modifier
   * @param {string} token Token utilisé pour authentifier la requête
   * @returns {Promise<void>} Met à jour le statut de l'utilisateur dans le store
   * @throws {Error} Lance une erreur si la requête échoue
   */  
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
  
  /**
   * Crée un nouveau compte technicien.
   *
   * @param {string} firstName Prénom du technicien
   * @param {string} lastName Nom du technicien
   * @param {string} email Courriel du technicien
   * @param {string} phoneNumber Numéro de téléphone du technicien
   * @param {string} password Mot de passe du technicien
   * @param {string} confirmPassword Confirmation du mot de passe
   * @param {string} token Token utilisé pour authentifier la requête
   * @returns {Promise<void>} Ajoute le technicien dans le store
   * @throws {Error} Lance une erreur si la requête échoue
   */
  async function createTech(firstName, lastName, email, phoneNumber, password, confirmPassword, token) {
    try {
      const response = await fetch(`${apiUrl}/admin/technicians/create`, {
        method: 'POST',
        headers: {
          "Authorization": "Bearer " + token,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          phoneNumber,
          password,
          confirmPassword
        })
      })
      if(response.ok) {
        const data = await response.json()
        return data
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
    changeUserStatus,
    createTech
  }

})