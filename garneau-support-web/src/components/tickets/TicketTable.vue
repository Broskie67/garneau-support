<script setup>
import { ref, computed } from 'vue';
import TicketSlaIndicator from './TicketSlaIndicator.vue';

const props = defineProps({
  tickets: {
    type: Array,
    required: true
  },
  isTechnician: {
    type: Boolean,
    default: false
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  newAssignedTicketIds: {
    type: Array,
    default: () => []
  },
  newCreatedTicketIds: {
    type: Array,
    default: () => []
  }
})

const sortColumn = ref('priority')
const sortDirection = ref('desc')

const sortBy = (columm) => {
  if(sortColumn.value === columm) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortColumn.value = columm
    sortDirection.value = 'desc'
  }
}

const priorityOrder = ['Basse', 'Moyenne', 'Haute', 'Critique']

const sortedTickets = computed(() => {
  return [...props.tickets].sort((a, b) => {
    let result = 0

    if (sortColumn.value === 'priority') {
      result =
        priorityOrder.indexOf(a.priority) -
        priorityOrder.indexOf(b.priority)
    }

    if (sortColumn.value === 'created_at') {
      result =
        new Date(a.created_at) -
        new Date(b.created_at)
    }

    return sortDirection.value === 'asc' ? result : -result
  })
})

const getStatusClass = (status) => ({
  'status-open': status === 'Ouvert',
  'status-assigned': status === 'Assigné',
  'status-in-progress': status === 'En cours',
  'status-waiting': status === 'En attente',
  'status-resolved': status === 'Résolu',
  'status-closed': status === 'Fermé',
})

const getPriorityClass = (priority) => ({
  'priority-low': priority === 'Basse',
  'priority-medium': priority === 'Moyenne',
  'priority-high': priority === 'Haute',
  'priority-critical': priority === 'Critique'
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
    hour: '2-digit'
  })
}
</script>

<template>
  <div class="table-wrapper">
    <table class="ticket-table">
      <thead>
        <tr>
          <th>Id</th>
          <th>Titre</th>
          <th>SLA</th>
          <th>Catégorie</th>
          <th>Status</th>
          <th @click="sortBy('priority')">
            Priorité
            <span v-if="sortColumn === 'priority'">
              {{ sortDirection === 'asc' ? '↑' : '↓' }}   
            </span>
          </th>
          <th @click="sortBy('created_at')">
            Date création
            <span v-if="sortColumn === 'created_at'">
              {{ sortDirection === 'asc' ? '↑' : '↓' }}   
            </span>
          </th>
          <th>Assigné à</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        <tr 
          v-for="ticket in sortedTickets" 
          :key="ticket.id" 
          :class="{
            'new-ticket': newCreatedTicketIds.includes(ticket.id),
            'new-assigned-ticket': newAssignedTicketIds.includes(ticket.id)
          }">
          <td>{{ ticket.id }}</td>
          <td>{{ ticket.title }}</td>
          <td class="sla-cell"> 
            <ticket-sla-indicator :ticket="ticket"/>
          </td>
          <td>{{ ticket.category ? ticket.category : 'Aucune catégorie'}}</td>

          <td>
            <span class="badge-status" :class="getStatusClass(ticket.status)">
              {{ ticket.status }}
            </span>
          </td>

          <td>
            <span class="badge-priority" :class="getPriorityClass(ticket.priority)">
              {{ ticket.priority }}
            </span>
          </td>

          <td>{{ formatDate(ticket.created_at) }}</td>

          <td>
            {{ ticket.technicien ? ticket.technicien.first_name : 'Non assigné' }}
          </td>

          <td class="action-btn">
            <router-link 
              class="details-btn" 
              :to="`/details/${ticket.id}`"
              @click="$emit('view-detail', ticket.id)">
              Voir détails
            </router-link>

            <button 
              v-if="isTechnician && ticket.assigned_to === null" 
              class="assign-btn"
              @click="$emit('self-assign-ticket', ticket.id)"
            >
              M’assigner
            </button>
            <span 
              v-if="newAssignedTicketIds.includes(ticket.id)" 
              class="assigned-message"
            >
              Nouvelle assignation
            </span>

            <span   
              v-if="newCreatedTicketIds.includes(ticket.id)" 
              class="created-message"
            >
              Nouveau ticket
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
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
    padding: 10px 10px 10px 0 ;
  }

  .assigned-message{
    text-align: center;
    padding-left: 0;
  }

  .action-btn {
    display: flex;
    gap: 10px;
    align-items: center;
  }

  .details-btn,
  .assign-btn{
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

  .assign-btn:hover {
    background-color: var(--status-assigned-hover);
    color: var(--button-secondary-hover-text);
    text-decoration: none;
  }

  .new-ticket {
    background-color: rgba(57, 247, 128, 0.18);
    margin: 12px 0;
    padding: 12px 16px;
    border-radius: 10px;
    background-color: #dcfce7;
    font-weight: 600;
    border: 1px solid #86efac;
  }

  .new-assigned-ticket {
    background-color: rgba(0, 14, 5, 0.18);
    margin: 12px 0;
    padding: 12px 16px;
    border-radius: 10px;
    background-color: #dcfce7;
    font-weight: 600;
    border: 1px solid #86efac;
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