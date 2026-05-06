<script setup>
import {ref, computed} from 'vue'
import { useAuthStore } from '@/stores/authStore'
import { useTicketStore } from '@/stores/ticketStore'
import { useRoute } from 'vue-router';

const authStore = useAuthStore()
const ticketStore = useTicketStore()
const route = useRoute()

const props = defineProps({
  ticket: {
    type: Object,
    required: true
  }
})

const status = ref(props.ticket.status)
const nextStatus = ref('')

const matrix = {
  'Ouvert': [
    { to: 'Assigné', roles: ['admin', 'technicien'] }
  ],
  'Assigné': [
    { to: 'En cours', roles: ['admin', 'technicien'] }
  ],
  
  'En cours': [
    { to: 'En attente', roles: ['admin', 'technicien'] },
    { to: 'Résolu', roles: ['admin', 'technicien'] }
  ],
  'En attente': [
    { to: 'En cours', roles: ['admin', 'technicien'] }
  ],
}

const allowedTransition = computed(() =>{
  const userRole = authStore.user?.role

  return matrix[status.value]
    ?.filter(transition => transition.roles.includes(userRole))
    .map(transition => transition.to) || []
})

function changeStatus(newStatus) {
  if(allowedTransition.value.includes(newStatus)) {
    status.value = newStatus
    form.value.status = newStatus
    nextStatus.value = ''
  } else {
    console.error('Invalid Transition')
  }
}

const errorMessage = ref('')
const successMessage = ref('')

const form = ref({
  category: props.ticket.category,
  priority: props.ticket.priority,
  status: props.ticket.status
})

const updateTicket = async () => {
  errorMessage.value = ''
  successMessage.value = ''

  if (!authStore.token) {
    return
  }

  try {
    await ticketStore.updateTicket(route.params.id, authStore.token, {
      category: form.value.category,
      priority: form.value.priority,
      status: form.value.status
    })
    successMessage.value = 'L\'indicent à été modifié avec succès'
  } catch (error) {
    errorMessage.value = error.message
  }
}

const getStatusClass = (status) => ({
  'status-open': status === 'Ouvert',
  'status-assigned': status === 'Assigné',
  'status-in-progress': status === 'En cours',
  'status-waiting': status === 'En attente',
  'status-resolved': status === 'Résolu',
  'status-closed': status === 'Fermé'
})

/**
 * Function to convert the time and date 
 * @param dateString the date to convert
 * @return formatted date (ex. 1 février 2026 à 09 h 15)
 */
function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('fr-CA', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}
</script>

<template>
  <form class="card-content" @submit.prevent="updateTicket">
    <div v-if="successMessage" class="edit-success">
      <span class="success">{{ successMessage }}</span>
    </div>  
    <div v-if="errorMessage" class="edit-error">
      <span class="error">{{ errorMessage }}</span>
    </div>
    <div class="edit-card-header">
      <div class="flex-title-status">
        <div class="ticket-number">
          <h3>Incident #{{ ticket.id }}</h3>
        </div>
        <div class="ticket-status">
          <span class="badge-status" :class="getStatusClass(form.status)">
            {{ form.status }}
          </span>
        </div>
      </div>
      <div>
        <h4>{{ ticket.title}}</h4>
      </div>
    </div>

    <div class="edit-card-body">
      <div class="ticket-description">
        <h5>Description</h5>
        <span>{{ ticket.description }}</span>
      </div>  
      <div class="info-grid" v-if="ticket.assigned_to === authStore.user.id">
        <div class="ticket-category">
          <label for="category">Catégorie</label>
          <select id="category" v-model="form.category" class="form-select">
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
        </div> 
        <div class="ticket-priority">
          <label for="priority">Priorité</label>
          <select id="priority" v-model="form.priority" class="form-select">
            <option value="Basse">Basse</option>
            <option value="Moyenne">Moyenne</option>
            <option value="Haute">Haute</option>
            <option value="Critique">Critique</option>
          </select>
        </div>
        <div class="ticket-status-edit">
          <label for="status">Statut</label>
          <select id="status" v-model="nextStatus" class="form-select" @change="changeStatus(nextStatus)">
            <option value="" disabled>
              {{ status }}
            </option>
            <option 
              v-for="transition in allowedTransition" 
              :key="transition" 
              :value="transition">
                {{ transition }}
            </option>
          </select>
        </div>
      </div>
      <div class="info-grid" v-else>
        <div class="ticket-category">
          <label for="category">Catégorie</label>
          <select id="category" v-model="form.category" class="form-select" disabled>
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
        </div> 
        <div class="ticket-priority">
          <label for="priority">Priorité</label>
          <select id="priority" v-model="form.priority" class="form-select" disabled>
            <option value="Basse">Basse</option>
            <option value="Moyenne">Moyenne</option>
            <option value="Haute">Haute</option>
            <option value="Critique">Critique</option>
          </select>
        </div>
        <div class="ticket-status-edit">
          <label for="status">Statut</label>
          <select id="status" v-model="nextStatus" class="form-select" @change="changeStatus(nextStatus)" disabled>
            <option value="" disabled>
              {{ status }}
            </option>
            <option 
              v-for="transition in allowedTransition" 
              :key="transition" 
              :value="transition">
                {{ transition }}
            </option>
          </select>
          <span class="disable-status"> Vous ne pouvez modifier que les incidents qui vous sont assignés</span>
        </div>
      </div>

      <div class="ticket-created-at">
        <h6>Date de création</h6>
          <span>{{ formatDate(ticket.created_at) }}</span>
      </div>

      <div class="ticket-assigned">
        <h6>Assigné à</h6>
        <span>{{ ticket.technicien ? ticket.technicien.first_name : 'Non assigné'  }}</span>
      </div>
    </div>
    <div class="actions">
      <h6>Actions disponibles</h6>
      <div class="actions-buttons">
        <button type="submit" class="action-btn save-btn" v-if="ticket.assigned_to === authStore.user.id">
          Enregistrer
        </button>

        <router-link :to="`/details/${ticket.id}`" class="action-btn cancel-btn">
          Retour
        </router-link>
      </div> 
    </div>
  </form>

</template>

<style scoped>
  .flex-title-status {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 2rem;
  }

  .edit-card-body {
    margin-top: 18px;
  }

  .ticket-description {
    margin-bottom: 28px;
  }

  .info-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 36px 64px;
    padding: 10px 0;
    max-width: 720px;
  }

  .info-grid > div {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .ticket-created-at{
    margin-bottom: 28px;
  }

  .ticket-assigned {
    margin-bottom: 28px;
  }

  .actions h6 {
    margin: 0 0 12px;
  }

  .actions-buttons {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
  }

  .edit-success{
    background-color:var(--success-message-transparent);
    padding:10px;
    border-radius: 8px;
    border: 1px solid var(--color-success);
    margin-bottom: 20px;
  }

  .disable-status{
    color: var(--color-danger)
  }

  .edit-error{
    background-color: var(--error-message-transparent);
    padding:10px;
    border-radius: 8px;
    border: 1px solid var(--color-danger);
    margin-bottom: 20px;
  }

  .action-btn,
  .back-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 10px 18px;
    border-radius: 10px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    text-decoration: none;
  }

  .action-btn {
    border: none;
    background-color: var(--button-primary-bg);
    color: var(--button-primary-text);
  }

  .action-btn:hover {
    background-color: var(--button-primary-hover-bg);
    color: var(--button-primary-hover-text);
  }

  .btn {
    margin-bottom: 20px;
    background-color: var(--button-primary-bg);
    color: var(--button-primary-text);
    border: 1px solid var(--button-primary-border);
  }

  .btn:hover {
    background-color: var(--button-primary-hover-bg);
    color: var(--button-primary-hover-text);
  }

  .back-btn {
    width: fit-content;
    margin-top: 20px;
    border: 1px solid var(--button-primary-border);
    background-color: var(--button-primary-bg) ;
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.12);
  }

  .back-btn:hover {
    background-color: var(--button-primary-hover-bg);
    color: var(--button-primary-hover-text);
  }

  .badge-status {
    display: inline-block;
    width: fit-content;
    padding: 8px 14px;
    border-radius: 999px;
    font-size: 1rem;
    font-weight: 600;
    white-space: nowrap;
  }
  .status-open {
    background-color: var(--status-open);
    color: black;
  }

  .status-assigned {
    background-color: var(--status-assigned);
    color: black;
  }

  .status-in-progress {
    background-color: var(--status-in-progress);
    color: black;
  }

  .status-waiting {
    background-color: var(--status-waiting);
    color: black;
  }

  .status-resolved {
    background-color: var(--status-resolved);
    color: black;
  }

  .status-closed {
    background-color: var(--status-closed);
    color: black;
  }
</style>