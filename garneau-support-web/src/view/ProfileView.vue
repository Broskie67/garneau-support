<script setup>
  import { ref, onMounted } from 'vue'
  import { useProfileStore } from '@/stores/profileStore';
  import { useAuthStore } from '@/stores/authStore';

  const profileStore = useProfileStore()
  const authStore = useAuthStore()

  const firstName = ref('')
  const lastName = ref('')
  const phoneNumber = ref('')
  const successMessage = ref('')

  const firstNameError = ref('')
  const lastNameError = ref('')
  const phoneNumberError = ref('')
  const errorMessage = ref('')

  const isEditing = ref(false)

  const validateForm = () => {
    let isValid = true
    firstNameError.value = ''
    lastNameError.value = ''
    phoneNumberError.value = ''

    if(!firstName.value || firstName.value.trim().length === 0) {
      firstNameError.value = "Le prénom est requis"
      isValid = false
    } else if (firstName.value.length < 2 || firstName.value.length > 50) {
      firstNameError.value = 'Le prénom doit contenir entre 2 et 50 caractères '
      isValid = false
    }

    if(!lastName.value || lastName.value.trim().length === 0) {
      lastNameError.value = "le nom de famille est requis"
      isValid = false
    } else if (lastName.value.lenght < 2 || lastName.value.lenght > 50) {
      lastNameError.value = "Le nom doit contenir entre 2 et 50 caractères"
      isValid = false
    }

    if(!phoneNumber.value || phoneNumber.value.trim().length === 0) {
      phoneNumberError.value = "Le numéro de téléphone est requis"
      isValid = false
    } else if (!isValidPhoneNumber(phoneNumber.value)) {
      phoneNumberError.value = "Le numéro de téléphone n'est pas valide"
      isValid = false
    }

    return isValid
  }

  const getProfile = async () => {
    if(authStore.token === null){
      return
    }
    try {
      await profileStore.getProfile(authStore.token)
    } catch (error) {
      errorMessage.value = error.message
    }
  }

  const updateProfile = async () => {
    if(!validateForm()) return

    try {
      await profileStore.updateProfile(
        firstName.value, 
        lastName.value, 
        phoneNumber.value, 
        authStore.token
      )
      successMessage.value = 'Votre profile a bien été enregistré'
      isEditing.value = !isEditing.value
    } catch (error) {
      errorMessage.value = error.message
    }
  }

  const toggleEditMode = () => {
     if (!isEditing.value && profileStore.userProfile) {
      firstName.value = profileStore.userProfile.first_name
      lastName.value = profileStore.userProfile.last_name
      phoneNumber.value = profileStore.userProfile.phone_number
    }

    isEditing.value = !isEditing.value
    successMessage.value = ''
    firstNameError.value = ''
    lastNameError.value = ''
    phoneNumberError.value = ''

  }

  function isValidPhoneNumber(phoneNumber) {
    const re = /^\d{10}$/
    return re.test(phoneNumber)
  }

  onMounted(() =>{
    getProfile()
  })

</script>

<template>
  <div class="profile-page">
    <div class="profile-card">
      <h2>Votre Profil</h2>
      <div v-if="successMessage" class="profile-success">
        <span class="success">{{ successMessage }}</span>
      </div>  
      <div v-if="errorMessage" class="profile-error">
         <span class="error">{{ errorMessage }}</span>
      </div>
      <div v-if="!isEditing">
        <div class="user-profile" v-if="profileStore.userProfile">
          <div class="profile-field">
            <p class="profile-label">Prénom:</p>
            <p class="profile-value">{{ profileStore.userProfile?.first_name }}</p>
          </div>
          <div class="profile-field">
            <p class="profile-label">Nom de famille:</p>
            <p class="profile-value">{{ profileStore.userProfile?.last_name }}</p>
          </div>
          <div class="profile-field">
            <p class="profile-label">Courriel:</p>
            <p class="profile-value">{{ profileStore.userProfile?.email }}</p>
          </div>
          <div class="profile-field">
            <p class="profile-label">Téléphone:</p>
            <p class="profile-value">{{ profileStore.userProfile?.phone_number }}</p>
          </div>
          <div class="profile-field">
            <p class="profile-label">Rôle:</p>
            <p class="profile-value">{{ profileStore.userProfile?.role }}</p>
          </div>

          <div>
            <button class="btn" @click="toggleEditMode">Modifier le profil</button>
          </div>
        </div>
        <div v-else>
          <p>Chargement du profil...</p>
        </div>
      </div>
      <div v-else>
        <h4>Modifier vos informations</h4>
        <form @submit.prevent="updateProfile" novalidate>
          <div class="user-profile" v-if="profileStore.userProfile">
            <div class="profile-field">
              <label for="firstName" class="profile-label">Prénom :</label>
              <div class="profile-input-group">
                <input id="firstName" class="profile-input" type="text" v-model="firstName"/>
                <span v-if="firstNameError" class="error">{{ firstNameError }}</span>
              </div>
              
            </div>
            <div class="profile-field">
              <label for="lastName" class="profile-label">Nom de famille :</label>
              <div class="profile-input-group">
                <input id="lastName" class="profile-input" type="text" v-model="lastName"/>
                <span v-if="lastNameError" class="error">{{ lastNameError }}</span>
              </div>
            </div>
            <div class="profile-field">
              <label for="phoneNumber" class="profile-label">Téléphone :</label>
              <div class="profile-input-group">
                <input id="phoneNumber" class="profile-input" type="text" v-model="phoneNumber"/>
                <span v-if="phoneNumberError" class="error">{{ phoneNumberError }}</span>
              </div>
            </div>
            <div class="update-button">
              <button type="submit" class="btn">Confirmer</button>
              <button class="btn" type="button" @click="toggleEditMode">Annuler</button>
            </div>
          </div>    
        </form> 
        <div>
          <router-link to="/profile/password" class="update-password">Modifier le mot de passe</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .profile-page{
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 40px;
    padding-bottom: 80px;
  }

  .profile-card{
    background: #ffffff;
    width: 420px;
    padding: 32px 38px;
    border-radius: 18px;
    border: 1px solid rgba(148, 163, 184, 0.25);
    box-shadow: 0 20px 40px rgba(15, 23, 42, 0.12);
  }

  .user-profile{
    margin-bottom: 20px;
  }

  .profile-field{
    display: grid;
    grid-template-columns: 130px 0.5fr;
    align-items: center;
    column-gap: 40px;
    margin-bottom: 22px;  
  }

  .profile-label{
    width: 180px;
    font-weight: 600;
    margin: 0;
  }

  .profile-input-group {
    width: 200px;
    display: flex;
    flex-direction: column;
}

  .profile-input{
    width: 180px;
    padding: 12px 14px;
    font-size: 1rem;
    border: 1px solid #cbd5e1;
    border-radius: 10px;
    outline: none;
  }

  .profile-value {
    margin: 0;
  }

  .field input:focus {
    border-color: var(--color-accent);
    box-shadow: 0 0 0 3px var(--color-accent);
  }

  .btn {
    background-color: var(--button-primary-bg);
    color: var(--button-primary-text);
    border: 1px solid var(--button-primary-border);
  }

  .btn:hover{
    background-color: var(--button-primary-hover-bg);
    color: var(--button-primary-hover-text);
  }
  .update-button{
    display: flex;
    gap: 10px;
    margin-top: 20px
  }

  .update-password{
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

  .update-password:hover{
    background-color: var(--button-primary-hover-bg);
    color: var(--button-primary-hover-text);
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
    display: inline-block;
    text-align:left;
    color: var(--color-danger);
    font-size: 0.85rem;
    margin-top: 4px;
  }

  .error.center {
    display: block;
    text-align: center;
    margin: 8px 0 10px;
  }
</style>