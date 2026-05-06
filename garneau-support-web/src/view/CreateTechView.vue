<script setup>
import { ref } from 'vue'
import { useAdminStore } from '@/stores/adminStore'
import { useAuthStore } from '@/stores/authStore'
import UserCreationForm from '@/components/creation/UserCreationForm.vue'

const authStore = useAuthStore()
const adminStore = useAdminStore()

const errorMessage = ref('')
const successMessage = ref('')

const createTech = async (userData) => {
  try {
    await adminStore.createTech(
      userData.firstName,
      userData.lastName,
      userData.email,
      userData.phoneNumber,
      userData.password,
      userData.confirmPassword,
      authStore.token
    )
    successMessage.value = 'Un nouveau technicien a été créer avec succès'
  } catch (error) {
    errorMessage.value = error.message
  }
}
</script>

<template>
  <div class="create-tech-page">
    <div class="create-tech-card">
      <h2>Ajouter un technicien</h2> 
      <div v-if="successMessage" class="profile-success">
        <span class="success">{{ successMessage }}</span>
      </div>
      <UserCreationForm
        submit-label="Créer"
        :error-message="errorMessage"
        @submit-user="createTech"/>
    </div>
  </div>
</template>

<style scoped>
  .create-tech-page{
    display: flex;
    justify-content: center;
    padding-top: 40px;
    padding-bottom: 80px;
  }

  .create-tech-card{
    background: #ffffff;
    width: 420px;
    padding: 32px 38px;
    border-radius: 18px;
    border: 1px solid rgba(148, 163, 184, 0.25);
    box-shadow: 0 20px 40px rgba(15, 23, 42, 0.12);
  }

  .create-tech-card h2 {
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
    width: 50%;
    background-color: var(--button-primary-bg);
    color: var(--button-primary-text);
    border: 1px solid var(--button-primary-border);
  }

  .btn:hover{
    background-color: var(--button-primary-hover-bg);
    color: var(--button-primary-hover-text);
  }
  @media (max-width: 768px) {
    .create-tech-page {
      padding-top: 25px;
      padding-bottom: 50px;
    }

    .create-tech-card {
      padding: 28px 30px;
    }
  }

  @media (max-width: 576px) {
    .create-tech-page {
      padding: 20px 16px 40px;
    }

    .create-tech-card {
      width: 100%;
      padding: 24px 20px;
      border-radius: 14px;
    }

    .create-tech-card h2 {
      font-size: 1.5rem;
      text-align: center;
    }

    .field input {
      padding: 11px 12px;
      font-size: 0.95rem;
    }

    .btn {
      width: 100%;
      background-color: var(--button-primary-bg);
      color: var(--button-primary-text);
      border: 1px solid var(--button-primary-border);
    }
  }
</style>