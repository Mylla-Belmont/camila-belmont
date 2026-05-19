<script setup lang="ts">
import { ref } from "vue"
import Moon from "@/components/Moon.vue"
import Neptune from "@/components/Neptune.vue"
import vector6 from "@/assets/Vector 6@2x.svg";
import Stars from "@/components/Stars.vue";

const projectModules = import.meta.glob<{ default: string }>(
  "@/assets/projects/*",
  { eager: true }
)

interface ProjectItem {
  id: number
  title: string
  description: string
  imageUrl: string
  tags: string[]
}

const projectData: { title: string; description: string; tags: string[] }[] = [
  {
    title: "Brazumbus",
    description:
      "Brazumbus is a 2D action platformer where the player takes control of Fazzio Elison, a former elite soldier who once served in the Brazilian army and acted as the president’s right-hand man. The story takes place in Brasília, now devastated by a zombie outbreak that has turned the city into an apocalyptic battlefield.",
    tags: ["Personal Project", "Prototype", "Desktop"],
  },
  {
    title: "Killer Gominho",
    description:
      "Killer Gominho is an ongoing project created as the starting point for the semester-long Game Development course promoted by the PET-TI program at the Federal University of Ceará. The game follows a simple proposal involving platform design, characters, gameplay, and other core aspects. Below is a simple GDD created during a meeting, and updates will be added here as the project evolves.",
    tags: ["Personal Project", "Prototype", "Desktop"],
  },
  {
    title: "Fighting Game — Naruto",
    description:
      "This project was created to practice and expand the knowledge acquired during the Fundamentals of Databases course, while also improving programming skills in Java and database relationship modeling. It is a simple game without a graphical interface, allowing the player to battle against the computer through a randomized opponent system.",
    tags: ["Personal Project", "Programming", "Java", "PostgreSQL"],
  },
  {
    title: "Dots Game",
    description:
      "This project was developed as the final assignment for the Fundamentals of Programming course during the first semester of the Information Systems degree. The game is relatively simple and does not feature a graphical interface, relying only on minimal visual elements. All of its logic was implemented using the C programming language.",
    tags: ["Personal Project", "Programming", "C"],
  },
  {
    title: "The Suspect of House 187",
    description:
      "The Suspect of House 187 is an escape room game with a mysterious atmosphere designed to evoke feelings of tension and distress among players aged 16 to 25. It consists of a physical map used to locate the main character, cards with different objectives (object cards, photographs, actions, rescue cards, among others), and a digital QR code scanning system essential for identifying card content and creating an immersive mysterious atmosphere throughout the experience.",
    tags: ["Personal Project", "Board Game"],
  },
  {
    title: "Migratory Birds",
    description:
      "Migratory Birds marked my first mobile game prototype, created with the goal of participating in the Change the Game challenge promoted by Google in 2019. With this modest project — developed in just a few days and entirely designed and assembled on a mobile phone — I earned an Honorable Mention at the end of the competition.",
    tags: ["Personal Project", "Prototype", "Mobile"],
  },
]

const projectImages = Object.entries(projectModules)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([, module]) => module.default)

const projects: ProjectItem[] = projectData.map((data, index) => ({
  id: index + 1,
  title: data.title,
  description: data.description,
  imageUrl: projectImages[index] ?? "",
  tags: data.tags,
}))

const dialogOpen = ref(false)
const selectedProject = ref<ProjectItem | null>(null)

function openProject(project: ProjectItem) {
  selectedProject.value = project
  dialogOpen.value = true
}

function closeDialog() {
  dialogOpen.value = false
}
</script>

<template>
  <section id="projects" class="projects-section">
    <div class="scenery-layer">
      <Moon />
      <Neptune />
    </div>
    <div class="scenery-vector-6">
      <img :src="vector6" alt="Background Scene" />
    </div>

    <v-container fluid class="pa-0 content-layer">
      <v-container class="px-5 px-md-16 py-0">
        <Stars />

        <v-row class="header-row" align="start" justify="center">
          <v-col cols="12" class="text-center text-md-left mb-6 mb-md-10">
            <div class="custom-name text-primary">Projects</div>
            <div class="custom-text text-primary mt-2">
              Games, apps, and creative experiments
            </div>
          </v-col>
        </v-row>

        <v-row class="projects-row" justify="center">
          <v-col v-for="project in projects" :key="project.id" cols="12" sm="6" class="d-flex">
            <v-card class="project-card" elevation="0" @click="openProject(project)">
              <div class="card-image-wrapper">
                <img :src="project.imageUrl" :alt="project.title" class="card-image" loading="lazy" />
                <div class="card-chip-overlay">
                  <v-chip size="x-small" variant="flat" class="overlay-chip" label>
                    {{ project.tags[0] }}
                  </v-chip>
                </div>
              </div>
              <v-card-text class="card-body">
                <h3 class="card-title text-primary">{{ project.title }}</h3>
                <p class="card-description text-primary">
                  {{ project.description }}
                </p>
                <div class="card-tags-row">
                  <v-chip v-for="tag in project.tags" :key="tag" size="x-small" variant="outlined" class="tag-chip"
                    label>
                    {{ tag }}
                  </v-chip>
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-container>

    <v-dialog v-model="dialogOpen" max-width="800" transition="dialog-bottom-transition">
      <v-card v-if="selectedProject" class="dialog-card" elevation="0" color="#111">
        <v-btn icon variant="text" class="dialog-close-btn" @click="closeDialog">
          <v-icon color="secondary" size="28">mdi-close</v-icon>
        </v-btn>
        <div class="dialog-layout">
          <div class="dialog-image-container">
            <img :src="selectedProject.imageUrl" :alt="selectedProject.title" class="dialog-image" />
          </div>
          <div class="dialog-body">
            <h2 class="dialog-title text-secondary">
              {{ selectedProject.title }}
            </h2>
            <div class="dialog-tags mb-4">
              <v-chip v-for="tag in selectedProject.tags" :key="tag" size="small" variant="outlined" class="tag-chip"
                label>
                {{ tag }}
              </v-chip>
            </div>
            <p class="dialog-description text-secondary">
              {{ selectedProject.description }}
            </p>
          </div>
        </div>
      </v-card>
    </v-dialog>
  </section>
</template>

<style scoped>
/* ============================================================
   1. SEÇÃO PRINCIPAL E CENÁRIO
   ============================================================ */
.projects-section {
  position: relative;
  min-height: 100vh;
  width: 100%;
  overflow: hidden;
}

.scenery-layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.scenery-vector-6 {
  position: absolute;
  top: 0px;
  left: 0;
  width: 100%;
  max-width: 700px;
  pointer-events: none;
}

.scenery-vector-6 img {
  width: 50%;
  height: auto;
}

.content-layer {
  position: relative;
  z-index: 1;
}

/* ============================================================
   2. CABEÇALHO
   ============================================================ */
.custom-name {
  font-size: clamp(24px, 5vw, 32px);
  letter-spacing: 1.2px;
  font-weight: 700;
}

.custom-text {
  font-size: clamp(12px, 1.8vw, 15px);
  letter-spacing: 1px;
  line-height: 1.7;
  font-weight: 400;
}

/* ============================================================
   3. CARDS DE PROJETOS
   ============================================================ */
.projects-row {
  animation: fadeSlideIn 1.2s ease-out;
}

@keyframes fadeSlideIn {
  from {
    opacity: 0;
    transform: translateY(40px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.project-card {
  background: rgba(255, 255, 255, 255) !important;
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 16px !important;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  width: 100%;
  backdrop-filter: blur(8px);
}

.project-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.4);
}

.card-image-wrapper {
  position: relative;
  width: 100%;
  aspect-ratio: 3 / 2;
  overflow: hidden;
}

.card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.project-card:hover .card-image {
  transform: scale(1.05);
}

.card-chip-overlay {
  position: absolute;
  top: 10px;
  left: 10px;
}

.overlay-chip {
  background: rgba(0, 209, 178, 0.15) !important;
  color: #00d1b2 !important;
  font-weight: 600 !important;
  font-size: 11px !important;
  letter-spacing: 0.5px;
  backdrop-filter: blur(4px);
  border: 1px solid rgba(0, 209, 178, 0.25);
}

.card-body {
  padding: 14px 16px 16px !important;
}

.card-title {
  font-size: clamp(16px, 2vw, 18px);
  font-weight: 600;
  letter-spacing: 0.5px;
  margin-bottom: 6px;
}

.card-description {
  font-size: clamp(12px, 1.4vw, 13px);
  letter-spacing: 0.4px;
  line-height: 1.6;
  opacity: 0.7;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-bottom: 10px;
}

.card-tags-row {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.tag-chip {
  font-weight: 500 !important;
  font-size: 10px !important;
  letter-spacing: 0.5px;
  border-color: rgba(88, 166, 255, 0.3) !important;
  color: #58a6ff !important;
  height: 22px !important;
}

/* ============================================================
   4. MODAL DE PREVIEW (v-dialog)
   ============================================================ */
.dialog-card {
  border-radius: 16px !important;
  overflow: hidden;
  position: relative;
}

.dialog-close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 10;
  background: rgba(0, 0, 0, 0.5) !important;
  backdrop-filter: blur(4px);
}

.dialog-layout {
  display: flex;
  flex-direction: column;
}

.dialog-image-container {
  width: 100%;
  max-height: 360px;
  overflow: hidden;
}

.dialog-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.dialog-body {
  padding: 24px;
}

.dialog-title {
  font-size: clamp(22px, 4vw, 28px);
  font-weight: 700;
  letter-spacing: 1px;
  margin-bottom: 12px;
}

.dialog-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.dialog-description {
  font-size: clamp(14px, 1.6vw, 15px);
  letter-spacing: 0.5px;
  line-height: 1.8;
  opacity: 0.85;
}

/* ============================================================
   5. RESPONSIVIDADE
   ============================================================ */
@media (min-width: 480px) {
  .projects-section {
    position: relative;
    min-height: 100vh;
    width: 100%;
    overflow: hidden;
  }

  .scenery-layer {
    position: absolute;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 1;
  }

  .scenery-vector-6 {
    position: absolute;
    top: 0px;
    left: 0;
    width: 100%;
    max-width: 700px;
    pointer-events: none;
  }

  .scenery-vector-6 img {
    width: 50%;
    height: auto;
  }

  .dialog-layout {
    flex-direction: row;
  }

  .dialog-image-container {
    flex: 0 0 45%;
    max-height: none;
    min-height: 300px;
  }

  .dialog-body {
    flex: 1;
    padding: 32px;
  }
}

@media (max-width: 959px) {
  .scenery-vector-6 {
    width: 60%;
  }

  .scenery-vector-6 img {
    width: 60%;
  }
}
</style>
