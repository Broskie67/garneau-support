<script setup>
  import { ref, onMounted } from 'vue'
  import { useProfileStore } from '@/stores/profileStore';
  import { useAuthStore } from '@/stores/authStore';

  const profileStore = useProfileStore()
  const authStore = useAuthStore()

  const firstName = ref('')
  const lastName = ref('')
  const phoneNumber = ref('')

  const errorMessage = ref('')

  const isEditing = ref(false)

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

  const toggleEditMode = () => {
     if (!isEditing.value && profileStore.userProfile) {
      firstName.value = profileStore.userProfile.first_name
      lastName.value = profileStore.userProfile.last_name
      phoneNumber.value = profileStore.userProfile.phone_number
    }

    isEditing.value = !isEditing.value

  }

  onMounted(() =>{
    getProfile()
  })

</script>

<template>
  <div class="profile-page">
    <div class="profile-card">
      <h2>Votre Profil</h2>
      <p v-if="errorMessage">{{ errorMessage }}</p>
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
            <button class="btn" @click="toggleEditMode">Modifier le profile</button>
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
              <input
                id="firstName"
                class="profile-input"
                type="text"
                v-model="firstName"
              />
            </div>
            <div class="profile-field">
              <label for="lastName" class="profile-label">Nom de famille :</label>
              <input
                id="lastName"
                class="profile-input"
                type="text"
                v-model="lastName"
              />
            </div>
            <div class="profile-field">
              <label for="phoneNumber" class="profile-label">Téléphone :</label>
              <input
                id="phoneNumber"
                class="profile-input"
                type="text"
                v-model="phoneNumber"
              />
            </div>
            <p class="note">Il est impossible de modifier votre courriel après la création du profil </p>
            <div class="update-button">
              <button class="btn" type="button" @click="toggleEditMode">Confirmer</button>
              <button class="btn" type="button" @click="toggleEditMode">Annuler</button>
            </div>
          </div>    
        </form> 
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
    margin-bottom: 10px;
  }

  .user-profile{
    margin-bottom: 20px;
  }
  .profile-field{
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 10px;
  }

  .profile-label{
    width: 140px;
    margin: 0;
    font-weight: 600;
  }

  .profile-value {
    margin: 0;
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
    gap: 10px
  }
</style>