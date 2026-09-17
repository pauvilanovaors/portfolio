<script setup lang="ts">
import { skillGroups } from '../data/profile'
</script>

<template>
  <section id="skills" class="section" aria-labelledby="skills-title">
    <div class="wrap">
      <div class="section-head" v-reveal>
        <div>
          <p class="eyebrow">04 — Skills</p>
          <h2 id="skills-title" class="section-title">The full stack<br />of a hardware product.</h2>
        </div>
        <p class="section-note">
          From silicon-adjacent firmware to the web tools and AI automation around it.
        </p>
      </div>

      <div class="skills-grid">
        <div
          v-for="(group, i) in skillGroups"
          :key="group.index"
          class="skill-group"
          v-reveal="(i % 3) * 80"
        >
          <div class="skill-head">
            <span class="mono skill-index">{{ group.index }}</span>
            <h3 class="skill-label mono">{{ group.label }}</h3>
          </div>
          <ul class="skill-list">
            <li v-for="item in group.items" :key="item">{{ item }}</li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.skills-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  border-top: 1px solid var(--line);
  border-left: 1px solid var(--line);
}

.skill-group {
  padding: clamp(1.5rem, 2.8vw, 2.4rem);
  border-right: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
  transition: background-color 0.3s ease;
}

.skill-group:hover {
  background: var(--bg-raise);
}

.skill-head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 1rem;
  padding-bottom: 1.2rem;
  border-bottom: 1px solid var(--line);
}

.skill-index {
  color: var(--accent);
}

.skill-label {
  color: var(--text);
  font-size: 0.6875rem;
  text-align: right;
}

.skill-list {
  display: grid;
  padding-top: 0.4rem;
}

.skill-list li {
  padding: 0.55rem 0;
  border-bottom: 1px solid var(--line);
  color: var(--dim);
  font-size: 0.98rem;
  transition:
    color 0.2s ease,
    padding-left 0.25s var(--ease);
}

.skill-list li:last-child {
  border-bottom: 0;
}

.skill-list li:hover {
  color: var(--text);
  padding-left: 0.4rem;
}

@media (max-width: 1000px) {
  .skills-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 640px) {
  .skills-grid {
    grid-template-columns: 1fr;
  }
}
</style>
