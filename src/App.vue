<script lang="ts" setup>
import { onMounted, onUnmounted } from "vue";
import Lenis from "lenis";

import SiteHeader from "./components/SiteHeader.vue";
import HelloMain from "./views/HelloMain.vue";
import AboutMe from "./views/AboutMe.vue";
import Skills from "./views/Skills.vue";
import PremiumGallery from "./views/PremiumGallery.vue";
import Projects from "./views/Projects.vue";
import Contact from "./views/Contact.vue";

let lenis: Lenis | null = null;
let animationFrameId: number | null = null;

onMounted(() => {
  // Inicializa o motor de rolagem suave e lenta
  lenis = new Lenis({
    duration: 1.6,       // Duração da rolagem em segundos (Aumente para ficar mais lento e suave)
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Curva de desaceleração (Inércia cinematográfica)
    orientation: "vertical",
    gestureOrientation: "vertical",
    smoothWheel: true,   // Ativa suavização na rodinha do mouse
    wheelMultiplier: 0.9, // Multiplicador de velocidade do mouse (valores menores descem mais devagar)
  });

  // Loop de animação necessário para atualizar o Lenis a cada frame do navegador
  function raf(time: number) {
    lenis?.raf(time);
    animationFrameId = requestAnimationFrame(raf);
  }

  animationFrameId = requestAnimationFrame(raf);
});

onUnmounted(() => {
  // Limpa os processos e destrói o listener ao desmontar o app para não pesar o navegador
  if (animationFrameId) cancelAnimationFrame(animationFrameId);
  lenis?.destroy();
});
</script>

<template>
  <v-app>
    <SiteHeader />

    <v-main>
      <v-container fluid class="pa-0">
        <HelloMain />
        <AboutMe />
        <Skills />
        <PremiumGallery />
        <Projects />
        <Contact />
      </v-container>
    </v-main>
  </v-app>
</template>

<style>
/* ============================================================
   1. LENIS — SCROLL SUAVE
   ============================================================ */
html.lenis,
html.lenis body {
  height: auto;
}

.lenis.lenis-smooth {
  scroll-behavior: auto !important;
}

.lenis.lenis-smooth [data-lenis-prevent] {
  scroll-behavior: contain;
}

.lenis.lenis-stopped {
  overflow: hidden;
}

.lenis.lenis-scrolling iframe {
  pointer-events: none;
}

/* ============================================================
   2. GLOBAIS
   ============================================================ */
html {
  overflow-x: hidden;
}

body {
  margin: 0;
  padding: 0;
  background-color: #1D1D1D;
}
</style>x