<script setup lang="ts">
import { identity, heroFacts, heroLead } from '../data/profile'
import SignalWave from './SignalWave.vue'
</script>

<template>
  <section class="hero" aria-labelledby="hero-name">
    <div class="wrap">
      <div class="hero-top mono" aria-hidden="true">
        <span>Portfolio — Vol. 01</span>
        <span class="hero-coords">{{ identity.coordinates }} — BCN</span>
      </div>

      <h1 id="hero-name" class="hero-name">
        <span class="line line-1"><span class="word">Pau</span></span>
        <span class="line line-2"><span class="word">Vilanova</span></span>
        <span class="line line-3">
          <span class="word">Ors<span class="accent-dot">.</span></span>
          <span class="hero-roles mono">{{ identity.roles.join(' — ') }}</span>
        </span>
      </h1>

      <div class="hero-bottom">
        <p class="hero-lead">{{ heroLead }}</p>

        <div class="hero-aside">
          <SignalWave />
          <dl class="hero-facts">
            <div v-for="fact in heroFacts" :key="fact.label" class="fact">
              <dt class="mono">{{ fact.label }}</dt>
              <dd>{{ fact.value }}</dd>
            </div>
          </dl>
        </div>
      </div>

      <a class="scroll-cue mono" href="#profile">
        Scroll
        <span class="cue-line" aria-hidden="true" />
      </a>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  display: flex;
  min-height: 100svh;
  padding-top: 72px;
}

.hero .wrap {
  display: flex;
  flex-direction: column;
  flex: 1;
  padding-top: clamp(1.5rem, 4vh, 3rem);
  padding-bottom: clamp(2rem, 5vh, 3.5rem);
}

.hero-top {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  color: var(--faint);
}

.hero-name {
  margin-block: auto;
  padding-block: clamp(1.5rem, 4.5vh, 3.5rem);
  font-weight: 500;
  font-size: clamp(3rem, 10.8vw, 9.5rem);
  line-height: 0.88;
  letter-spacing: -0.035em;
  text-transform: uppercase;
}

.line {
  display: flex;
  align-items: baseline;
  overflow: hidden;
  padding-block: 0.04em;
}

.line-2 {
  justify-content: flex-end;
}

.line-3 {
  gap: clamp(1rem, 3vw, 2.5rem);
}

.word {
  display: inline-block;
  clip-path: inset(0 0 110% 0);
  transform: translateY(24%);
  animation: rise 1s var(--ease) forwards;
}

.line-1 .word { animation-delay: 0.15s; }
.line-2 .word { animation-delay: 0.3s; }
.line-3 .word { animation-delay: 0.45s; }

@keyframes rise {
  to {
    clip-path: inset(-8% 0 -14% 0);
    transform: none;
  }
}

.accent-dot {
  color: var(--accent);
}

.hero-roles {
  align-self: flex-end;
  max-width: 15ch;
  padding-bottom: 0.35em;
  color: var(--faint);
  font-size: clamp(0.5625rem, 0.9vw, 0.6875rem);
  line-height: 1.8;
  animation: fade 1.2s ease 0.9s both;
}

@keyframes fade {
  from { opacity: 0; }
  to { opacity: 1; }
}

.hero-bottom {
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr);
  gap: clamp(2rem, 5vw, 5rem);
  align-items: end;
  padding-top: 2rem;
  border-top: 1px solid var(--line);
  animation: fade 1.2s ease 1.05s both;
}

.hero-lead {
  max-width: 46ch;
  color: var(--dim);
  font-size: clamp(1rem, 1.4vw, 1.2rem);
  font-weight: 300;
  line-height: 1.6;
}

.hero-aside {
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
}

.hero-facts {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem 2rem;
}

.fact dt {
  margin-bottom: 0.3rem;
  color: var(--faint);
}

.fact dd {
  font-size: 0.95rem;
  color: var(--text);
}

.scroll-cue {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  align-self: flex-start;
  margin-top: 2.5rem;
  color: var(--faint);
  transition: color 0.25s ease;
  animation: fade 1.2s ease 1.2s both;
}

.scroll-cue:hover {
  color: var(--text);
}

.cue-line {
  position: relative;
  width: 56px;
  height: 1px;
  background: var(--ghost);
  overflow: hidden;
}

.cue-line::after {
  content: '';
  position: absolute;
  inset: 0;
  background: var(--accent);
  transform: translateX(-100%);
  animation: cue 2.2s var(--ease) infinite;
}

@keyframes cue {
  40% { transform: translateX(0); }
  100% { transform: translateX(100%); }
}

@media (max-width: 900px) {
  .hero-bottom {
    grid-template-columns: 1fr;
    align-items: start;
  }

  .line-3 {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.6rem;
  }

  .hero-roles {
    align-self: flex-start;
    max-width: none;
    padding-bottom: 0;
  }
}

@media (max-width: 560px) {
  .hero-coords {
    display: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .word,
  .hero-roles,
  .hero-bottom,
  .scroll-cue {
    animation: none;
    clip-path: none;
    transform: none;
    opacity: 1;
  }

  .cue-line::after {
    animation: none;
    transform: translateX(0);
  }
}
</style>
