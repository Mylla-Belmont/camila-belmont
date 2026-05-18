<script lang="ts" setup>
import { computed, ref, onMounted, onUnmounted } from "vue";
// Importação tratada como módulo estático para o ecossistema Vite
import rocketImg from "@/assets/rocket.svg";

// DefineProps declarado como macro global nativa (sem import)
const props = defineProps<{
  progress: number;
  baseWidth?: number;
}>();

const windowWidth = ref(typeof window !== "undefined" ? window.innerWidth : 1024);

const handleResize = () => {
  windowWidth.value = window.innerWidth;
};

onMounted(() => {
  window.addEventListener("resize", handleResize);
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
});

const rocketStyle = computed(() => {
  const bw = props.baseWidth ?? 80;
  const w = windowWidth.value;

  let startX: number, startY: number, endX: number, endY: number;
  let baseRotation: number;

  /* --- COORDENADAS E TRAJETÓRIAS ORIGINAIS PRESERVADAS --- */
  if (w >= 960) {
    /* Desktop path */
    startX = 5;
    startY = 40;
    endX = 70;
    endY = -20;
    baseRotation = -5;
  } else if (w >= 481) {
    /* Medium path */
    startX = -5;
    startY = 55;
    endX = 60;
    endY = -15;
    baseRotation = -18;
  } else {
    /* Mobile path */
    startX = -15;
    startY = 35;
    endX = 75;
    endY = -10;
    baseRotation = -20;
  }

  const currentX = startX + (endX - startX) * props.progress;
  const currentY = startY + (endY - startY) * props.progress;

  const currentScale = 1 + (3.2 - 1) * props.progress;
  const rotation = baseRotation + 45 * props.progress;

  return {
    position: "absolute" as const,
    left: `${currentX}%`,
    top: `${currentY}%`,
    width: `${bw * currentScale}px`,
    transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
    zIndex: 50,
    transition: "none",
    willChange: "transform, top, left, width"
  };
});
</script>

<template>
  <div class="rocket-container" :style="rocketStyle">
    <img :src="rocketImg" class="rocket-image" alt="Foguete do Portfólio" />
  </div>
</template>

<style scoped>
.rocket-container {
  pointer-events: none;
}

.rocket-image {
  width: 100%;
  height: auto;
  display: block;
}
</style>