<script setup lang="ts">
/**
 * Decorative signal-waveform — deterministic pseudo-random bars,
 * pure CSS animation, hidden from assistive tech.
 */
interface Bar {
  height: string
  duration: string
  delay: string
  accent: boolean
}

const bars: Bar[] = Array.from({ length: 44 }, (_, i) => {
  const seed = Math.sin(i * 127.1 + 311.7) * 43758.5453
  const r = seed - Math.floor(seed)
  return {
    height: `${Math.round(16 + r * 84)}%`,
    duration: `${(0.55 + r * 0.75).toFixed(2)}s`,
    delay: `${(-r * 2.4).toFixed(2)}s`,
    accent: i % 9 === 4,
  }
})
</script>

<template>
  <div class="wave" role="presentation" aria-hidden="true">
    <span
      v-for="(bar, i) in bars"
      :key="i"
      class="bar"
      :class="{ 'bar--accent': bar.accent }"
      :style="{
        '--h': bar.height,
        '--dur': bar.duration,
        '--delay': bar.delay,
      }"
    />
  </div>
</template>

<style scoped>
.wave {
  display: flex;
  align-items: flex-end;
  gap: 3px;
  height: 72px;
}

.bar {
  width: 3px;
  height: var(--h);
  background: var(--ghost);
  transform-origin: bottom;
  animation: wave var(--dur) ease-in-out var(--delay) infinite alternate;
}

.bar--accent {
  background: var(--accent);
}

@keyframes wave {
  from {
    transform: scaleY(0.22);
  }
  to {
    transform: scaleY(1);
  }
}

@media (prefers-reduced-motion: reduce) {
  .bar {
    animation: none;
  }
}
</style>
