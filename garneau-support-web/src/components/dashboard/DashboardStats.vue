<script setup>
  import { computed } from 'vue'

  const props = defineProps({
    tickets: {
      type: Array,
      required: true
    }, 
    isAdmin: {
      type: Boolean,
      default: false
    }
  })
 
  const openTicketsCount = computed(() => {
    return props.tickets.filter(ticket => ticket.status === 'Ouvert').length
  })

  const inProgressTicketsCount = computed(() => {
    return props.tickets.filter(ticket => ticket.status === 'En cours').length
  })

  const pendingTicketsCount = computed(() => {
    return props.tickets.filter(ticket => ticket.status === 'En attente').length
  })

  const resolvedTicketsCount = computed(() => {
    return props.tickets.filter(ticket => ticket.status === 'Résolu').length
  })

  const totalTicketCount = computed(() => {
    return props.tickets.length
  })

</script>

<template>
  <h2 class="section-title">Indicateurs de performance</h2>
  <div class="grid">
    <div class="stat-card">
      <p class="card-title">Incident ouvert</p>
      <p class="card-value">{{ openTicketsCount }}</p>
    </div>
    <div class="stat-card">
      <p class="card-title">Incident en cours</p>
      <p class="card-value">{{ inProgressTicketsCount }}</p>
    </div>
    <div class="stat-card">
      <p class="card-title">Incidents en attente</p>
      <p class="card-value">{{ pendingTicketsCount }}</p>
    </div>
    <div class="stat-card">
      <p class="card-title">Incident résolus</p>
      <p class="card-value">{{ resolvedTicketsCount }}</p>
    </div>
    <div class="stat-card">
      <p class="card-title">Incident totaux</p>
      <p class="card-value">{{ totalTicketCount }}</p>
    </div>
  </div>
  <div v-if="isAdmin" class="grid">
    <div class="stat-card">
      <p class="card-title">Incident en retard</p>
      <p class="card-value">8</p>
    </div>
  </div>

</template>

<style scoped>
  .section-title {
    margin: 0 0 1rem;
    font-size: 1.45rem;
    font-weight: 700;
    color: #111827;
    letter-spacing: 0.01em;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(5, 0.8fr);
    gap: 1rem;
  }

  .stat-card{
    background: #ffffff;
    padding: 22px 28px;
    border-radius: 14px;
    border: 1px solid rgba(148, 163, 184, 0.25);
    box-shadow: 0 20px 40px rgba(15, 23, 42, 0.12);
  }

  .card-title {
    margin: 0;
    font-size: 0.95rem;
    font-weight: 600;
    color: var(--color-primary-dark);
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }

  .card-value {
  margin: 0.4rem 0 0;
  font-size: 2rem;
  font-weight: 800;
  color: var(--color-primary-dark)
}


</style>