<script lang="ts" setup>
import moonImg from "@/assets/Moon.svg";
</script>

<template>
  <div class="position-moon floating" style="animation-delay: 3s">
    <img :src="moonImg" class="planet-moon" alt="Moon" />
  </div>
</template>

<style scoped>
/* ============================================================
   1. POSICIONAMENTO
   ============================================================ */
.position-moon {
  position: absolute;
  top: 40%;
  left: 0vw;
  width: clamp(90px, 14vw, 180px);
  z-index: 1;
  pointer-events: none;
}

/* ============================================================
   2. IMAGEM DO PLANETA
   ============================================================ */
.planet-moon {
  width: 100%;
  height: auto;
  filter: drop-shadow(0 0 20px rgba(255, 214, 108, 0.12));
}

/* ============================================================
   3. ANIMAÇÃO DE FLUTUAÇÃO
   ============================================================ */
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-12px); }
}

.floating {
  animation: float 6s ease-in-out infinite;
}

/* ============================================================
   4. RESPONSIVIDADE
   ============================================================ */
@media (min-width: 481px) and (max-width: 959px) {
  .position-moon {
    top: 10%;
    left: -2vw;
    width: clamp(100px, 16vw, 140px);
  }
}

@media (max-width: 480px) {
  .position-moon {
    top: 5%;
    left: 0;
    width: 80px;
  }
}
</style>
