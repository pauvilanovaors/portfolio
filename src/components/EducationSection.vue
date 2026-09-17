<script setup lang="ts">
import { certifications, education, languages } from '../data/profile'
</script>

<template>
  <section id="education" class="section" aria-labelledby="education-title">
    <div class="wrap">
      <div class="section-head" v-reveal>
        <div>
          <p class="eyebrow">05 — Education & Certifications</p>
          <h2 id="education-title" class="section-title">Trained in Barcelona,<br />tempered in Munich.</h2>
        </div>
      </div>

      <div class="edu-grid">
        <div class="edu-col" v-reveal>
          <h3 class="col-label mono">Education</h3>
          <ol class="edu-list">
            <li v-for="entry in education" :key="entry.period" class="edu-item">
              <span class="mono edu-period">{{ entry.period }}</span>
              <div>
                <p class="edu-degree">{{ entry.degree }}</p>
                <p class="edu-school">{{ entry.school }} — {{ entry.place }}</p>
              </div>
            </li>
          </ol>

          <h3 class="col-label mono lang-label">Languages</h3>
          <ul class="lang-list">
            <li v-for="lang in languages" :key="lang.code" class="lang-item">
              <span class="mono lang-code">{{ lang.code }}</span>
              <span class="lang-name">{{ lang.name }}</span>
              <span class="mono lang-level">{{ lang.level }}</span>
            </li>
          </ul>
        </div>

        <div class="edu-col" v-reveal="100">
          <h3 class="col-label mono">Certifications & Courses</h3>
          <ol class="cert-list">
            <li v-for="cert in certifications" :key="cert.name" class="cert-item">
              <div>
                <p class="cert-name">{{ cert.name }}</p>
                <p class="cert-issuer">{{ cert.issuer }}</p>
              </div>
              <span class="mono cert-year">{{ cert.year }}</span>
            </li>
          </ol>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.edu-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: clamp(2.5rem, 6vw, 6rem);
}

.col-label {
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--line);
  color: var(--faint);
}

.lang-label {
  margin-top: 3rem;
}

.edu-list,
.cert-list {
  display: grid;
}

.edu-item {
  display: grid;
  grid-template-columns: 7.5rem 1fr;
  gap: 1.5rem;
  padding: 1.4rem 0;
  border-bottom: 1px solid var(--line);
}

.edu-period {
  color: var(--accent);
  padding-top: 0.2rem;
}

.edu-degree {
  font-weight: 500;
  font-size: 1.05rem;
  line-height: 1.35;
}

.edu-school {
  margin-top: 0.3rem;
  color: var(--faint);
  font-size: 0.9rem;
}

.lang-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 3rem;
}

.lang-item {
  display: flex;
  align-items: baseline;
  gap: 0.8rem;
  padding: 1rem 0.5rem 1rem 0;
  border-bottom: 1px solid var(--line);
}

.lang-code {
  color: var(--accent);
}

.lang-name {
  font-weight: 500;
}

.lang-level {
  margin-left: auto;
  color: var(--faint);
}

.cert-item {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 1.5rem;
  padding: 1.05rem 0;
  border-bottom: 1px solid var(--line);
}

.cert-name {
  font-weight: 500;
  font-size: 0.98rem;
  line-height: 1.4;
}

.cert-issuer {
  margin-top: 0.2rem;
  color: var(--faint);
  font-size: 0.85rem;
}

.cert-year {
  color: var(--faint);
  flex: none;
}

@media (max-width: 900px) {
  .edu-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 520px) {
  .edu-item {
    grid-template-columns: 1fr;
    gap: 0.3rem;
  }
}
</style>
