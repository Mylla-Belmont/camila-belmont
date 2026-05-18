<script lang="ts" setup>
// Importação ajustada e higienizada para o ecossistema Vite
import uranusImg from "@/assets/uranus.svg";
</script>

<template>
  <div class="position-uranus floating" style="animation-delay: 4s">
    <img :src="uranusImg" class="planet-uranus" alt="Uranus Planet" />
  </div>
</template>

<style scoped>
/* --- COORDENADAS E PARÂMETROS ORIGINAIS RIGOROSAMENTE PRESERVADOS --- */
.position-uranus {
  position: absolute;
  top: 90vh;
  right: 20%;
  width: clamp(400px, 20vw, 750px);
  z-index: 12;
}

.planet-uranus {
  width: 100%;
  height: auto;
}

/* Animação de órbita fluida */
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
  animation: float 4s ease-in-out infinite;
}

/* --- MEDIA QUERIES ORIGINAIS (NÃO ALTERADAS) --- */

/* Large screens (> 1920px) */
@media (min-width: 1921px) {
  .position-uranus {
    top: 75vh;
    right: 25%;
    width: min(20vw, 800px);
  }
}

/* Medium screens (Tablets) */
@media (min-width: 481px) and (max-width: 960px) {
  .position-uranus {
    top: 12vh;
    right: 70vw;
    width: clamp(80px, 25vw, 200px);
    z-index: 5;
  }
}

/* Mobile */
@media (max-width: 480px) {
  .position-uranus {
    top: 40vh;
    right: 70vw;
    width: clamp(40px, 25vw, 70px);
  }
}
</style>