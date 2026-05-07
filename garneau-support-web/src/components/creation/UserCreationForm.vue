<script setup>
import { ref, watch } from 'vue'
import { useAuthStore } from '@/stores/authStore'

defineProps({
  submitLabel: {
    type: String,
  },
  errorMessage: {
    type: String,
    default: ''
  },
  successMessage: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['submit-user'])

const authStore = useAuthStore()

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
const internalErrorMessage = ref('')

const validateFirstName = () => {
  firstNameError.value = ''

  if(!firstName.value || firstName.value.trim().length === 0) {
    firstNameError.value = "Le prénom est requis"
    return false
  } else if (firstName.value.length < 2 || firstName.value.length > 50) {
    firstNameError.value = 'Le prénom doit contenir entre 2 et 50 caractères '
    return false
  }

  return true
}

const validateLastName = () => {
  lastNameError.value = ''

  if(!lastName.value || lastName.value.trim().length === 0) {
    lastNameError.value = "le nom est requis"
    return false
  } else if (lastName.value.length < 2 || lastName.value.length > 50) {
    lastNameError.value = "Le nom doit contenir entre 2 et 50 caractères"
    return false
  }

  return true
}

const validateEmail = async () => {
  emailError.value = ''

  if(!email.value || email.value.trim().length === 0) {
    emailError.value = "Le courriel est requis"
    return false
  } else if (email.value.length > 50) {
    emailError.value = "Le courriel ne doit pas dépasser 50 caractères"
    return false
  } else if (!isValidEmail(email.value)) {
    emailError.value = "Le courriel n'est pas valide"
    return false
  }

  const isExisting = await existingEmail()

  if(isExisting) {
    return false
  }

  return true
}

const validatePhoneNumber = () => {
  phoneNumberError.value = ''

  if(!phoneNumber.value || phoneNumber.value.trim().length === 0) {
    phoneNumberError.value = "Le numéro de téléphone est requis"
    return false
  } else if (!isValidPhoneNumber(phoneNumber.value)) {
    phoneNumberError.value = "Le numéro de téléphone n'est pas valide"
    return false
  }

  return true
}

const validatePassword = () => {
  passwordError.value = ''

  if(!password.value || password.value.trim().length === 0) {
    passwordError.value = "Le mot de passe est requis"
    return false
  } else if (!isValidPassword(password.value)){
    passwordError.value = "Le mot de passe n'est pas valide"
    return false
  }

  return true
}

const validateConfirmPassword = () => {
  confirmPasswordError.value = ''

  if(!confirmPassword.value || confirmPassword.value.trim().length === 0) {
    confirmPasswordError.value = "La confirmation du mot de passe est requise"
    return false
  } else if (password.value !== confirmPassword.value) {
    confirmPasswordError.value = "Les mots de passe ne correspondent pas"
    return false
  }

  return true
}

const existingEmail = async () => {
   try {
    const exists = await authStore.checkEmail(email.value)

    if(exists){
      emailError.value = "Un utilisateur avec ce courriel existe déjà"
      return true
    } 

    return false

  } catch (error) {
    internalErrorMessage.value = error.message
    return true
  }
}

const validateForm = async () => {
  let isValid = true

  if(!validateFirstName()) isValid = false

  if(!validateLastName()) isValid = false

  if(!(await validateEmail())) isValid = false

  if(!validatePhoneNumber()) isValid = false

  if(!validatePassword()) isValid = false

  if(!validateConfirmPassword()) isValid = false

  return isValid
}

const handleSubmit = async () => {
  if (!(await validateForm())) return

  emit('submit-user', {
    firstName: firstName.value.trim(),
    lastName: lastName.value.trim(),
    email: email.value.trim(),
    phoneNumber: phoneNumber.value.trim(),
    password: password.value,
    confirmPassword: confirmPassword.value
  })
}

function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

function isValidPhoneNumber(phoneNumber) {
  const re = /^\d{10}$/
  return re.test(phoneNumber)
}

function isValidPassword(password) {
  const re = /^(?=.*[A-Z])(?=.*\d)(?=.*[#?!@$%^&*-]).{6,}$/
  return re.test(password)
}

watch(firstName, () => {
  if(validateFirstName()) {
    firstNameError.value = ''
  }
})

watch(lastName, () => {
  if(validateLastName()) {
    lastNameError.value = ''
  }
})

watch(email, () => {
  emailError.value = ''
})

watch(phoneNumber, () => {
  if(validatePhoneNumber()) {
    phoneNumberError.value = ''
  }
})

watch(password, () => {
  if(validatePassword()) {
    passwordError.value = ''
  }
})

watch(confirmPassword, () => {
  if(validateConfirmPassword()) {
    confirmPasswordError.value = ''
  }
})
</script>

<template>
    
  <div v-if="internalErrorMessage" class="profile-error">
    <span class="error">{{ internalErrorMessage }}</span>
  </div>
  <form @submit.prevent="handleSubmit" novalidate>
    <div class="field">
      <label for="firstName">Prénom</label>
      <input type="text" id="firstName" v-model="firstName" @blur="validateFirstName"/>
      <span v-if="firstNameError" class="error">{{ firstNameError }}</span>
    </div>
    <div class="field">
      <label for="lastName">Nom</label>
      <input type="text" id="lastName" v-model="lastName" @blur="validateLastName"/>
      <span v-if="lastNameError" class="error">{{ lastNameError }}</span>
    </div>
    <div class="field">
      <label for="email">Courriel</label>
      <input type="email" id="email" v-model="email" @blur="validateEmail"/>
      <span v-if="emailError" class="error">{{ emailError }}</span>
    </div>
    <div class="field">
      <label for="phoneNumber">Téléphone</label>
      <input type="tel" id="phoneNumber" v-model="phoneNumber" @blur="validatePhoneNumber"/>
      <span v-if="phoneNumberError" class="error">{{ phoneNumberError }}</span>
    </div>
    <div class="field">
      <label for="password">Mot de passe</label>
      <input type="password" id="password" v-model="password" @blur="validatePassword" />
      <span v-if="passwordError" class="error">{{ passwordError }}</span>
    </div>
    <div class="field">
      <label for="confirmPassword">Confirmation du mot de passe</label>
      <input type="password" id="confirmPassword" v-model="confirmPassword" @blur="validateConfirmPassword"/>
      <span v-if="confirmPasswordError" class="error">{{confirmPasswordError }}</span>
    </div>
    <p class="note">une fois le compte créer, il vous sera impossible de modifier votre courriel</p>
    <button type="submit" class="btn btn-primary">{{ submitLabel }}</button>
  </form>
</template>

<style scoped>
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
  }

  .btn:hover{
    background-color: var(--button-primary-hover-bg);
    color: var(--button-primary-hover-text);
  }
</style>