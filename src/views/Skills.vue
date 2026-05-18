<template>
  <div id="skills" class="skills-wrapper">
    <div class="scenery-layer organic-background skills-section">
      <Stars />
      <Venus />
    </div>

    <v-container fluid class="pa-0 content-layer">
      <v-container class="px-5 px-md-6 py-0">
        <v-row class="fill-height" align="start" justify="end">
          <v-col cols="12" sm="11" md="8" lg="7" class="d-flex flex-column custom-align-col">

            <div class="formation-name text-primary mb-6 mb-md-8">Skills</div>

            <div class="skills-grid">

              <div class="skill-group">
                <div class="skill-subtitle text-primary mb-3">
                  <v-icon icon="mdi-palette" class="mr-2" size="small" />Illustration & Games
                </div>
                <div class="chips-wrapper">
                  <v-chip variant="outlined" class="skill-chip design-chip">Figma</v-chip>
                  <v-chip variant="outlined" class="skill-chip design-chip">Photoshop</v-chip>
                  <v-chip variant="outlined" class="skill-chip design-chip">Illustrator</v-chip>
                  <v-chip variant="outlined" class="skill-chip design-chip">Sketch</v-chip>
                  <v-chip variant="outlined" class="skill-chip game-chip">Unity</v-chip>
                  <v-chip variant="outlined" class="skill-chip game-chip">Godot</v-chip>
                </div>
              </div>

              <div class="skill-group">
                <div class="skill-subtitle text-primary mb-3">
                  <v-icon icon="mdi-xml" class="mr-2" size="small" />Software Engineering
                </div>
                <div class="chips-wrapper">
                  <v-chip variant="outlined" class="skill-chip lang-chip">JavaScript</v-chip>
                  <v-chip variant="outlined" class="skill-chip lang-chip">TypeScript</v-chip>
                  <v-chip variant="outlined" class="skill-chip frontend-chip">HTML</v-chip>
                  <v-chip variant="outlined" class="skill-chip frontend-chip">CSS</v-chip>
                  <v-chip variant="outlined" class="skill-chip frontend-chip">Vue.js</v-chip>
                  <v-chip variant="outlined" class="skill-chip frontend-chip">Vuetify</v-chip>
                  <v-chip variant="outlined" class="skill-chip frontend-chip">React</v-chip>
                  <v-chip variant="outlined" class="skill-chip backend-chip">Node.js</v-chip>
                  <v-chip variant="outlined" class="skill-chip backend-chip">Spring Boot</v-chip>
                  <v-chip variant="outlined" class="skill-chip backend-chip">REST APIs</v-chip>
                  <v-chip variant="outlined" class="skill-chip database-chip">PostgreSQL</v-chip>
                  <v-chip variant="outlined" class="skill-chip methodology-chip">Scrum</v-chip>
                  <v-chip variant="outlined" class="skill-chip methodology-chip">Trello</v-chip>
                </div>
              </div>

            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-container>

    <Rocket :progress="scrollProgress" :base-width="rocketBaseWidth" class="free-rocket" />
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted, computed } from "vue";
import Stars from "@/components/Stars.vue";
import Venus from "@/components/Venus.vue";
import Rocket from "@/components/Rocket.vue";

const scrollProgress = ref(0);
const windowWidth = ref(typeof window !== "undefined" ? window.innerWidth : 1024);
let sectionElement: HTMLElement | null = null;

const rocketBaseWidth = computed(() => {
  const w = windowWidth.value;
  if (w < 481) return 45;
  if (w < 960) return 65;
  return 90;
});

const calculateScroll = () => {
  if (!sectionElement) return;

  const rect = sectionElement.getBoundingClientRect();
  const windowHeight = window.innerHeight;

  const totalHeight = rect.height + windowHeight;
  const scrolled = windowHeight - rect.top;

  let progress = scrolled / totalHeight;
  progress = Math.max(0, Math.min(1, progress));

  scrollProgress.value = progress;
};

const handleResize = () => {
  windowWidth.value = window.innerWidth;
};

onMounted(() => {
  sectionElement = document.querySelector(".skills-section");
  window.addEventListener("scroll", calculateScroll, { passive: true });
  window.addEventListener("resize", handleResize);
  calculateScroll();
});

onUnmounted(() => {
  window.removeEventListener("scroll", calculateScroll);
  window.removeEventListener("resize", handleResize);
});
</script>

<style scoped>
.skills-wrapper,
.relative-container {
  overflow: hidden;
  max-width: 100vw;
}

.skills-wrapper {
  position: relative;
  width: 100%;
}

/* --- CAMADA DO CENÁRIO (PRESERVADA) --- */
.scenery-layer {
  width: 100%;
}

.organic-background {
  background-image: url("@/assets/Vector 3@2x.svg");
  background-size: contain;
  background-position: left center;
  background-repeat: no-repeat;
  margin-top: 25vh;
  padding-bottom: 120px;
  min-height: 100vh;

  -webkit-mask-image: url("@/assets/Vector 3@2x.svg");
  mask-image: url("@/assets/Vector 3@2x.svg");
  -webkit-mask-size: contain;
  mask-size: contain;
  -webkit-mask-position: left center;
  mask-position: left center;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;

  overflow: hidden;
}

/* --- CAMADA DO CONTEÚDO (Isolada para evitar cortes) --- */
.content-layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 2;
}

.custom-align-col {
  pointer-events: auto;
}

.free-rocket {
  position: absolute !important;
  z-index: 10;
  pointer-events: none;
}

/* --- REGRAS DE GRID --- */
.skills-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  width: 100%;
}

.skill-group {
  display: flex;
  flex-direction: column;
}

.skill-subtitle {
  font-size: clamp(14px, 1.6vw, 16px);
  font-weight: 600;
  letter-spacing: 1.2px;
  text-transform: uppercase;
  opacity: 0.95;
}

.chips-wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: flex-start;
}

/* --- AJUSTE DISPOSITIVOS MÉDIOS (TABLETS) --- */
@media (min-width: 481px) and (max-width: 959px) {
  .organic-background {
    background-size: 100% auto;
    -webkit-mask-size: 55% auto;
    mask-size: 55% auto;
    background-position: left top;
    margin-top: 5vh;
    min-height: auto;
    padding-bottom: 80px;
  }

  .content-layer {
    position: relative;
    padding-top: 25vh;
  }

  .custom-align-col {
    padding-top: 0px !important;
    align-items: flex-start !important;
    /* Corrigido para esquerda */
    text-align: left !important;
    /* Corrigido para esquerda */
    width: 100%;
    max-width: 100%;
  }

  .skills-grid {
    grid-template-columns: 1fr;
    gap: 32px;
  }

  .chips-wrapper {
    justify-content: flex-start;
    /* Corrigido para esquerda */
    gap: 8px;
    margin-left: 0;
    max-width: 100%;
    width: 100%;
  }

  .skill-subtitle {
    text-align: left;
    font-size: 14px;
  }
}

/* --- AJUSTE DISPOSITIVOS PEQUENOS (MOBILE CORRIGIDO) --- */
@media (max-width: 480px) {
  .organic-background {
    background-size: 100% auto;
    -webkit-mask-size: 30% auto;
    mask-size: 30% auto;
    background-position: left top;
    margin-top: 5vh;
    min-height: auto;
    padding-bottom: 60px;
  }

  .content-layer {
    position: relative;
    padding-top: 28vh;
    /* Empurra o conteúdo para baixo do desenho da onda */
  }

  .custom-align-col {
    padding-top: 0px !important;
    align-items: flex-start !important;
    /* Esquerda */
    text-align: left !important;
    /* Esquerda */
    width: 100%;
    max-width: 100%;
  }

  .skills-grid {
    grid-template-columns: 1fr;
    gap: 28px;
  }

  .chips-wrapper {
    justify-content: flex-start;
    /* Esquerda */
    gap: 8px;
    margin-left: 0;
    max-width: 100%;
    width: 100%;
  }

  .skill-subtitle {
    text-align: left;
    font-size: 13px;
  }

  .skill-chip {
    font-size: 11px !important;
    height: 26px !important;
    padding-inline: 10px;
  }
}

/* --- CLASSES DE ACABAMENTO E TIPOGRAFIA --- */
.formation-name {
  font-size: clamp(24px, 4vw, 42px);
  letter-spacing: 1.2px;
  font-weight: 700;
}

.skill-chip {
  font-weight: 600 !important;
  letter-spacing: 0.8px;
  padding-inline: 12px;
  border-radius: 6px !important;
  backdrop-filter: blur(4px);
  height: 28px !important;
  font-size: 12px !important;
}

/* Cores dos Chips com transparência HUD */
.design-chip {
  background: rgba(255, 111, 145, 0.05) !important;
  color: #ff6f91 !important;
  border-color: rgba(255, 111, 145, 0.3) !important;
}

.methodology-chip {
  background: rgba(255, 209, 102, 0.05) !important;
  color: #f5ba32 !important;
  border-color: rgba(223, 161, 16, 0.3) !important;
}

.lang-chip {
  background: rgba(88, 166, 255, 0.1) !important;
  color: #58a6ff !important;
  border-color: rgba(88, 166, 255, 0.4) !important;
}

.frontend-chip {
  background: rgba(0, 209, 178, 0.05) !important;
  color: #00d1b2 !important;
  border-color: rgba(0, 209, 178, 0.3) !important;
}

.backend-chip {
  background: rgba(163, 113, 247, 0.05) !important;
  color: #b388ff !important;
  border-color: rgba(163, 113, 247, 0.3) !important;
}

.database-chip {
  background: rgba(52, 211, 153, 0.05) !important;
  color: #34d399 !important;
  border-color: rgba(52, 211, 153, 0.3) !important;
}

.game-chip {
  background: rgba(255, 126, 41, 0.06) !important;
  color: #ff7e29 !important;
  border-color: rgba(255, 126, 41, 0.35) !important;
}
</style>