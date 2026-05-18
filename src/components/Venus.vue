<script lang="ts" setup>
// Importação higienizada para a arquitetura do Vite
import venusImg from "@/assets/venus.svg";
</script>

<template>
  <div class="position-venus floating" style="animation-delay: 4s">
    <img :src="venusImg" class="planet-venus" alt="Venus Planet" />
  </div>
</template>

<style scoped>
/* --- COORDENADAS E PARÂMETROS ORIGINAIS RIGOROSAMENTE PRESERVADOS --- */
.position-venus {
  position: absolute;
  top: 70vh;
  right: 75vw;
  width: clamp(400px, 55vw, 400px);
  z-index: 12;
}

.planet-venus {
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
  animation: float 2s ease-in-out infinite;
}

/* --- MEDIA QUERIES ORIGINAIS (NÃO ALTERADAS) --- */

/* Large screens (> 1920px) */
@media (min-width: 1921px) {
  .position-venus {
    top: 55vh;
    right: 72vw;
    width: min(55vw, 700px);
  }
}

/* Medium screens (Tablets) */
@media (min-width: 481px) and (max-width: 960px) {
  .position-venus {
    top: 12vh;
    left: -8vw;
    width: clamp(150px, 30vw, 220px);
    z-index: 12;
  }
}

/* Mobile */
@media (max-width: 480px) {
  .position-venus {
    top: 25vh;
    left: -5vw;
    width: clamp(120px, 45vw, 120px);
    z-index: 12;
  }
}
</style>