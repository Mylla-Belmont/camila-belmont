<script setup lang="ts">
import { ref } from "vue"
import Stars from "@/components/Stars.vue"

interface ProjectItem {
  id: number
  title: string
  description: string
  imageUrl: string
  tags: string[]
}

const projects: ProjectItem[] = [
  {
    id: 1,
    title: "Realm of Echoes",
    description:
      "An immersive dark fantasy RPG built with Unity, featuring a dynamic day-night cycle, procedurally generated dungeons, and a rich branching narrative system. Players shape the world through their choices in this single-player experience that blends exploration, combat, and deep lore.",
    imageUrl: "https://picsum.photos/seed/realm/600/400",
    tags: ["Unity", "C#", "Blender"],
  },
  {
    id: 2,
    title: "Pixel Frontier",
    description:
      "A retro-style 2D platformer that blends classic pixel art with modern game design. Featuring tight controls, hand-crafted levels, and an original chiptune soundtrack. Built from the ground up with GameMaker Studio and published on Steam Early Access.",
    imageUrl: "https://picsum.photos/seed/pixelfrontier/600/400",
    tags: ["GameMaker", "Aseprite"],
  },
  {
    id: 3,
    title: "Neon Drift",
    description:
      "A high-speed arcade racer set in a cyberpunk metropolis. Experience intense drift mechanics, dynamic weather systems, and a pulsating synthwave soundtrack. Developed in Unreal Engine 5 with custom Blueprint systems and nanite-optimized environments.",
    imageUrl: "https://picsum.photos/seed/neondrift/600/400",
    tags: ["Unreal Engine", "Blueprints"],
  },
  {
    id: 4,
    title: "Starlight Ballad",
    description:
      "A narrative-driven adventure game that explores themes of memory and identity through hand-painted visuals and an evocative orchestral score. Players unravel a deep mystery across beautifully illustrated environments, each with unique gameplay mechanics.",
    imageUrl: "https://picsum.photos/seed/starlight/600/400",
    tags: ["Unity", "Photoshop", "FMOD"],
  },
  {
    id: 5,
    title: "Void Construct",
    description:
      "A tactical sci-fi strategy game where players command a fleet of customizable starships. Features real-time combat with pause, deep ship customization, and a branching campaign with multiple endings. Developed in Godot 4 with custom shader effects.",
    imageUrl: "https://picsum.photos/seed/voidconstruct/600/400",
    tags: ["Godot", "GDScript", "Blender"],
  },
  {
    id: 6,
    title: "Whispering Tides",
    description:
      "An atmospheric puzzle game set in an abandoned underwater civilization. Solve environmental puzzles, uncover ancient lore, and restore life to the ocean depths. Created as a solo project over 18 months with original art and music.",
    imageUrl: "https://picsum.photos/seed/tides/600/400",
    tags: ["Unity", "Procreate", "FMOD"],
  },
]

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
      <Stars />
    </div>
    <v-container fluid class="pa-0 content-layer">
      <v-container class="px-5 px-md-16 py-0">
        <v-row class="header-row" align="start" justify="center">
          <v-col cols="12" class="text-center text-md-left mb-8 mb-md-12">
            <div class="custom-name text-secondary">Projects</div>
            <div class="custom-text text-secondary mt-2">
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
                <h3 class="card-title text-secondary">{{ project.title }}</h3>
                <p class="card-description text-secondary">
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
  z-index: 0;
}

.content-layer {
  position: relative;
  z-index: 1;
}

.custom-name {
  font-size: clamp(28px, 6vw, 40px);
  font-weight: 700;
  letter-spacing: 1.7px;
}

.custom-text {
  font-size: clamp(13px, 2vw, 14px);
  letter-spacing: 1.7px;
}

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
  background: rgba(255, 255, 255, 0.03) !important;
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
  -webkit-line-clamp: 2;
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

@media (min-width: 600px) {
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
</style>
