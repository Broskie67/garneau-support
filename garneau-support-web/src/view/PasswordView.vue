<script setup>
import { ref } from 'vue'
import { useProfileStore } from '@/stores/profileStore'
import { useAuthStore } from '@/stores/authStore'

const profileStore = useProfileStore()
const authStore = useAuthStore()


const currentPassword = ref('')
const newPassword = ref('')
const confirmPassword = ref('')

const currentPasswordError = ref('')
const newPasswordError = ref('')
const confirmPasswordError = ref('')
const errorMessage = ref('')
const successMessage = ref('')

const validateForm = () => {
  let isValid = true
  currentPasswordError.value = '' 
  newPasswordError.value = ''
  confirmPasswordError.value = ''
  errorMessage.value = ''
  successMessage.value = ''
  
  if(!currentPassword.value || currentPassword.value.trim().length === 0) {
    currentPasswordError.value = "Le mot de passe courant est requis"
    isValid = false
  } 

  if(!newPassword.value || newPassword.value.trim().length === 0) {
    newPasswordError.value = "Le nouveau mot de passe est requis"
    isValid = false
  } else if (!isValidPassword(newPassword.value)) {
    newPasswordError.value = 'Le mot de passe n\'est pas valide'
    isValid = false
  }

  if(!confirmPassword.value || confirmPassword.value.trim().length === 0) {
    confirmPasswordError.value = 'La confirmation du mot de passe est requise'
    isValid = false
  } else if (newPassword.value !== confirmPassword.value) {
    confirmPasswordError.value = 'Les mots de passe ne correspondent pas'
    isValid = false
  }

  return isValid
}

const updatePassword = async () => {
  if(!validateForm()) return

  try {
    await profileStore.updatePassword(
      currentPassword.value,
      newPassword.value,
      confirmPassword.value,
      authStore.token
    )
    successMessage.value = 'Votre mot de passe a été modifié avec succès'
  } catch (error) {
    errorMessage.value = error.message
  }
  
}

function isValidPassword(password) {
  const re = /^(?=.*[A-Z])(?=.*\d)(?=.*[#?!@$%^&*-]).{6,}$/;
  return re.test(password)
}
</script>

<template>
  <div class="password-page">
    <div class="password-card">
      <h2>Modifier votre mot de passe</h2>
      <div v-if="successMessage" class="profile-success">
        <span class="success">{{ successMessage }}</span>
      </div>  
      <div v-if="errorMessage" class="profile-error">
         <span class="error">{{ errorMessage }}</span>
      </div>
      <form @submit.prevent="updatePassword" novalidate>
        <div class="field">
          <label for="currentPassword">Mot de passe actuel</label>
          <input type="password" id="currentPassword" v-model="currentPassword" required>
          <span v-if="currentPasswordError" class="error">{{ currentPasswordError }}</span>
        </div>
        <div class="field">
          <label for="newPassword">Nouveau mot de passe</label>
          <input type="password" id="newPassword" v-model="newPassword" required>
          <span v-if="newPasswordError" class="error">{{ newPasswordError }}</span>
        </div>
        <div class="field">
          <label for="confirmPassword">Confirmation du mot de passe</label>
          <input type="password" id="confirmPassword" v-model="confirmPassword" required>
          <span v-if="confirmPasswordError" class="error">{{ confirmPasswordError }}</span>
        </div>
        <button type="submit" class="btn btn-primary">Confirmer</button>
      </form>
      <router-link to="/profile" class="back">Retourner au profil</router-link>
    </div>
  </div>
</template>

<style scoped>
  .password-page{
    display: flex;
    justify-content: center;
    padding-top: 40px;
    padding-bottom: 80px;
  }

  .password-card{
    background: #ffffff;
    width: 420px;
    padding: 32px 38px;
    border-radius: 18px;
    border: 1px solid rgba(148, 163, 184, 0.25);
    box-shadow: 0 20px 40px rgba(15, 23, 42, 0.12);
  }

  .password-card h2{
    margin-bottom: 20px;
    font-size: 1.8rem;
    font-weight: 700;
    color: #0f172a;
  }

  .field {
    margin-bottom: 18px;
  }

  .field label {
    display: block;
    margin-bottom: 6px;
    font-size: 0.95rem;
    color: #1e293b;
  }

  .field input {
    width: 100%;
    padding: 12px 14px;
    font-size: 1rem;
    border: 1px solid #cbd5e1;
    border-radius: 10px;
    outline: none;
  }

  .field input:focus {
    border-color: var(--color-accent);
    box-shadow: 0 0 0 3px var(--color-accent);
  }

  .profile-success{
    background-color:var(--success-message-transparent);
    padding:10px;
    border-radius: 8px;
    border: 1px solid var(--color-success);
    margin-bottom: 20px;
  }

  .profile-error{
    background-color: var(--error-message-transparent);
    padding:10px;
    border-radius: 8px;
    border: 1px solid var(--color-danger);
    margin-bottom: 20px;
  }

  .error {
    color: var(--color-danger);
    font-size: 0.85rem;
    margin-top: 4px;
  }

  .error.center {
    display: block;
    text-align: center;
    margin: 8px 0 10px;
  }

  .btn {
    background-color: var(--button-primary-bg);
    color: var(--button-primary-text);
    border: 1px solid var(--button-primary-border);
    margin-bottom: 20px;
  }

  .btn:hover{
    background-color: var(--button-primary-hover-bg);
    color: var(--button-primary-hover-text);
  }

  .back{
    min-width: 145px;
    padding: 12px 22px;
    border-radius: 8px;
    font-size: 1rem;
    cursor: pointer;
    text-decoration: none;
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.12);
    background-color: var(--button-primary-bg);
    color: var(--button-primary-text);
    border: 1px solid var(--button-primary-border);
  }

  .back:hover{
    background-color: var(--button-primary-hover-bg);
    color: var(--button-primary-hover-text);
  }
</style>
