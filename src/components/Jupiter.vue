<script lang="ts" setup>
// Importação higienizada para o ecossistema Vite
import jupiterImg from "@/assets/Jupiter.svg";
</script>

<template>
  <div class="position-jupiter floating" style="animation-delay: 2s">
    <img :src="jupiterImg" class="planet-jupiter" alt="Jupiter Planet" />
  </div>
</template>

<style scoped>
/* ============================================================
   1. POSICIONAMENTO
   ============================================================ */
.position-jupiter {
  position: absolute;
  top: -20px;
  right: -5vw;
  width: clamp(520px, 18vw, 620px);
  z-index: 2;
  pointer-events: none;
}

/* ============================================================
   2. IMAGEM DO PLANETA
   ============================================================ */
.planet-jupiter {
  width: 100%;
  height: auto;
  filter: drop-shadow(0 0 15px rgba(255, 126, 41, 0.15));
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
    transform: translateY(-15px);
  }
}

.floating {
  animation: float 3s ease-in-out infinite;
}

/* ============================================================
   4. RESPONSIVIDADE
   ============================================================ */
@media (min-width: 481px) and (max-width: 959px) {
  .position-jupiter {
    top: -100px;
    right: 10vw;
    width: clamp(150px, 20vw, 220px);
  }
}

@media (max-width: 480px) {
  .position-jupiter {
    top: 20px;
    right: -5vw;
    width: 320px;
  }
}
</style>