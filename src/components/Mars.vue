<script lang="ts" setup>
// Importação ajustada para o padrão do Vite
import marsImg from "@/assets/mars.svg";
</script>

<template>
  <div class="position-mars floating" style="animation-delay: 4s">
    <img :src="marsImg" class="planet-mars" alt="Mars Planet" />
  </div>
</template>

<style scoped>
/* --- POSICIONAMENTO E COORDENADAS ORIGINAIS PRESERVADOS --- */
.position-mars {
  position: absolute;
  top: 135vh;
  right: -8vw;
  width: clamp(650px, 45vw, 750px);
  z-index: 12;
}

.planet-mars {
  width: 100%;
  height: auto;
}

/* Animação estelar de flutuação */
@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-15px);
  }
}

.floating {
  animation: float 3s ease-in-out infinite;
}

/* --- MEDIA QUERIES ORIGINAIS (NÃO ALTERADAS) --- */

/* Large screens (> 1920px) */
@media (min-width: 1921px) {
  .position-mars {
    top: 120vh;
    right: -5vw;
    width: min(45vw, 900px);
  }
}

/* Medium screens (Tablets) */
@media (min-width: 481px) and (max-width: 960px) {
  .position-mars {
    top: 35vh;
    right: -14vw;
    width: clamp(200px, 35vw, 300px);
    z-index: 5;
  }
}

/* Mobile */
@media (max-width: 480px) {
  .position-mars {
    top: 2vh;
    right: -25vw;
    width: clamp(160px, 45vw, 220px);
  }
}
</style>