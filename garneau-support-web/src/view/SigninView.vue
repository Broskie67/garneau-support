<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

const email = ref('')
const password = ref('')
const emailError = ref('')
const passwordError = ref('')
const errorMessage = ref('')

const authStore = useAuthStore()
const router = useRouter()

const validateForm = () => {
  let isValid = true
  emailError.value = ''
  passwordError.value = ''
  errorMessage.value = ''

  if(!email.value) {
    emailError.value = "L'email est requis"
    isValid = false
  } else if (!isValidEmail(email.value)) {
    emailError.value = "Veuillez entrer une adresse courriel valide"
    isValid = false
  }

   if (!password.value) {
    passwordError.value = 'Le mot de passe est requis.'
    isValid = false
  }

  return isValid
}

const signin = async () => {
  if(!validateForm()) return

  try {
    await authStore.signin(email.value, password.value)
    router.push({name: 'home'})
  } catch (error) {
    errorMessage.value = error.message
  }
}

function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

</script>

<template>
  <div class="signin-page">
    <div class="signin-card">
      <h2>Connectez-vous</h2>
      <form @submit.prevent="signin" novalidate>
        <div class="field">
          <label for="email">Courriel</label>
          <input type="email" id="email" v-model="email" required />
          <span v-if="emailError" class="error">{{ emailError }}</span>
        </div>
        <div class="field">
          <label for="password">Mot de passe</label>
          <input type="password" id="password" v-model="password" required />
          <span v-if="passwordError" class="error">{{ passwordError }}</span>
        </div>
        <span v-if="errorMessage" class="error center">{{ errorMessage }}</span>

        <button type="submit" class="btn btn-primary">Se connecter</button>
      </form>
    </div>
  </div>
</template>

<style scoped>
  /* centre tout dans la page */
  .signin-page {
    display: flex;
    justify-content: center;
    padding-top: 40px;
    padding-bottom: 80px;
  }

  .signin-card {
    background: #ffffff;
    width: 420px;
    padding: 32px 38px;
    border-radius: 18px;
    border: 1px solid rgba(148, 163, 184, 0.25);
    box-shadow: 0 20px 40px rgba(15, 23, 42, 0.12);
  }

  .signin-card h2 {
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
  }

  .btn:hover{
    background-color: var(--button-primary-hover-bg);
    color: var(--button-primary-hover-text);
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
    .signin-page {
      padding: 20px 16px 40px;
    }

    .signin-card {
      width: 100%;
      padding: 24px 20px;
      border-radius: 14px;
    }

    .signin-card h2 {
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