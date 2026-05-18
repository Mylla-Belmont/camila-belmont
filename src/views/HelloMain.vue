<script lang="ts" setup>
import Stars from "@/components/Stars.vue";
import Mars from "@/components/Mars.vue";
import Uranus from "@/components/Uranus.vue";
</script>

<template>
  <v-container id="inicio" fluid class="pa-0 relative-container">
    <v-sheet class="bg-primary pt-16" height="auto" min-height="90vh" width="100%">
      <v-container class="px-6 px-md-16 fill-height align-center">
        <v-row class="fill-height my-auto mt-md-12" align="center" justify="start">
          
          <v-col
            cols="12"
            md="7"
            lg="6"
            class="pr-md-10 text-center text-md-left d-flex flex-column justify-center"
          >
            <div class="hello-text text-secondary font-italic mb-3">Hello! I'm</div>
            <div class="name-text text-secondary line-height-tight">Camila</div>
            <div class="name-text text-secondary line-height-tight mb-8">Belmont</div>
            <div class="desc-text text-secondary font-weight-light text-capitalize">
              digital illustrator and game designer
            </div>
          </v-col>
          
          <v-spacer />
          
          <v-col
            cols="12"
            md="5"
            lg="4"
            class="d-flex justify-center justify-md-end"
          >
            <v-sheet
              elevation="0"
              class="video-placeholder d-flex align-center justify-center"
              rounded="xl"
            >
              <div class="video-label text-primary">Video</div>
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>

      <Stars />
    </v-sheet>

    <Uranus />
    <Mars />
  </v-container>
</template>

<style scoped>
/* --- DESIGN, COMPORTAMENTOS DE OVERFLOW E CAMADAS PRESERVADOS --- */
.relative-container {
  position: relative;
  z-index: 1;
  max-width: 100vw;
  overflow-x: hidden;
  overflow-y: visible;
}

/* Mobile: Garante que nada vaze para os lados nas telas touch */
@media (max-width: 959px) {
  .relative-container {
    overflow: hidden;
  }
}

/* Desktop: Permite que os planetas vazem para as seções inferiores de forma fluida */
@media (min-width: 960px) {
  .relative-container {
    overflow: visible;
  }
}

/* --- TIPOGRAFIA DA HERO SECTION --- */
.hello-text {
  font-size: clamp(20px, 3vw, 24px);
  letter-spacing: 1.2px;
}

.name-text {
  font-size: clamp(42px, 8vw, 84px);
  letter-spacing: 1.5px;
  font-weight: 700;
}

.desc-text {
  font-size: clamp(14px, 2vw, 20px);
  letter-spacing: 1px;
  line-height: 1.5;
}

.line-height-tight {
  line-height: 1.1 !important;
}

/* --- COMPONENTES VISUAIS --- */
.video-placeholder {
  width: 100%;
  max-width: 580px;
  aspect-ratio: 3 / 3;
  background-color: #ffffff;
}

.video-label {
  font-size: 24px;
  font-weight: bold;
}

/* --- ANIMAÇÃO DE ENTRADA SUAVE --- */
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

.v-row {
  position: relative;
  animation: fadeSlideIn 1.2s ease-out;
  z-index: 10;
}
</style>