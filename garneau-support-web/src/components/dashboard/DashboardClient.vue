<script setup>
import { computed, ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import { useTicketStore } from '@/stores/ticketStore'
import { useRoute } from 'vue-router'
import TicketTable from '@/components/tickets/TicketTable.vue'
import SlaTooltip from '../commun/SlaTooltip.vue'

const authStore = useAuthStore()
const ticketStore = useTicketStore()
const route = useRoute()

const successMessage = ref(route.query.success)
const errorMessage = ref('')

const getTickets = async () => {
  if (!authStore.token) {
    return
  }

  try {
    await ticketStore.getClientTickets(authStore.token)
  } catch (error) {
    errorMessage.value = error.message
  }
}

const getActiveTicket = computed(() => {
  return ticketStore.ticketsList.filter(ticket => ticket.status !== 'Fermé' && ticket.status !== 'Archivé')
})

const getClosedTicket = computed(() => {
  return ticketStore.ticketsList.filter(ticket => ticket.status === 'Fermé' )
})

onMounted(() => {
  getTickets()
})

</script>

<template>
  <h2>Tableau de bord</h2>

  <p v-if="errorMessage" class="error-message">
    {{ errorMessage }}
  </p>

  <div class="table-active">
    <div class="flex-title-tooltip">
      <h3>Incidents actifs</h3>
      <SlaTooltip/>
    </div>
    <span v-if="successMessage" class="success-message">
      {{ successMessage }}
    </span>
    <TicketTable :tickets="getActiveTicket" />
  </div>
   
  
  <div class="table-closed" >
    <h3>Incidents fermés</h3>
    <TicketTable :tickets="getClosedTicket" />
  </div>
</template>

<style scoped>

  .table-active {
    margin-bottom: 3rem;
    background: #ffffff;
    width: 1200px;
    padding: 32px 38px;
    border-radius: 18px;
    border: 1px solid rgba(148, 163, 184, 0.25);
    box-shadow: 0 20px 40px rgba(15, 23, 42, 0.12);
  }

  h3 {
    align-self: center;
  }

  .flex-title-tooltip {
    display: flex;
    justify-content: space-between;
  }

  .table-closed {
    margin-top: 1rem;
    background: #ffffff;
    width: 1200px;
    padding: 32px 38px;
    border-radius: 18px;
    border: 1px solid rgba(148, 163, 184, 0.25);
    box-shadow: 0 20px 40px rgba(15, 23, 42, 0.12);
  }

  .success-message{
    display: block;
    width: 100%;
    background-color: var(--success-message-transparent);
    padding: 10px 14px;
    border-radius: 8px;
    border: 1px solid var(--color-success);
    margin-bottom: 24px;
  }
</style>
