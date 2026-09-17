<script setup lang="ts">
import { tickerItems } from '../data/profile'
</script>

<template>
  <div class="ticker" aria-hidden="true">
    <div class="ticker-track">
      <span v-for="n in 2" :key="n" class="ticker-group">
        <span v-for="item in tickerItems" :key="`${n}-${item}`" class="ticker-item mono">
          {{ item }}
          <i class="tick" />
        </span>
      </span>
    </div>
  </div>
</template>

<style scoped>
.ticker {
  overflow: hidden;
  border-block: 1px solid var(--line);
  padding-block: 0.9rem;
}

.ticker-track {
  display: flex;
  width: max-content;
  animation: ticker 46s linear infinite;
}

.ticker-group {
  display: flex;
  flex: none;
}

.ticker-item {
  display: inline-flex;
  align-items: center;
  gap: 1.6rem;
  padding-right: 1.6rem;
  color: var(--faint);
  white-space: nowrap;
}

.tick {
  width: 5px;
  height: 5px;
  background: var(--accent);
  transform: rotate(45deg);
  flex: none;
}

@keyframes ticker {
  to {
    transform: translateX(-50%);
  }
}

@media (prefers-reduced-motion: reduce) {
  .ticker-track {
    animation: none;
    flex-wrap: wrap;
    width: auto;
  }

  .ticker-group:last-child {
    display: none;
  }
}
</style>
