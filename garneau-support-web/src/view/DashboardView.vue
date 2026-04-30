<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import { useTicketStore } from '@/stores/ticketStore'
 

const authStore = useAuthStore()
const ticketStore = useTicketStore()

const errorMessage = ref('')

const getTickets = async () => {
  if (!authStore.token) {
    return
  }

  try {
    await ticketStore.getTickets(authStore.token)
  } catch (error) {
    errorMessage.value = error.message
  }
}

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

onMounted(() => {
  getTickets()
})
</script>

<template>
  <div class="dashboard-page">
    <div class="dashboard-card">
      <h2>Tableau de bord</h2>
      <div class="table-wrapper">
        <table class="ticket-table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Titre</th>
              <th>Catégorie</th>
              <th>Status</th>
              <th>Priorité</th>
              <th>Date et heure de création</th>
              <th>Assigné à</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="ticket in ticketStore.ticketsList" :key="ticket.id">
              <td>{{ ticket.id }}</td>
              <td>{{ ticket.title }}</td>
              <td>{{ ticket.category }}</td>
              <td>
                <span class="badge-status"
                :class="{
                  'status-open': ticket.status === 'Ouvert',
                  'status-assigned': ticket.status === 'Assigné',
                  'status-in-progress': ticket.status === 'En Cours',
                  'status-waiting': ticket.status === 'En Attente',
                  'status-resolved': ticket.status === 'Résolu',
                  'status-closed': ticket.status === 'Fermé',
                  'status-archived': ticket.status === 'Archivé'
                }">
                  {{ ticket.status }}
                </span>
              </td>

              <td>
                <span class="badge-priority"
                :class="{
                  'priority-low': ticket.priority === 'Basse',
                  'priority-medium': ticket.priority === 'Moyenne',
                  'priority-high': ticket.priority === 'Haute',
                  'priority-critical': ticket.priority === 'Critique'
                }">
                  {{ ticket.priority }}
                </span>
              </td>
              <td>{{ formatDate(ticket.created_at) }}</td>
              <td>{{ ticket.technicien ? `${ticket.technicien.first_name}`: 'Non assigné' }}</td>
              <td>
                <router-link class="details-btn">Voir détails</router-link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .dashboard-page{
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 40px;
    padding-bottom: 100px;
  }

  .dashboard-card{
    background: #ffffff;
    width: 1200px;
    padding: 32px 38px;
    border-radius: 18px;
    border: 1px solid rgba(148, 163, 184, 0.25);
    box-shadow: 0 20px 40px rgba(15, 23, 42, 0.12);
  }

  .table-wrapper {
    width: 100%;
    overflow-x: auto;
  }

  .ticket-table{
    width: 100%;
    border-collapse: collapse;
    background-color: white;
    border: 1px solid var(--color-border);
    border-radius: 8px;
    overflow: hidden;
  }

  td {
    padding-top: 15px;
  }

  .details-btn{
    display: inline-block;
    padding: 8px 14px;
    border-radius: 8px;
    background-color: var(--button-secondary-bg);
    color: var(--button-secondary-text);
    border: 1px solid var(--button-secondary-border);
    font-weight: 500;
    text-decoration: none;
  }

  .details-btn:hover {
    background-color: var(--button-secondary-hover-bg);
    color: var(--button-secondary-hover-text);
    text-decoration: none;
  }

  .badge-priority,
  .badge-status {
    display: inline-block;
    padding: 6px 12px;
    border-radius: 999px;
    font-size: 0.85rem;
    font-weight: 600;
    white-space: nowrap;
  }

  .status-open{
    background-color: var(--status-open);
    color: black;
  }

  .status-assigned{
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

  .status-closed{
    background-color: var(--status-closed);
    color: black;
  }

  .status-archived {
    background-color: var(--status-archived);
    color: black;
  }


  .priority-low {
    background-color: var(--priority-low);
    color: black;
  }

  .priority-medium {
    background-color: var(--priority-medium);
    color: black;
  }

  .priority-high {
    background-color: var(--priority-high);
    color: black;
  }

  .priority-critical {
    background-color: var(--priority-critical);
    color: black;
  }

</style>