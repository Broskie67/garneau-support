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
  <h2 class="page-title">Tableau de bord</h2>

  <p v-if="errorMessage" class="error-message">
    {{ errorMessage }}
  </p>

  <section class="dashboard-section table-active">
    <div class="flex-title-tooltip">
      <h3 class="section-title">Incidents actifs</h3>
      <SlaTooltip/>
    </div>
    <span v-if="successMessage" class="success-message">
      {{ successMessage }}
    </span>
    <TicketTable :tickets="getActiveTicket" />
  </section>
   
  
  <section class="dashboard-section table-closed" >
    <h3 class="section-title">Incidents fermés</h3>
    <TicketTable :tickets="getClosedTicket" />
  </section>
</template>

<style scoped>
  .table-active,
  .table-closed {
    background: #ffffff;
    width: 100%;
    max-width: 1200px;
    padding: 32px 38px;
    border-radius: 18px;
    border: 1px solid rgba(148, 163, 184, 0.25);
    box-shadow: 0 20px 40px rgba(15, 23, 42, 0.12);
  }

  .table-active {
    margin-bottom: 3rem;
  }

  .table-closed {
    margin-top: 1rem;
  }

 .page-title {
    margin: 0 0 1.5rem;
    font-size: 2rem;
    font-weight: 700;
    color: #111827;
  }

  .section-title {
    margin: 0 0 1rem;
    font-size: 1.45rem;
    font-weight: 700;
    color: #111827;
    align-self: center;
  }

  .flex-title-tooltip {
    display: flex;
    justify-content: space-between;
  }

  .success-message {
    background-color: #DCFCE7;
    color: #166534;
    border: 1px solid #86EFAC;
    padding: 12px 16px;
    border-radius: 18px;
    font-weight: 600;
    margin-bottom: 20px;
  }

  @media screen and (max-width: 768px) {
  .table-active,
  .table-closed {
    width: 100%;
    padding: 20px 16px;
    border-radius: 14px;
  }

  .page-title {
    font-size: 1.6rem;
    text-align: center;
  }

  .section-title {
    font-size: 1.2rem;
  }

  .flex-title-tooltip {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
}
</style>
