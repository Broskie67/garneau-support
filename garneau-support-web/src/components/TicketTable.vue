<script setup>
defineProps({
  tickets: {
    type: Array,
    required: true
  }
})

const getStatusClass = (status) => ({
  'status-open': status === 'Ouvert',
  'status-assigned': status === 'Assigné',
  'status-in-progress': status === 'En Cours',
  'status-waiting': status === 'En Attente',
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
    hour: '2-digit',
    minute: '2-digit'
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
          <th>Catégorie</th>
          <th>Status</th>
          <th>Priorité</th>
          <th>Date et heure de création</th>
          <th>Assigné à</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="ticket in tickets" :key="ticket.id">
          <td>{{ ticket.id }}</td>
          <td>{{ ticket.title }}</td>
          <td>{{ ticket.category }}</td>

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

          <td>
            <router-link class="details-btn" :to="`/tickets/${ticket.id}`">
              Voir détails
            </router-link>
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