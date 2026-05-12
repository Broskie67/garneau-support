<script setup>
  import { computed } from 'vue'
  import { isTicketSlaOverdue } from '@/utils/slaUtils'

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

  const overdueSlaTicketCount = computed(() => {
    return props.tickets.filter(ticket => isTicketSlaOverdue(ticket)).length
  })

  const averageResolutionTime = computed(() => {
    const resolvedTicket = props.tickets.filter(ticket => ticket.resolved_at !== null)
    
    if(resolvedTicket.length === 0) {
      return '0 h'
    }

    let totalHours = 0
  
    for (const ticket of resolvedTicket) {
      const createdAt = new Date(ticket.created_at)
      const resolvedAt = new Date(ticket.resolved_at)

      const hours = (resolvedAt - createdAt) / (1000 * 60 * 60)

      totalHours += hours
    }

    const averageHours = totalHours / resolvedTicket.length

    return `${Math.round(averageHours)} h`
  })

  const ticketsByTechnicianCount = computed(() => {
    const result = []

    props.tickets.forEach(ticket => {
      let technicianName = 'Non assignés'

      if (ticket.technicien) {
        technicianName = `${ticket.technicien.first_name} ${ticket.technicien.last_name}`
      }

      const technician = result.find(item => item.name === technicianName)

      if (technician) {
        technician.count++
      } else {
        result.push({
          name: technicianName,
          count: 1
        })
      }
    })

    return result
  })
</script>

<template>
  <h2 class="section-title">Indicateurs de performance</h2>
  <div class="tech-grid">
    <div class="stat-card">
      <p class="card-title">Incidents ouverts</p>
      <p class="card-value">{{ openTicketsCount }}</p>
    </div>
    <div class="stat-card">
      <p class="card-title">Incidents en cours</p>
      <p class="card-value">{{ inProgressTicketsCount }}</p>
    </div>
    <div class="stat-card">
      <p class="card-title">Incidents en attente</p>
      <p class="card-value">{{ pendingTicketsCount }}</p>
    </div>
    <div class="stat-card">
      <p class="card-title">Incidents résolus</p>
      <p class="card-value">{{ resolvedTicketsCount }}</p>
    </div>
    <div class="stat-card">
      <p class="card-title">Incidents totaux</p>
      <p class="card-value">{{ totalTicketCount }}</p>
    </div>
  </div>
  <div v-if="isAdmin" class="admin-grid">
    <div class="stat-card">
      <p class="card-title">Incidents en retard</p>
      <p class="card-value">{{ overdueSlaTicketCount }}</p>
    </div>
    <div class="stat-card">
      <p class="card-title">Temps moyen de résoulution</p>
      <p class="card-value">{{averageResolutionTime}}</p>
    </div>
    <div class="stat-card technician-card">
      <p class="card-title">Incidents par technicien</p>
      <div class="technician-list">
        <div
          v-for="technician in ticketsByTechnicianCount" 
          :key="technician.name"
          class="technician-row"
        >
          <span class="technician-name">{{ technician.name }}</span>
          <strong class="technician-count">{{ technician.count }}</strong>
        </div>
      </div>
      
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

  .tech-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 1rem;
  }

  .admin-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 1rem;
    margin-top: 1rem;
}

  .stat-card{
    background: #ffffff;
    padding: 22px 28px;
    border-radius: 14px;
    border: 1px solid rgba(148, 163, 184, 0.25);
    box-shadow: 0 20px 40px rgba(15, 23, 42, 0.12);
    min-height: 130px;
  }

  .technician-card {
    grid-column: span 2;
    min-height: 260px;
  }

  .technician-list {
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.7rem;
  }

  .technician-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.6rem 0;
    border-bottom: 1px solid #e5e7eb;
  }

  .technician-row:last-child {
    border-bottom: none;
  }

  .technician-name {
    font-size: 0.95rem;
    font-weight: 500;
    color: #374151;
  } 

  .technician-count {
    font-size: 1.1rem;
    font-weight: 800;
    color: var(--color-primary-dark);
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