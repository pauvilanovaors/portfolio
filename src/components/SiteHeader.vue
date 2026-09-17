<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { identity } from '../data/profile'

const links = [
  { id: 'profile', label: 'Profile' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
]

const scrolled = ref(false)
const hidden = ref(false)
const menuOpen = ref(false)

let lastY = 0
let ticking = false

function update() {
  const y = window.scrollY
  scrolled.value = y > 32
  hidden.value = y > lastY && y > 420 && !menuOpen.value
  lastY = y
  ticking = false
}

function onScroll() {
  if (!ticking) {
    ticking = true
    requestAnimationFrame(update)
  }
}

function toggleMenu() {
  menuOpen.value = !menuOpen.value
  document.body.style.overflow = menuOpen.value ? 'hidden' : ''
}

function closeMenu() {
  menuOpen.value = false
  document.body.style.overflow = ''
}

onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  document.body.style.overflow = ''
})
</script>

<template>
  <header
    class="site-header"
    :class="{ 'is-scrolled': scrolled, 'is-hidden': hidden, 'is-open': menuOpen }"
  >
    <div class="header-inner wrap">
      <a href="#top" class="brand" aria-label="Pau Vilanova Ors — back to top" @click="closeMenu">
        <span class="brand-mark" aria-hidden="true">
          <i /><i /><i />
        </span>
        <span class="brand-text">Pau Vilanova Ors</span>
      </a>

      <nav class="header-nav" aria-label="Primary">
        <a v-for="(link, i) in links" :key="link.id" :href="`#${link.id}`" class="nav-link">
          <span class="nav-index" aria-hidden="true">0{{ i + 1 }}</span>
          {{ link.label }}
        </a>
      </nav>

      <a class="status mono" href="#contact">
        <span class="status-dot" aria-hidden="true" />
        {{ identity.status }}
      </a>

      <button
        class="menu-btn"
        type="button"
        :aria-expanded="menuOpen"
        aria-controls="mobile-nav"
        aria-label="Toggle navigation menu"
        @click="toggleMenu"
      >
        <span class="menu-line" aria-hidden="true" />
        <span class="menu-line" aria-hidden="true" />
      </button>
    </div>

    <div v-show="menuOpen" id="mobile-nav" class="mobile-nav">
      <nav aria-label="Mobile">
        <a
          v-for="(link, i) in links"
          :key="link.id"
          :href="`#${link.id}`"
          class="mobile-link"
          @click="closeMenu"
        >
          <span class="mono" aria-hidden="true">0{{ i + 1 }}</span>
          {{ link.label }}
        </a>
      </nav>
      <p class="mobile-foot mono">{{ identity.location }} — {{ identity.email }}</p>
    </div>
  </header>
</template>

<style scoped>
.site-header {
  position: fixed;
  inset: 0 0 auto 0;
  z-index: 100;
  transition:
    transform 0.45s var(--ease),
    background-color 0.35s ease,
    border-color 0.35s ease;
  border-bottom: 1px solid transparent;
}

.site-header.is-scrolled {
  background: rgba(22, 21, 17, 0.82);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border-bottom-color: var(--line);
}

.site-header.is-hidden {
  transform: translateY(-100%);
}

.header-inner {
  display: flex;
  align-items: center;
  gap: 2rem;
  height: 72px;
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 0.65rem;
  font-weight: 600;
  font-size: 0.95rem;
  letter-spacing: 0.01em;
}

.brand-mark {
  display: inline-flex;
  align-items: flex-end;
  gap: 2px;
  height: 14px;
}

.brand-mark i {
  width: 3px;
  background: var(--accent);
}

.brand-mark i:nth-child(1) { height: 7px; }
.brand-mark i:nth-child(2) { height: 14px; }
.brand-mark i:nth-child(3) { height: 10px; opacity: 0.55; }

.header-nav {
  display: flex;
  gap: 1.6rem;
  margin-left: auto;
}

.nav-link {
  display: inline-flex;
  align-items: baseline;
  gap: 0.4rem;
  font-family: var(--font-mono);
  font-size: 0.6875rem;
  font-weight: 500;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--dim);
  transition: color 0.25s ease;
}

.nav-index {
  color: var(--accent);
  font-size: 0.5625rem;
}

.nav-link:hover {
  color: var(--text);
}

.status {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.45rem 0.85rem;
  border: 1px solid var(--line);
  border-radius: 999px;
  color: var(--dim);
  font-size: 0.625rem;
  transition:
    color 0.25s ease,
    border-color 0.25s ease;
}

.status:hover {
  color: var(--text);
  border-color: var(--ghost);
}

.status-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--accent);
  animation: pulse 2.2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { box-shadow: 0 0 0 0 var(--accent-soft); opacity: 1; }
  50% { box-shadow: 0 0 0 5px var(--accent-soft); opacity: 0.75; }
}

.menu-btn {
  display: none;
  position: relative;
  width: 40px;
  height: 40px;
  margin-left: auto;
}

.menu-line {
  position: absolute;
  left: 8px;
  width: 24px;
  height: 1.5px;
  background: var(--text);
  transition:
    transform 0.35s var(--ease),
    top 0.35s var(--ease);
}

.menu-line:nth-child(1) { top: 15px; }
.menu-line:nth-child(2) { top: 24px; }

.is-open .menu-line:nth-child(1) {
  top: 19px;
  transform: rotate(45deg);
}

.is-open .menu-line:nth-child(2) {
  top: 19px;
  transform: rotate(-45deg);
}

.mobile-nav {
  position: fixed;
  inset: 72px 0 0 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 2.5rem var(--pad) 2rem;
  background: var(--bg);
  border-top: 1px solid var(--line);
}

.mobile-link {
  display: flex;
  align-items: baseline;
  gap: 1rem;
  padding: 0.85rem 0;
  font-size: clamp(1.8rem, 7vw, 2.6rem);
  font-weight: 500;
  letter-spacing: -0.02em;
  border-bottom: 1px solid var(--line);
}

.mobile-link .mono {
  color: var(--accent);
}

.mobile-foot {
  color: var(--faint);
}

@media (max-width: 1060px) {
  .header-nav {
    display: none;
  }

  .status {
    margin-left: auto;
  }

  .menu-btn {
    display: block;
    margin-left: 0;
  }
}

@media (max-width: 560px) {
  .status {
    display: none;
  }

  .menu-btn {
    margin-left: auto;
  }
}

@media (prefers-reduced-motion: reduce) {
  .status-dot {
    animation: none;
  }
}
</style>
