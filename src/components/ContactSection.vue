<script setup lang="ts">
import { identity } from '../data/profile'

const year = new Date().getFullYear()
</script>

<template>
  <footer id="contact" class="section contact" aria-labelledby="contact-title">
    <div class="wrap">
      <p class="eyebrow" v-reveal>06 — Contact</p>

      <h2 id="contact-title" class="contact-title" v-reveal="60">
        Let’s build something<br />
        <em>reliable</em><span class="accent-dot">.</span>
      </h2>

      <p class="contact-note" v-reveal="120">
        Looking for embedded systems or robotics roles — but always happy to talk engineering.
      </p>

      <div class="contact-actions" v-reveal="160">
        <a
          class="mail-link"
          :href="`mailto:${identity.email}`"
          :aria-label="`Send an email to ${identity.name}`"
        >
          <span class="mail-text">{{ identity.email }}</span>
          <svg class="mail-arrow" width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M4 20L20 4M20 4H8M20 4V16" stroke="currentColor" stroke-width="1.5" />
          </svg>
        </a>

        <ul class="social-links">
          <li>
            <a class="u-link mono" :href="identity.linkedin" target="_blank" rel="noopener noreferrer">
              LinkedIn
              <svg class="arrow" width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                <path d="M1 9L9 1M9 1H2.5M9 1V7.5" stroke="currentColor" stroke-width="1.3" />
              </svg>
            </a>
          </li>
          <li>
            <a class="u-link mono" :href="identity.github" target="_blank" rel="noopener noreferrer">
              GitHub
              <svg class="arrow" width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                <path d="M1 9L9 1M9 1H2.5M9 1V7.5" stroke="currentColor" stroke-width="1.3" />
              </svg>
            </a>
          </li>
        </ul>
      </div>

      <div class="footer-bar mono">
        <span>© {{ year }} {{ identity.name }}</span>
        <span class="footer-mid">Designed & built with Vue 3 · TypeScript · Vite</span>
        <a class="u-link" href="#top">Back to top ↑</a>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.contact {
  padding-bottom: 2rem;
}

.contact-title {
  margin-top: 2rem;
  font-size: clamp(2.6rem, 8vw, 7rem);
  font-weight: 500;
  letter-spacing: -0.03em;
  line-height: 1;
  text-transform: uppercase;
}

.contact-title em {
  font-style: normal;
  color: var(--accent);
}

.accent-dot {
  color: var(--accent);
}

.contact-note {
  margin-top: 1.8rem;
  max-width: 44ch;
  color: var(--dim);
  font-size: 1.05rem;
}

.contact-actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 2rem 3.5rem;
  margin-top: 3rem;
  padding-block: 2.5rem;
  border-block: 1px solid var(--line);
}

.mail-link {
  display: inline-flex;
  align-items: center;
  gap: 1rem;
}

.mail-text {
  position: relative;
  font-size: clamp(1.15rem, 2.6vw, 1.9rem);
  font-weight: 500;
  letter-spacing: -0.01em;
}

.mail-text::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -4px;
  width: 100%;
  height: 1.5px;
  background: var(--accent);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.4s var(--ease);
}

.mail-link:hover .mail-text::after,
.mail-link:focus-visible .mail-text::after {
  transform: scaleX(1);
}

.mail-arrow {
  color: var(--accent);
  transition: transform 0.3s var(--ease);
}

.mail-link:hover .mail-arrow {
  transform: translate(4px, -4px);
}

.social-links {
  display: flex;
  gap: 2rem;
}

.social-links .u-link {
  color: var(--dim);
}

.social-links .u-link:hover {
  color: var(--text);
}

.footer-bar {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 0.8rem 2rem;
  margin-top: 2.5rem;
  color: var(--faint);
}

.footer-bar .u-link {
  color: var(--dim);
}

.footer-bar .u-link:hover {
  color: var(--text);
}

@media (max-width: 720px) {
  .footer-mid {
    display: none;
  }
}
</style>
