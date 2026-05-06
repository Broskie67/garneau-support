<script setup>

defineProps({
  ticket: {
    type: Object,
    required: true
  },
  isTechnician: {
    type: Boolean,
    default: false
  },
  isAdmin: {
    type: Boolean,
    default: false
  }
})

const getStatusClass = (status) => ({
  'status-open': status === 'Ouvert',
  'status-assigned': status === 'Assigné',
  'status-in-progress': status === 'En cours',
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
  <div class="card-content">
    <div class="detail-card-header">
      <div class="flex-title-status">
        <div class="ticket-number">
          <h3>Incident #{{ ticket.id }}</h3>
        </div>
        <div class="ticket-status">
          <span class="badge-status" :class="getStatusClass(ticket.status)">
            {{ ticket.status }}
          </span>
        </div> 
      </div>
      <div>
        <h4>{{ ticket.title}}</h4>
      </div>
    </div>
    <div class="detail-card-body">

      <div class="ticket-description">
        <h5>Description</h5>
        <span>{{ ticket.description }}</span>
      </div>

      <div class="info-grid">
        <div class="ticket-category">
          <h6>Catégorie</h6>
           <span>{{ ticket.category ? ticket.category : 'Aucune catégorie'}}</span>
        </div>

        <div class="ticket-priority">
          <h6>Priorité</h6>
           <span class="badge-priority" :class="getPriorityClass(ticket.priority)">{{ ticket.priority }}</span>
        </div>

        <div class="ticket-created-at">
          <h6>Date de création</h6>
           <span>{{ formatDate(ticket.created_at) }}</span>
        </div>

        <div class="ticket-assigned">
          <h6>Assigné à</h6>
          <span>{{ ticket.technicien ? ticket.technicien.first_name : 'Non assigné' }}</span>
        </div>

      </div>        
    </div>
    <div class="actions">
      <h6>Actions disponibles</h6>
      <div class="actions-buttons">
        <button
          v-if="isTechnician && ticket.assigned_to === null"
          class="action-btn assign-btn"
          @click="$emit('self-assign-ticket', ticket.id)"> 
            M'assigner
        </button>
        <router-link 
          :to="`/tickets/${ticket.id}/edit`" 
          class="action-btn modify-btn" 
          v-if="ticket.assigned_to !== null || !isTechnician || isAdmin">
          modifier
        </router-link>
      </div> 
    </div>
    <router-link to="/dashboard" class="back-btn">Retour à la liste</router-link>

  </div>
</template>

<style scoped>
  .flex-title-status {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 2rem;
  }

  .detail-card-body {
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

  .info-grid h6 {
    margin: 0;
  }

  .info-grid span {
    display: inline-block;
  }

  .actions {
    margin-top: 36px;
    padding-top: 24px;
    border-top: 1px solid rgba(148, 163, 184, 0.25);
  }

  .actions h6 {
    margin: 0 0 12px;
  }

  .actions-buttons {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
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

  .badge-priority,
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

  @media (max-width: 700px) {
    .flex-title-status {
      flex-direction: column;
      gap: 1rem;
    }

    .info-grid {
      grid-template-columns: 1fr;
      gap: 24px;
    }

    .back {
      min-width: 100%;
    }
  }
</style>