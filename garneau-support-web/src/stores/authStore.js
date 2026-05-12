import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('authStore', () => {
  const apiUrl = import.meta.env.VITE_API_URL
  const user = ref(JSON.parse(localStorage.getItem('user')) || null)
  const token = ref(localStorage.getItem('token') || null)

  const isConnected = computed(() => !!token.value ) 

  /**
   * Enregistre l'utilisateur connecté.
   *
   * @param {Object} newUser Informations de l'utilisateur connecté
   * @returns {void}
   */  
  function setUser(newUser) {
    user.value = newUser;
    localStorage.setItem('user', JSON.stringify(newUser))
  }

  /**
   * Enregistre le token d'authentification.
   *
   * @param {string} newToken Token de l'utilisateur connecté
   * @returns {void}
   */
  function setToken(newToken) {
    token.value = newToken
    localStorage.setItem('token', newToken)
  }

  /**
   * Déconnecte l'utilisateur
   *
   * @returns {void}
   */
  function logout() {
    user.value = null;
    token.value = null
    localStorage.removeItem('user')
    localStorage.removeItem('token')
  }

  /**
   * Connecte un utilisateur à l'application.
   *
   * @param {string} email Courriel de l'utilisateur
   * @param {string} password Mot de passe de l'utilisateur
   * @returns {Promise<void>} Enregistre l'utilisateur et son token dans le store
   * @throws {Error} Lance une erreur si la connexion échoue
   */
  async function signin(email, password) {
    try{
      const response = await fetch(`${apiUrl}/auth/signin`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          password
        })
      })

      if(response.ok) {
        const data = await response.json()
        setToken(data.data.token)
        setUser(data.data.user)
        return true
        
      } else {
        const errorData = await response.json()
        throw new Error(errorData.message)
      }

    } catch(error) {
      throw error
    } 
  }

  /**
   * Crée un nouveau compte client.
   *
   * @param {string} firstName Prénom du client
   * @param {string} lastName Nom du client
   * @param {string} email Courriel du client
   * @param {string} phoneNumber Numéro de téléphone du client
   * @param {string} password Mot de passe du client
   * @param {string} confirmPassword Confirmation du mot de passe
   * @returns {Promise<void>} Enregistre l'utilisateur et son token dans le store
   * @throws {Error} Lance une erreur si l'inscription échoue
   */
  async function signup(firstName, lastName, email, phoneNumber, password, confirmPassword) {
    try {
      const response = await fetch(`${apiUrl}/auth/signup`, {
        method: 'POST',
        headers: {
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
        setToken(data.data.token)
        setUser(data.data.user)
      } else {
        const errorData = await response.json()
        throw new Error(errorData.message)
      }

    } catch (error) {
      throw error
    }
  }

  /**
   * Vérifie si un courriel est déjà utilisé.
   *
   * @param {string} email Courriel à vérifier
   * @returns {Promise<void>} Met à jour l'état de disponibilité du courriel
   * @throws {Error} Lance une erreur si la vérification échoue
   */
  async function checkEmail(email) {
    try {
      const response = await fetch(`${apiUrl}/auth/check-email`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email
        })
      })
      if(response.ok) {
        const data = await response.json()
        return data.data.exists
      } else {
        const errorData = await response.json()
        throw new Error(errorData.message)
      }
    } catch (error) {
      throw error
    }  
  }

  return {
    user,
    token,
    isConnected,
    setToken,
    setUser,
    logout,
    signin,
    signup,
    checkEmail
  };
},{
  persist: true
})