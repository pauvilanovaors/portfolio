/**
 * Single source of truth for all portfolio content.
 * Every fact here is drawn from Pau's CV and public GitHub account.
 * Edit this file to update the site — components stay untouched.
 */

export const identity = {
  name: 'Pau Vilanova Ors',
  firstName: 'Pau',
  lastName: 'Vilanova',
  secondSurname: 'Ors',
  roles: ['Electronic Engineer', 'Software Developer', 'Product Owner'],
  location: 'Barcelona, ES',
  coordinates: '41.3874° N, 2.1686° E',
  email: 'pauvilanova888@gmail.com',
  linkedin: 'https://www.linkedin.com/in/pau-vilanova-ors/',
  github: 'https://github.com/pauvilanovaors',
  status: 'Open to opportunities',
}

export const heroLead =
  'Four years building embedded and validation software for automotive test equipment. One year in Munich. Today I split my time between writing code and owning products — and I want my next chapter in embedded systems or robotics.'

export interface Fact {
  label: string
  value: string
}

export const heroFacts: Fact[] = [
  { label: 'Focus', value: 'Embedded systems & robotics' },
  { label: 'Based in', value: 'Barcelona, ES' },
  { label: 'Experience', value: '4+ yrs, automotive test' },
  { label: 'Status', value: 'Open to opportunities' },
]

export const profileStatement =
  'I build embedded systems end to end — from VHDL and ARM Cortex-M firmware to the product decisions that ship them.'

export const profileParagraphs: string[] = [
  'I’m an electronic engineer who has spent four years developing embedded and validation software for automotive test equipment at Technica. I started writing Python test cases and VHDL for FPGA-based boards, moved to Munich to work on software architecture for automotive test tools, and came back to own several products end to end.',
  'That path means I’m comfortable anywhere between a register map and a roadmap: coordinating hardware, software and validation teams through a release, then sitting with customers and suppliers as their technical point of contact. Lately I’ve been going deep on AI tooling — agents, automation and MCP — because it makes small teams ship like big ones.',
]

export const profileFacts: Fact[] = [
  { label: '01 / Field', value: 'Automotive test systems' },
  { label: '02 / Range', value: 'HW · SW · validation' },
  { label: '03 / Degree', value: 'MSc Electronic Engineering' },
  { label: '04 / Now learning', value: 'AI agents & automation' },
]

export interface Experience {
  period: string
  role: string
  company: string
  location: string
  current?: boolean
  points: string[]
}

export const experience: Experience[] = [
  {
    period: '2026 — Present',
    role: 'Embedded Software Engineer · Product Owner',
    company: 'Technica Electronics',
    location: 'Barcelona, ES',
    current: true,
    points: [
      'Own several products end to end, coordinating hardware, software and validation teams through each release.',
      'Handle customer support and act as technical point of contact with suppliers and customers.',
      'Split time between writing code and product management.',
    ],
  },
  {
    period: '2024 — 2025',
    role: 'Embedded Software Engineer',
    company: 'Technica Engineering GmbH',
    location: 'Munich, DE',
    points: [
      'Contributed to software architecture decisions for automotive test tools.',
      'Led and mentored a small development team — code reviews and task coordination.',
    ],
  },
  {
    period: '2022 — 2024',
    role: 'Testing · FPGA · Embedded Software Engineer',
    company: 'Technica Electronics',
    location: 'Barcelona, ES',
    points: [
      'Wrote Python test cases for product validation, run inside a full GitLab CI/CD pipeline.',
      'Implemented hardware description logic in VHDL for FPGA-based boards.',
      'Developed embedded firmware for ARM Cortex-M microcontrollers.',
    ],
  },
]

export interface RepoLink {
  name: string
  url: string
}

export interface GalleryImage {
  src: string
  alt: string
  caption: string
}

export interface Project {
  index: string
  title: string
  tag: string
  description: string
  stack: string[]
  links: RepoLink[]
  featured?: boolean
  gallery?: GalleryImage[]
}

const gh = identity.github

export const projects: Project[] = [
  {
    index: 'P—01',
    title: 'Autonomous Transporter Robot',
    tag: 'Robotics — firmware · hardware · mechanics',
    description:
      'A complete mobile robotics platform: C firmware for the base robot and its transport platform, custom PCB hardware including a VL53Lx time-of-flight sensor connector board, and a lifting stage designed in SOLIDWORKS. Built alongside my degree — the project where hardware, firmware and mechanics meet.',
    stack: ['C', 'Embedded', 'PCB design', 'SOLIDWORKS', 'ToF sensing'],
    links: [
      { name: 'Software_BaseRobot', url: `${gh}/Software_BaseRobot` },
      { name: 'Software_TransporterPlatform', url: `${gh}/Software_TransporterPlatform` },
      { name: 'HW_projects', url: `${gh}/HW_projects` },
      { name: 'lifterStage_3D_Designs', url: `${gh}/lifterStage_3D_Designs` },
      { name: 'Video_DEMO', url: `${gh}/Video_DEMO` },
    ],
    featured: true,
    gallery: [
      {
        src: '/images/transporter/transporter-01.webp',
        alt: 'Top view of the robot chassis bay: STM32 Nucleo board on a custom copper PCB, stepper drivers, battery and wiring.',
        caption: 'Chassis bay — MCU, drivers, battery',
      },
      {
        src: '/images/transporter/transporter-02.webp',
        alt: 'Close-up of the custom control board with the STM32 Nucleo, stepper drivers and red emergency-stop button.',
        caption: 'Control board & E-stop',
      },
      {
        src: '/images/transporter/transporter-03.webp',
        alt: 'First wooden prototype of the scissor-lift stage with a stepper motor and lead screw, on a workbench.',
        caption: 'First lift prototype',
      },
      {
        src: '/images/transporter/transporter-04.webp',
        alt: 'Detail of the lift drive: NEMA stepper motor, 3D-printed gear reduction and lead screw with bearing blocks.',
        caption: 'Lead-screw lift drive',
      },
      {
        src: '/images/transporter/transporter-05.webp',
        alt: 'Painted black chassis with scissor lift and mecanum wheels during workshop assembly.',
        caption: 'Painted chassis, workshop fit-out',
      },
      {
        src: '/images/transporter/transporter-06.webp',
        alt: 'Finished autonomous transporter robot, side view: black base on mecanum wheels with the lift raised.',
        caption: 'Final assembly',
      },
      {
        src: '/images/transporter/transporter-07.webp',
        alt: 'Finished robot from the front with the lifting platform fully raised.',
        caption: 'Platform raised — front',
      },
      {
        src: '/images/transporter/transporter-08.webp',
        alt: 'Three-quarter view of the finished robot with the lift raised and the control board mounted on the platform.',
        caption: 'Full lift, mecanum base',
      },
    ],
  },
  {
    index: 'P—02',
    title: 'TUM Embedded Systems',
    tag: 'Coursework — low-level C',
    description:
      'Low-level C labs and assignments from my Erasmus+ exchange at the Technical University of Munich — bare-metal thinking, close to the hardware.',
    stack: ['C', 'Bare metal', 'TUM'],
    links: [{ name: 'TUM_EmbeddedSystems', url: `${gh}/TUM_EmbeddedSystems` }],
  },
  {
    index: 'P—03',
    title: 'This Website',
    tag: 'Web — designed & built from scratch',
    description:
      'The site you’re reading: Vue 3, TypeScript and Vite. No template, no page builder — design system, motion and content model written by hand.',
    stack: ['Vue 3', 'TypeScript', 'Vite'],
    links: [{ name: 'Source code', url: `${gh}/portfolio` }],
  },
]

export interface SkillGroup {
  index: string
  label: string
  items: string[]
}

export const skillGroups: SkillGroup[] = [
  {
    index: 'S—01',
    label: 'Embedded & Hardware',
    items: ['C', 'C++', 'Rust', 'ARM Cortex-M', 'FPGA · VHDL', 'PCB design'],
  },
  {
    index: 'S—02',
    label: 'Web & Software',
    items: ['Python', 'JavaScript · TypeScript', 'Vue.js', 'React', 'Tauri'],
  },
  {
    index: 'S—03',
    label: 'AI & Automation',
    items: ['AI agents', 'Claude Code', 'n8n', 'MCP'],
  },
  {
    index: 'S—04',
    label: 'Networking',
    items: ['Ethernet', 'Switches', 'TCP/IP', 'Linux networking'],
  },
  {
    index: 'S—05',
    label: 'Tools & Methods',
    items: ['Git · GitHub', 'GitLab CI/CD', 'Linux', 'Docker'],
  },
  {
    index: 'S—06',
    label: 'Project Management',
    items: ['Agile · Scrum', 'Team leadership', 'Task coordination'],
  },
]

export interface Education {
  period: string
  degree: string
  school: string
  place: string
}

export const education: Education[] = [
  {
    period: '2023 — 2026',
    degree: 'MSc Electronic Engineering',
    school: 'Universitat Politècnica de Catalunya (UPC)',
    place: 'Barcelona, ES',
  },
  {
    period: '2024 — 2025',
    degree: 'Erasmus+ Exchange — Master',
    school: 'Technical University of Munich (TUM)',
    place: 'Munich, DE',
  },
  {
    period: '2019 — 2023',
    degree: 'BSc Electronic Engineering & Telecommunications',
    school: 'Universitat Politècnica de Catalunya (UPC)',
    place: 'Barcelona, ES',
  },
]

export interface Certification {
  name: string
  issuer: string
  year: string
}

export const certifications: Certification[] = [
  { name: 'Claude Code: The Practical Guide', issuer: 'Udemy', year: '2026' },
  { name: 'AI Agents with Make, Zapier & n8n', issuer: 'Udemy', year: '2026' },
  { name: 'Complete Generative AI Course', issuer: 'Udemy', year: '2025' },
  { name: 'Scrum Master & Product Owner', issuer: 'Udemy', year: '2025' },
  { name: 'Rust: Complete Developer’s Guide', issuer: 'Udemy', year: '2025' },
  { name: 'ARM Assembly Language', issuer: 'Udemy', year: '2024' },
  { name: 'SOLIDWORKS Associate (CSWA)', issuer: 'UPC', year: '2022' },
]

export interface Language {
  code: string
  name: string
  level: string
}

export const languages: Language[] = [
  { code: 'CA', name: 'Catalan', level: 'Native' },
  { code: 'ES', name: 'Spanish', level: 'Native' },
  { code: 'EN', name: 'English', level: 'C1' },
  { code: 'DE', name: 'German', level: 'B1' },
]

export const tickerItems: string[] = [
  'C / C++',
  'Rust',
  'VHDL',
  'FPGA',
  'ARM Cortex-M',
  'Ethernet',
  'TCP/IP',
  'Python',
  'Vue.js',
  'Tauri',
  'Docker',
  'GitLab CI/CD',
  'AI agents',
  'n8n',
  'Scrum',
  'PCB design',
]
