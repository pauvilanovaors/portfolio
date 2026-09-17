<script setup lang="ts">
import { onBeforeUnmount, onMounted } from 'vue'
import Lenis from 'lenis'
import SiteHeader from './components/SiteHeader.vue'
import HeroSection from './components/HeroSection.vue'
import TickerStrip from './components/TickerStrip.vue'
import ProfileSection from './components/ProfileSection.vue'
import ExperienceSection from './components/ExperienceSection.vue'
import ProjectsSection from './components/ProjectsSection.vue'
import SkillsSection from './components/SkillsSection.vue'
import EducationSection from './components/EducationSection.vue'
import ContactSection from './components/ContactSection.vue'

let lenis: Lenis | null = null
let rafId = 0
const cleanups: Array<() => void> = []

onMounted(() => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (!reduced) {
    lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })
    const raf = (time: number) => {
      lenis?.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)
  }

  // Route in-page anchors through Lenis for buttery section jumps.
  const onClick = (event: MouseEvent) => {
    const anchor = (event.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]')
    if (!anchor) return
    const hash = anchor.getAttribute('href') ?? ''
    if (hash.length <= 1) return
    const target = document.querySelector<HTMLElement>(hash)
    if (!target) return
    event.preventDefault()
    if (lenis) {
      lenis.scrollTo(target, { offset: -72 })
    } else {
      target.scrollIntoView({ block: 'start' })
    }
    target.setAttribute('tabindex', '-1')
    target.focus({ preventScroll: true })
  }
  document.addEventListener('click', onClick)
  cleanups.push(() => document.removeEventListener('click', onClick))
})

onBeforeUnmount(() => {
  cancelAnimationFrame(rafId)
  lenis?.destroy()
  cleanups.forEach((fn) => fn())
})
</script>

<template>
  <a class="skip-link" href="#profile">Skip to content</a>
  <SiteHeader />
  <main id="top">
    <HeroSection />
    <TickerStrip />
    <ProfileSection />
    <ExperienceSection />
    <ProjectsSection />
    <SkillsSection />
    <EducationSection />
    <ContactSection />
  </main>
</template>
