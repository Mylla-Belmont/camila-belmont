<script lang="ts" setup>
import neptuneImg from "@/assets/Neptune.svg";
</script>

<template>
  <div class="position-neptune floating" style="animation-delay: 4.5s">
    <img :src="neptuneImg" class="planet-neptune" alt="Neptune" />
  </div>
</template>

<style scoped>
/* ============================================================
   1. POSICIONAMENTO
   ============================================================ */
.position-neptune {
  position: absolute;
  top: 30%;
  left: -10vw;
  width: clamp(320px, 10vw, 480px);
  z-index: 1;
  pointer-events: none;
}

/* ============================================================
   2. IMAGEM DO PLANETA
   ============================================================ */
.planet-neptune {
  width: 100%;
  height: auto;
  filter: drop-shadow(0 0 20px rgba(88, 166, 255, 0.15));
}

/* ============================================================
   3. ANIMAÇÃO DE FLUTUAÇÃO
   ============================================================ */
@keyframes float {

  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-12px);
  }
}

.floating {
  animation: float 2s ease-in-out infinite;
}

/* ============================================================
   4. RESPONSIVIDADE
   ============================================================ */
@media (min-width: 481px) and (max-width: 959px) {
  .position-neptune {
    top: 5%;
    left: -1vw;
    width: clamp(80px, 12vw, 110px);
  }
}

@media (max-width: 480px) {
  .position-neptune {
    top: 50px;
    left: -50px;
    width: 120px;
  }
}
</style>
