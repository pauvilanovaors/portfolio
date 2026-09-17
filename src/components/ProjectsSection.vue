<script setup lang="ts">
import { identity, projects } from '../data/profile'
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
</style>
