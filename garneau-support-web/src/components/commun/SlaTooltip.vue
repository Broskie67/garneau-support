<script setup>

</script>

<template>
  <div class="sla-legend">
    <p class="legend-title">Légende SLA</p>

    <div class="legend-line">
      <div class="legend-item">
        <span class="arrow">↑</span>
        <span>Assignation</span>
      </div>

      <div class="legend-item">
        <span class="arrow">↓</span>
        <span>Résolution</span>
      </div>
    </div>

    <div class="legend-line">
      <div class="legend-item">
        <div class="sla-item sla-ok">
          <span class="sla-symbol"></span>
        </div>
        <span>Respecté</span>
      </div>

      <div class="legend-item">
        <div class="sla-item sla-warning">
          <span class="sla-symbol"></span>
        </div>
        <span>En attente</span>
      </div>

      <div class="legend-item">
        <div class="sla-item sla-danger">
          <span class="sla-symbol"></span>
        </div>
        <span>Dépassé</span>
      </div>

      <div class="legend-item">
        <div class="sla-item sla-info">
          <span class="sla-symbol"></span>
        </div>
        <span>En cours</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.sla-legend {
  padding: 18px 24px;
  border-radius: 16px;
  border: 1px solid rgba(148, 163, 184, 0.25);
  box-shadow: 0 10px 24px rgba(15, 23, 42, 0.08);
  margin-bottom: 20px;
  width: fit-content;
  background-color: #ffffff;
}

.legend-title {
  margin: 0 0 18px;
  font-weight: 700;
  font-size: 1rem;
}

.legend-line {
  display: flex;
  align-items: center;
  gap: 28px;
  margin-bottom: 16px;
}

.legend-line:last-child {
  margin-bottom: 0;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  white-space: nowrap;
}

.arrow {
  font-size: 1.1rem;
  font-weight: 700;
}

.sla-item {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 20px;
  border-radius: 999px;
}

.sla-symbol {
  width: 6px;
  height: 6px;
  border-radius: 50%;
}

.sla-ok {
  background-color: #dcfce7;
}

.sla-ok .sla-symbol {
  background-color: #22c55e;
}

.sla-warning {
  background-color: #fef3c7;
}

.sla-warning .sla-symbol {
  background-color: #f59e0b;
}

.sla-danger {
  background-color: #fee2e2;
}

.sla-danger .sla-symbol {
  background-color: #ef4444;
}

.sla-info {
  background-color: #dbeafe;
}

.sla-info .sla-symbol {
  background-color: #3b82f6;
}

@media screen and (max-width: 768px) {
  .sla-legend {
    width: 100%;
    padding: 16px;
  }

  .legend-line {
    align-items: flex-start;
    gap: 12px;
  }

  .legend-item {
    width: 100%;
  }
}

</style>