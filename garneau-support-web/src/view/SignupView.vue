<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'


const authStore = useAuthStore()
const router = useRouter()

const firstName = ref('')
const lastName = ref('')
const email = ref('')
const phoneNumber = ref('')
const password = ref('')
const confirmPassword = ref('')

const firstNameError = ref('')
const lastNameError = ref('')
const emailError = ref('')
const phoneNumberError = ref('')
const passwordError = ref('')
const confirmPasswordError = ref('')
const errorMessage = ref('')

const validateForm = () => {
  let isValid = true
  firstNameError.value = ''
  lastNameError.value = ''
  emailError.value = ''
  phoneNumberError.value = ''
  passwordError.value = ''
  confirmPasswordError.value = ''

  if(!firstName.value || firstName.value.trim().length === 0) {
    firstNameError.value = "Le prénom est requis"
    isValid = false
  } else if (firstName.value.length < 2 || firstName.value.length > 50) {
    firstNameError.value = 'Le prénom doit contenir entre 2 et 50 caractères '
    isValid = false
  }

  if(!lastName.value || lastName.value.trim().length === 0) {
    lastNameError.value = "le nom est requis"
    isValid = false
  } else if (lastName.value.lenght < 2 || lastName.value.lenght > 50) {
    lastNameError.value = "Le nom doit contenir entre 2 et 50 caractères"
    isValid = false
  }

  if(!email.value || email.value.trim().length === 0) {
    emailError.value = "Le courriel est requis"
    isValid = false
  } else if (email.value.lenght > 50) {
    emailError.value = "Le courriel ne doit pas dépasser 50 caractères"
    isValid = false
  } else if (!isValidEmail(email.value)) {
    emailError.value = "Le courriel n'est pas valide"
    isValid = false
  }

  if(!phoneNumber.value || phoneNumber.value.trim().length === 0) {
    phoneNumberError.value = "Le numéro de téléphone est requis"
    isValid = false
  } else if (!isValidPhoneNumber(phoneNumber.value)) {
    phoneNumberError.value = "Le numéro de téléphone n'est pas valide"
    isValid = false
  }

  if(!password.value || password.value.trim().length === 0) {
    passwordError.value = "Le mot de passe est requis"
    isValid = false
  }

  if(!confirmPassword.value || confirmPassword.value.trim().length === 0) {
    confirmPasswordError.value = "La confirmation du mot de passe est requise"
    isValid = false
  } else if (password.value !== confirmPassword.value) {
    confirmPasswordError.value = "Les mots de passe ne correspondent pas"
    isValid = false
  }

  return isValid
}

const signup = async () => {
  if(!validateForm()) return

  try {
    await authStore.signup(
      firstName.value, 
      lastName.value, 
      email.value, 
      phoneNumber.value, 
      password.value, 
      confirmPassword.value
    )
    router.push({name: 'home'})
  } catch (error) {
    errorMessage.value = error.message
  }
} 

function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

function isValidPhoneNumber(phoneNumber) {
  const re = /^\d{10}$/
  return re.test(phoneNumber)
}
</script>

<template>
  <div class="signup-page">
    <div class="signup-card">
      <h2>Inscrivez-vous</h2>
      <form @submit.prevent="signup" novalidate>
        <div class="field">
          <label for="firstName">Prénom</label>
          <input type="firstName" id="firstName" v-model="firstName" required />
          <span v-if="firstNameError" class="error">{{ firstNameError }}</span>
        </div>
        <div class="field">
          <label for="firstName">Nom</label>
          <input type="lastName" id="lastName" v-model="lastName" required />
          <span v-if="lastNameError" class="error">{{ lastNameError }}</span>
        </div>
        <div class="field">
          <label for="email">Courriel</label>
          <input type="email" id="email" v-model="email" required />
          <span v-if="emailError" class="error">{{ emailError }}</span>
        </div>
        <div class="field">
          <label for="phoneNumber">Téléphone</label>
          <input type="phoneNumber" id="phoneNumber" v-model="phoneNumber" required />
          <span v-if="phoneNumberError" class="error">{{ phoneNumberError }}</span>
        </div>
        <div class="field">
          <label for="password">Mot de passe</label>
          <input type="password" id="password" v-model="password" required />
          <span v-if="passwordError" class="error">{{ passwordError }}</span>
        </div>
        <div class="field">
          <label for="confirmPassword">Confirmation du mot de passe</label>
          <input type="confirmPassword" id="confirmPassword" v-model="confirmPassword" required />
          <span v-if="confirmPasswordError" class="error">{{confirmPasswordError }}</span>
        </div>
        <p class="note">une fois le compte créer, il vous sera impossible de modifier votre courriel</p>
        <span v-if="errorMessage" class="error center">{{ errorMessage }}</span>

        <button type="submit" class="btn btn-primary">S'inscrire</button>
      </form>
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

</style>