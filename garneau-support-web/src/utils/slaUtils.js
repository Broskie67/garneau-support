export const getHoursSinceCreation = (createdAt, currentTime) => {
  currentTime = new Date()
  return (currentTime - new Date(createdAt)) / (1000 * 60 * 60)
}

export const getAssignmentDelay = (priority) => {
  if(priority === 'Critique') return 0.5
  if(priority === 'Haute') return 2
  if(priority === 'Moyenne') return 8
  if(priority === 'Basse') return 24
} 

export const getResolutionDelay = (priority) => {
  if(priority === 'Critique') return 4
  if(priority === 'Haute') return 8
  if(priority === 'Moyenne') return 24
  if(priority === 'Basse') return 72
}

export const getAssignementSlaClass = (ticket, currentTime) => {
  currentTime = new Date()

  if (ticket.assigned_to !== null) {
    return 'sla-ok'
  }

  const hoursSinceCreation = getHoursSinceCreation(ticket.created_at)
  const maxHour = getAssignmentDelay(ticket.priority)

  if(hoursSinceCreation > maxHour) {
    return 'sla-danger'

  }

  return 'sla-warning'
}

export const getResolutionSlaClass = (ticket, currentTime) => {
  currentTime = new Date()

  if(ticket.status === 'Résolu' || ticket.status === 'Fermé'){
    return 'sla-ok'

  }

  const hoursSinceCreation = getHoursSinceCreation(ticket.created_at)
  const maxHour = getResolutionDelay(ticket.priority)

  if(hoursSinceCreation > maxHour) {
    return 'sla-danger'

  }

  if(ticket.assigned_to !== null) {
    return  'sla-info'

  }
  return 'sla-warning'

}

export const isTicketSlaOverdue = (ticket, currentTime) => {
  currentTime = new Date()
  return getAssignementSlaClass(ticket, currentTime) === 'sla-danger' ||
    getResolutionSlaClass(ticket, currentTime) === 'sla-danger'
}