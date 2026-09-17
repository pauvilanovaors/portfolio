<script setup lang="ts">
import { experience } from '../data/profile'
</script>

<template>
  <section id="experience" class="section" aria-labelledby="experience-title">
    <div class="wrap">
      <div class="section-head" v-reveal>
        <div>
          <p class="eyebrow">02 — Experience</p>
          <h2 id="experience-title" class="section-title">Four years,<br />one product line.</h2>
        </div>
        <p class="section-note">
          From validation test cases to product ownership — all of it at Technica, across Barcelona
          and Munich.
        </p>
      </div>

      <ol class="jobs">
        <li
          v-for="(job, i) in experience"
          :key="job.period"
          class="job"
          v-reveal="i * 80"
        >
          <span class="job-index mono" aria-hidden="true">
            {{ String(i + 1).padStart(2, '0') }}
          </span>

          <div class="job-meta">
            <span class="mono job-period">{{ job.period }}</span>
            <span class="mono job-location">{{ job.location }}</span>
          </div>

          <div class="job-body">
            <h3 class="job-role">
              {{ job.role }}
              <span v-if="job.current" class="job-current mono">Current</span>
            </h3>
            <p class="job-company">{{ job.company }}</p>
            <ul class="job-points">
              <li v-for="point in job.points" :key="point">{{ point }}</li>
            </ul>
          </div>
        </li>
      </ol>
    </div>
  </section>
</template>

<style scoped>
.jobs {
  border-top: 1px solid var(--line);
}

.job {
  display: grid;
  grid-template-columns: 3.5rem minmax(150px, 0.65fr) minmax(0, 2.2fr);
  gap: clamp(1.25rem, 3vw, 3rem);
  padding: clamp(1.8rem, 3.5vw, 2.8rem) clamp(0.5rem, 1.5vw, 1.5rem);
  border-bottom: 1px solid var(--line);
  transition: background-color 0.3s ease;
}

.job:hover {
  background: var(--bg-raise);
}

.job-index {
  color: var(--accent);
  padding-top: 0.45rem;
}

.job-meta {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding-top: 0.45rem;
  color: var(--faint);
}

.job-role {
  font-size: clamp(1.25rem, 2.2vw, 1.7rem);
  font-weight: 500;
  letter-spacing: -0.015em;
  line-height: 1.2;
}

.job-current {
  display: inline-block;
  vertical-align: middle;
  margin-left: 0.7rem;
  padding: 0.28rem 0.6rem;
  border: 1px solid var(--accent);
  border-radius: 999px;
  color: var(--accent);
  font-size: 0.5625rem;
  transform: translateY(-2px);
}

.job-company {
  margin-top: 0.35rem;
  color: var(--faint);
  font-size: 0.95rem;
}

.job-points {
  display: grid;
  gap: 0.55rem;
  margin-top: 1.1rem;
  max-width: 68ch;
  color: var(--dim);
  font-size: 0.98rem;
  line-height: 1.6;
}

.job-points li {
  position: relative;
  padding-left: 1.2rem;
}

.job-points li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.72em;
  width: 6px;
  height: 1px;
  background: var(--accent);
}

@media (max-width: 900px) {
  .job {
    grid-template-columns: 2.2rem 1fr;
  }

  .job-meta {
    flex-direction: row;
    flex-wrap: wrap;
    gap: 0.4rem 1.2rem;
    grid-column: 2;
    padding-top: 0;
  }

  .job-body {
    grid-column: 2;
  }
}
</style>
