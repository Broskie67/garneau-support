<script setup>
import { ref, watch } from 'vue'
import { useAuthStore } from '@/stores/authStore';
import { useTicketStore } from '@/stores/ticketStore';

const authStore = useAuthStore()
const ticketStore = useTicketStore()

const title = ref('')
const description = ref('')
const category = ref('')
const priority = ref('')

const titleError = ref('')
const descriptionError = ref('')
const priorityError = ref('')
const errorMessage = ref('')
const successMessage = ref('')

const validateTitle = () => {
  titleError.value = ''
  if(!title.value || title.value.trim().length === 0) {
    titleError.value = 'Le titre est requis'
    return false
  } else if (title.value.length < 3 || title.value.length > 100) {
    titleError.value = 'Le titre doit contenir entre 3 et 100 caractères'
    return false
  }

  return true
}

const validateDescription = () => {
  descriptionError.value = ''

  if(!description.value || description.value.trim().length === 0) {
    descriptionError.value = 'La description est requise'
    return false
  } else if (description.value.length < 10) {
    descriptionError.value = 'La description doit contenir plus de 10 caractères'
    return false
  }

  return true
}

const validatePriority= () => {
  priorityError.value = ''

  if(!priority.value) {
    priorityError.value = 'La priorité est requise'
   return false
  }

  return true
}

const validateForm = () => {
  let isValid = true
  successMessage.value = ''


  if(!validateTitle()) isValid = false
  
  if(!validateDescription()) isValid = false
  
  if(validatePriority()) isValid = false

  return isValid
}

const createTicket = async () => {
  if(!validateForm()) return

  try {
    await ticketStore.createTicket(
      title.value,
      description.value,
      category.value,
      priority.value,
      authStore.token
    )
    successMessage.value = 'un nouvel incident a été ajouté avec succès'
  } catch (error) {
    errorMessage.value = error.message
  }
}

watch(title, (newTitle) => {
  const trimmedTitle = newTitle.trim()

  if (trimmedTitle.length >= 3 && trimmedTitle.length <= 100) {
    titleError.value = ''
  }
})

watch(description, (newDescription) => {
  const trimmedDescription = newDescription.trim()

  if (trimmedDescription.length >= 10) {
    descriptionError.value = ''
  } 
})

watch(priority, (newPriority) => {
  if (newPriority) {
    priorityError.value = ''
  }
})
</script>

<template>
  <div class="create-ticket-card">
    <h2>Créer un incident</h2>
    <div v-if="successMessage" class="creation-success">
      <span class="success">{{ successMessage }}</span>
    </div>  
    <div v-if="errorMessage" class="creation-error">
      <span class="error">{{ errorMessage }}</span>
    </div>
    <form @submit.prevent="createTicket" novalidate>
      <div class="field">
        <label for="title">Titre</label>
        <input type="text" id="title" v-model="title" @blur="validateTitle">
        <span v-if="titleError" class="error">{{ titleError }}</span>
      </div>
      <div class="field">
        <label for="description">Description</label>
        <textarea id="description" v-model="description" required @blur="validateDescription"></textarea>
        <span v-if="descriptionError" class="error">{{ descriptionError }}</span>
      </div>
      <div class="field">
        <label for="category">Catégorie</label>
        <select id="category" name="category" v-model="category">
          <option value="">Aucune catégorie</option>
          <option value="Matériel">Matériel</option>
          <option value="Logiciel">Logiciel</option>
          <option value="Réseau">Réseau</option>
          <option value="Accès et comptes">Accès et comptes</option>
          <option value="Courriel">Courriel</option>
          <option value="Impression">Impression</option>
          <option value="Sécurité">Sécurité</option>
          <option value="Téléphonie">Téléphonie</option>
          <option value="Autre">Autre</option>
        </select>
        <span v-if="categoryError" class="error">{{ categoryError }}</span>
      </div>
      <div class="field">
        <label for="priority">Priorité</label>
        <select id="priority" name="priority" v-model="priority">
          <option value="" disabled>Choisir une priorité</option>
          <option value="Basse">Basse</option>
          <option value="Moyenne">Moyenne</option>
          <option value="Haute">Haute</option>
          <option value="Critique">Critique</option>
        </select>
        <span v-if="priorityError" class="error">{{ priorityError }}</span>
      </div>
      <button type="submit" class="btn btn-primary">Créer</button>
    </form>
    <router-link to="/dashboard" class="btn">Retour à la liste</router-link>
  </div>
</template>

<style scoped>
  .create-ticket-card {
    background: #ffffff;
    width: 420px;
    padding: 32px 38px;
    border-radius: 18px;
    border: 1px solid rgba(148, 163, 184, 0.25);
    box-shadow: 0 20px 40px rgba(15, 23, 42, 0.12);
  }

  .create-ticket-card h2 {
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

  .field input,
  .field select,
  .field textarea {
    width: 100%;
    padding: 10px 12px;
    border: 1px solid #d1d5db;
    border-radius: 10px;
    font-size: 1rem;
    font-family: inherit;
    outline: none;
  }

  .field input:focus,
  .field select:focus,
  .field textarea:focus {
    border-color: var(--color-accent);
    box-shadow: 0 0 0 3px var(--color-accent);
  }

  .field textarea {
    min-height: 120px;
  }

  .creation-success{
    background-color:var(--success-message-transparent);
    padding:10px;
    border-radius: 8px;
    border: 1px solid var(--color-success);
    margin-bottom: 20px;
  }

  .creation-error{
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
    margin-bottom: 10px ;
  }

  .btn:hover{
    background-color: var(--button-primary-hover-bg);
    color: var(--button-primary-hover-text);
  }

</style>