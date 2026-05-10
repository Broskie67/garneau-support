<script setup>
defineProps({
  comment: {
    type: Object,
    required: true
  }
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
  <div class="comment">
    <div class="flex-author-type">
      <div>
        <strong>
          {{ comment.author.first_name }} {{ comment.author.last_name }}
        </strong>
      </div>
      <div>
        {{ comment.type }}
      </div>
    </div>

    <p>
      {{ comment.content }}
    </p>

    <small>
      {{ formatDate(comment.createdAt) }}
    </small>
  </div>
</template>

<style scoped>

.comment{  
  background: #dcdbdb;
  padding: 10px;
  border-radius: 18px;
  border: 1px solid rgba(148, 163, 184, 0.25);
  box-shadow: 0 20px 40px rgba(15, 23, 42, 0.12);
  margin-bottom: 10px;
}
.flex-author-type {
  display: flex;
  justify-content: space-between;
}
</style>