<script setup lang="ts">
import { profileFacts, profileParagraphs, profileStatement } from '../data/profile'
</script>

<template>
  <section id="profile" class="section" aria-labelledby="profile-title">
    <div class="wrap">
      <div class="profile-grid">
        <div class="profile-side" v-reveal>
          <p class="eyebrow">01 — Profile</p>
        </div>

        <div class="profile-main">
          <h2 id="profile-title" class="statement" v-reveal>
            {{ profileStatement }}
          </h2>

          <div class="profile-copy">
            <p v-for="(paragraph, i) in profileParagraphs" :key="i" v-reveal="i * 90">
              {{ paragraph }}
            </p>
          </div>

          <dl class="profile-facts">
            <div v-for="(fact, i) in profileFacts" :key="fact.label" class="fact" v-reveal="i * 70">
              <dt class="mono">{{ fact.label }}</dt>
              <dd>{{ fact.value }}</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.profile-grid {
  display: grid;
  grid-template-columns: minmax(160px, 0.9fr) minmax(0, 2.4fr);
  gap: clamp(2rem, 6vw, 6rem);
}

.profile-side {
  position: relative;
}

.profile-side .eyebrow {
  position: sticky;
  top: 110px;
}

.statement {
  max-width: 24ch;
  font-size: clamp(1.7rem, 3.6vw, 3rem);
  font-weight: 400;
  letter-spacing: -0.02em;
  line-height: 1.18;
}

.profile-copy {
  display: grid;
  gap: 1.4rem;
  max-width: 62ch;
  margin-top: clamp(2rem, 4vw, 3rem);
  color: var(--dim);
  font-size: 1.05rem;
  line-height: 1.75;
}

.profile-facts {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem 2rem;
  margin-top: clamp(2.5rem, 5vw, 4rem);
  padding-top: 1.8rem;
  border-top: 1px solid var(--line);
}

.fact dt {
  margin-bottom: 0.45rem;
  color: var(--accent);
}

.fact dd {
  color: var(--text);
  font-size: 0.98rem;
  line-height: 1.5;
}

@media (max-width: 900px) {
  .profile-grid {
    grid-template-columns: 1fr;
  }

  .profile-side .eyebrow {
    position: static;
  }

  .profile-facts {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
