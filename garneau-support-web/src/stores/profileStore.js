import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useProfileStore = defineStore('profileStore', () => {
  const apiUrl = import.meta.env.VITE_API_URL
  const userProfile = ref(null)
  
  /**
   * Récupère le profil de l'utilisateur connecté.
   *
   * @param {string} token Token utilisé pour authentifier la requête
   * @returns {Promise<void>} Met à jour les informations du profil dans le store
   * @throws {Error} Lance une erreur si la requête échoue
   */
  async function getProfile(token) {
    try{
      const response = await fetch(`${apiUrl}/profile`, {
        method: 'GET',
        headers: {
          "Authorization": "Bearer " + token
        }
      })
      if(response.ok){
        const data = await response.json()
        userProfile.value = data.data
      } else {
        const errorData = await response.json()
        throw new Error(errorData.message)
      }
    } catch (error) {
      throw error
    }
  }

  /**
   * Modifie le profil de l'utilisateur connecté.
   *
   * @param {string} newFirstName Nouveau prénom de l'utilisateur
   * @param {string} newLastName Nouveau nom de l'utilisateur
   * @param {string} newPhoneNumber Nouveau numéro de téléphone de l'utilisateur
   * @param {string} token Token utilisé pour authentifier la requête
   * @returns {Promise<void>} Met à jour les informations du profil dans le store
   * @throws {Error} Lance une erreur si la requête échoue
   */
  async function updateProfile(newFirstName, newLastName, newPhoneNumber, token) {
    try{
      const response = await fetch(`${apiUrl}/profile`, {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token
        },
        body: JSON.stringify({
          firstName: newFirstName,
          lastName: newLastName,
          phoneNumber: newPhoneNumber
        })
      })
      if(response.ok) {
        const data = await response.json()
        userProfile.value = data.data
      } else {
        const errorData = await response.json()
        throw new Error(errorData.message)
      }
    } catch (error) {
      throw error
    }
  }

  /**
   * Modifie le mot de passe de l'utilisateur connecté.
   *
   * @param {string} currentPassword Mot de passe actuel de l'utilisateur
   * @param {string} newPassword Nouveau mot de passe
   * @param {string} confirmPassword Confirmation du nouveau mot de passe
   * @param {string} token Token utilisé pour authentifier la requête
   * @returns {Promise<void>} Met à jour le mot de passe de l'utilisateur
   * @throws {Error} Lance une erreur si la requête échoue
   */
  async function updatePassword(currentPassword, newPassword, confirmPassword, token) {
    try {
      const response = await fetch(`${apiUrl}/profile/password`, {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token
        },
        body: JSON.stringify({
          currentPassword: currentPassword,
          newPassword: newPassword,
          confirmPassword: confirmPassword
        })
      })
      if(response.ok) {
        const data = await response.json()
        userProfile.value = data.data
      } else {
        const errorData = await response.json()
        throw new Error(errorData.message)
      } 
    } catch (error) {
      throw error
    }
  }
  
  return {
    userProfile,
    getProfile,
    updateProfile,
    updatePassword
  };
},{
  persist: true
})