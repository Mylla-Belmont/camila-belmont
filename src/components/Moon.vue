<script lang="ts" setup>
import moonImg from "@/assets/Moon.svg";
</script>

<template>
  <div class="position-moon floating" style="animation-delay: 3s">
    <img :src="moonImg" class="planet-moon" alt="Moon" />
  </div>
</template>

<style scoped>
.position-moon {
  position: absolute;
  top: 40%;
  left: 0vw;
  width: clamp(90px, 14vw, 180px);
  z-index: 1;
  pointer-events: none;
}

.planet-moon {
  width: 100%;
  height: auto;
  filter: drop-shadow(0 0 20px rgba(255, 214, 108, 0.12));
}

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
  animation: float 6s ease-in-out infinite;
}

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
