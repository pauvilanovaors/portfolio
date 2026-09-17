<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, ref, watch } from 'vue'
import { identity, projects, type GalleryImage } from '../data/profile'

interface LightboxState {
  images: GalleryImage[]
  index: number
}

const lightbox = ref<LightboxState | null>(null)
const closeButton = ref<HTMLButtonElement | null>(null)
let lastTrigger: HTMLElement | null = null

const currentImage = computed<GalleryImage | null>(() =>
  lightbox.value ? lightbox.value.images[lightbox.value.index] : null,
)

const pad = (n: number) => String(n).padStart(2, '0')

function openLightbox(images: GalleryImage[], index: number, event: MouseEvent) {
  lastTrigger = event.currentTarget instanceof HTMLElement ? event.currentTarget : null
  lightbox.value = { images, index }
}

function closeLightbox() {
  lightbox.value = null
}

function stepLightbox(direction: 1 | -1) {
  if (!lightbox.value) return
  const total = lightbox.value.images.length
  lightbox.value.index = (lightbox.value.index + direction + total) % total
}

function onKeydown(event: KeyboardEvent) {
  if (!lightbox.value) return
  if (event.key === 'Escape') {
    event.preventDefault()
    closeLightbox()
  } else if (event.key === 'ArrowRight') {
    event.preventDefault()
    stepLightbox(1)
  } else if (event.key === 'ArrowLeft') {
    event.preventDefault()
    stepLightbox(-1)
  }
}

watch(lightbox, async (state) => {
  document.documentElement.style.overflow = state ? 'hidden' : ''
  if (state) {
    window.addEventListener('keydown', onKeydown)
    await nextTick()
    closeButton.value?.focus()
  } else {
    window.removeEventListener('keydown', onKeydown)
    lastTrigger?.focus()
    lastTrigger = null
  }
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeydown)
  document.documentElement.style.overflow = ''
})
</script>

<template>
  <section id="projects" class="section" aria-labelledby="projects-title">
    <div class="wrap">
      <div class="section-head" v-reveal>
        <div>
          <p class="eyebrow">03 — Projects</p>
          <h2 id="projects-title" class="section-title">Things I’ve built<br />off the clock.</h2>
        </div>
        <p class="section-note">
          Hardware, firmware and mechanics — side projects with the same standard as the day job.
        </p>
      </div>

      <div class="projects">
        <article
          v-for="(project, i) in projects"
          :key="project.index"
          class="project"
          :class="{ 'project--featured': project.featured }"
          v-reveal="i * 80"
        >
          <div class="project-head">
            <span class="mono project-index">{{ project.index }}</span>
            <span class="mono project-tag">{{ project.tag }}</span>
          </div>

          <h3 class="project-title">{{ project.title }}</h3>
          <p class="project-desc">{{ project.description }}</p>

          <ul class="project-stack" aria-label="Technologies">
            <li v-for="tech in project.stack" :key="tech" class="mono">{{ tech }}</li>
          </ul>

          <ul class="project-links" aria-label="Repositories">
            <li v-for="link in project.links" :key="link.name">
              <a class="u-link mono" :href="link.url" target="_blank" rel="noopener noreferrer">
                {{ link.name }}
                <svg class="arrow" width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                  <path d="M1 9L9 1M9 1H2.5M9 1V7.5" stroke="currentColor" stroke-width="1.3" />
                </svg>
              </a>
            </li>
          </ul>

          <div v-if="project.gallery?.length" class="project-gallery">
            <p class="mono gallery-label">
              Build log — {{ pad(project.gallery.length) }} photos · click to enlarge
            </p>
            <div class="gallery-grid" role="list">
              <button
                v-for="(image, gi) in project.gallery"
                :key="image.src"
                type="button"
                class="gallery-item"
                role="listitem"
                :aria-label="`Enlarge photo ${gi + 1} of ${project.gallery.length}: ${image.caption}`"
                @click="openLightbox(project.gallery!, gi, $event)"
              >
                <img :src="image.src" :alt="image.alt" loading="lazy" decoding="async" />
                <span class="gallery-tag mono" aria-hidden="true">FIG.{{ pad(gi + 1) }}</span>
                <span class="gallery-caption mono" aria-hidden="true">{{ image.caption }}</span>
              </button>
            </div>
          </div>
        </article>
      </div>

      <div class="more" v-reveal>
        <a class="u-link more-link" :href="identity.github" target="_blank" rel="noopener noreferrer">
          More on GitHub
          <svg class="arrow" width="12" height="12" viewBox="0 0 10 10" fill="none" aria-hidden="true">
            <path d="M1 9L9 1M9 1H2.5M9 1V7.5" stroke="currentColor" stroke-width="1.3" />
          </svg>
        </a>
      </div>
    </div>

    <Teleport to="body">
      <Transition name="lb">
        <div
          v-if="lightbox && currentImage"
          class="lightbox"
          role="dialog"
          aria-modal="true"
          :aria-label="`Photo ${lightbox.index + 1} of ${lightbox.images.length}: ${currentImage.caption}`"
          @click.self="closeLightbox"
        >
          <button
            ref="closeButton"
            type="button"
            class="lb-close mono"
            aria-label="Close photo viewer"
            @click="closeLightbox"
          >
            ESC ✕
          </button>

          <button
            type="button"
            class="lb-nav lb-nav--prev"
            aria-label="Previous photo"
            @click="stepLightbox(-1)"
          >
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
              <path d="M14 3L6 11L14 19" stroke="currentColor" stroke-width="1.4" />
            </svg>
          </button>

          <figure class="lb-figure">
            <img :src="currentImage.src" :alt="currentImage.alt" />
            <figcaption class="lb-caption mono">
              <span>FIG.{{ pad(lightbox.index + 1) }} — {{ currentImage.caption }}</span>
              <span>{{ pad(lightbox.index + 1) }} / {{ pad(lightbox.images.length) }}</span>
            </figcaption>
          </figure>

          <button
            type="button"
            class="lb-nav lb-nav--next"
            aria-label="Next photo"
            @click="stepLightbox(1)"
          >
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
              <path d="M8 3L16 11L8 19" stroke="currentColor" stroke-width="1.4" />
            </svg>
          </button>
        </div>
      </Transition>
    </Teleport>
  </section>
</template>

<style scoped>
.projects {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  border-top: 1px solid var(--line);
  border-left: 1px solid var(--line);
}

.project {
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
  padding: clamp(1.8rem, 3.5vw, 3rem);
  border-right: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
  transition: background-color 0.3s ease;
}

.project:hover {
  background: var(--bg-raise);
}

.project--featured {
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: minmax(0, 1.2fr) minmax(0, 1fr);
  column-gap: clamp(2rem, 5vw, 5rem);
  align-content: start;
}

.project--featured .project-head,
.project--featured .project-title,
.project--featured .project-desc {
  grid-column: 1;
}

.project--featured .project-stack,
.project--featured .project-links {
  grid-column: 2;
}

.project-head {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
}

.project-index {
  color: var(--accent);
}

.project-tag {
  color: var(--faint);
  text-align: right;
}

.project-title {
  font-size: clamp(1.5rem, 2.6vw, 2.3rem);
  font-weight: 500;
  letter-spacing: -0.02em;
  line-height: 1.12;
}

.project-desc {
  max-width: 56ch;
  color: var(--dim);
  font-size: 0.98rem;
  line-height: 1.65;
}

.project-stack {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: auto;
}

.project-stack li {
  padding: 0.35rem 0.7rem;
  border: 1px solid var(--line);
  border-radius: 999px;
  color: var(--faint);
  font-size: 0.625rem;
}

.project-links {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem 1.5rem;
  padding-top: 0.6rem;
  border-top: 1px solid var(--line);
}

.project-links .u-link {
  color: var(--dim);
  font-size: 0.6875rem;
}

.project-links .u-link:hover {
  color: var(--text);
}

/* ---- Gallery ---- */

.project-gallery {
  grid-column: 1 / -1;
  margin-top: 0.6rem;
  padding-top: 1.8rem;
  border-top: 1px solid var(--line);
}

.gallery-label {
  color: var(--faint);
  font-size: 0.625rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  margin-bottom: 1rem;
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1px;
  background: var(--line);
  border: 1px solid var(--line);
}

.gallery-item {
  position: relative;
  display: block;
  padding: 0;
  border: 0;
  background: var(--bg);
  aspect-ratio: 4 / 5;
  overflow: hidden;
  cursor: zoom-in;
  text-align: left;
}

.gallery-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  filter: saturate(0.92);
  transition: transform 0.7s var(--ease), filter 0.7s var(--ease);
}

.gallery-item:hover img,
.gallery-item:focus-visible img {
  transform: scale(1.045);
  filter: saturate(1);
}

.gallery-tag {
  position: absolute;
  top: 0.6rem;
  left: 0.6rem;
  padding: 0.22rem 0.45rem;
  background: rgba(22, 21, 17, 0.78);
  color: var(--accent);
  font-size: 0.5625rem;
  letter-spacing: 0.12em;
  pointer-events: none;
}

.gallery-caption {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 0.5rem 0.6rem;
  background: rgba(22, 21, 17, 0.82);
  color: var(--dim);
  font-size: 0.5625rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  pointer-events: none;
}

/* ---- Lightbox ---- */

.lightbox {
  position: fixed;
  inset: 0;
  z-index: 300;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(22, 21, 17, 0.94);
  backdrop-filter: blur(6px);
  overscroll-behavior: contain;
}

.lb-figure {
  margin: 0;
  max-width: min(92vw, 1100px);
  display: flex;
  flex-direction: column;
  align-items: stretch;
}

.lb-figure img {
  max-width: 100%;
  max-height: 76vh;
  width: auto;
  height: auto;
  object-fit: contain;
  margin: 0 auto;
  border: 1px solid var(--line);
  background: #0c0b09;
}

.lb-caption {
  display: flex;
  justify-content: space-between;
  gap: 2rem;
  padding-top: 1rem;
  color: var(--dim);
  font-size: 0.6875rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.lb-close {
  position: fixed;
  top: 1.4rem;
  right: 1.6rem;
  padding: 0.55rem 0.9rem;
  border: 1px solid var(--line);
  background: transparent;
  color: var(--dim);
  font-size: 0.6875rem;
  letter-spacing: 0.14em;
  cursor: pointer;
  transition: color 0.25s ease, border-color 0.25s ease;
}

.lb-close:hover {
  color: var(--accent);
  border-color: var(--accent);
}

.lb-nav {
  position: fixed;
  top: 0;
  bottom: 0;
  width: clamp(56px, 12vw, 140px);
  display: flex;
  align-items: center;
  justify-content: center;
  border: 0;
  background: transparent;
  color: var(--ghost);
  cursor: pointer;
  transition: color 0.25s ease;
}

.lb-nav:hover {
  color: var(--accent);
}

.lb-nav--prev {
  left: 0;
}

.lb-nav--next {
  right: 0;
}

.lb-enter-active,
.lb-leave-active {
  transition: opacity 0.35s var(--ease);
}

.lb-enter-active .lb-figure,
.lb-leave-active .lb-figure {
  transition: transform 0.35s var(--ease), opacity 0.35s var(--ease);
}

.lb-enter-from,
.lb-leave-to {
  opacity: 0;
}

.lb-enter-from .lb-figure,
.lb-leave-to .lb-figure {
  transform: translateY(14px);
  opacity: 0;
}

.more {
  margin-top: 2.5rem;
  text-align: right;
}

.more-link {
  font-size: 1.05rem;
  font-weight: 500;
}

@media (max-width: 900px) {
  .projects {
    grid-template-columns: 1fr;
  }

  .project--featured {
    display: flex;
  }
}

@media (max-width: 640px) {
  .gallery-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .lb-caption {
    flex-direction: column;
    gap: 0.4rem;
  }
}
</style>
