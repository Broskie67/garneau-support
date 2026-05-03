<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import UserCreationForm from '@/components/UserCreationForm.vue'

const router = useRouter()
const authStore = useAuthStore()

const errorMessage = ref('')

const signup = async (userData) => {
  try {
    await authStore.signup(
      userData.firstName,
      userData.lastName,
      userData.email,
      userData.phoneNumber,
      userData.password,
      userData.confirmPassword
    )
    router.push({name: 'home'})
  } catch (error) {
    errorMessage.value = error.message
  }
} 

</script>

<template>
  <div class="signup-page">
    <div class="signup-card">
      <h2>Inscrivez-vous</h2>
      <UserCreationForm
        submit-label="S'inscrire"
        :error-message="errorMessage"
        @submit-user="signup" />
    </div>
  </div>
</template>

<style scoped>
  /* centre tout dans la page */
  .signup-page {
    display: flex;
    justify-content: center;
    padding-top: 40px;
    padding-bottom: 80px;
  }

  .signup-card {
    background: #ffffff;
    width: 420px;
    padding: 32px 38px;
    border-radius: 18px;
    border: 1px solid rgba(148, 163, 184, 0.25);
    box-shadow: 0 20px 40px rgba(15, 23, 42, 0.12);
  }

  .signup-card h2 {
    margin-bottom: 20px;
    font-size: 1.8rem;
    font-weight: 700;
    color: #0f172a;
  }

 



  

  

  

  

  

  

  

  @media (max-width: 768px) {
    .signup-page {
      padding-top: 25px;
      padding-bottom: 50px;
    }

    .signup-card {
      padding: 28px 30px;
    }
  }

  @media (max-width: 576px) {
    .signup-page {
      padding: 20px 16px 40px;
    }

    .signup-card {
      width: 100%;
      padding: 24px 20px;
      border-radius: 14px;
    }

    .signup-card h2 {
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