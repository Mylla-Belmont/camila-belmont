<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from "vue";
// Tratando os caminhos dos SVGs como módulos dinâmicos para o Vite
import wideStar from "@/assets/wide.svg";
import thinStar from "@/assets/thin.svg";

interface Star {
  x: number;
  y: number;
  visible: boolean;
  image: string;
}

const stars = ref<Star[]>([]);
// Guardamos as referências dos intervalos para limpá-los e evitar vazamento de memória
const intervals: number[] = [];

function randomPercent() {
  return Math.random() * 100;
}

function randomImage(): string {
  const images = [wideStar, thinStar];
  const idx = Math.floor(Math.random() * images.length);
  return images[idx] || wideStar;
}

function distance(star1: Star, star2: Star) {
  const dx = star1.x - star2.x;
  const dy = star1.y - star2.y;
  return Math.sqrt(dx * dx + dy * dy);
}

function createStar(existingStars: Star[] = []): Star {
  let newStar: Star;
  let tries = 0;
  do {
    newStar = {
      x: randomPercent(),
      y: randomPercent(),
      image: randomImage(),
      visible: false
    };
    tries++;
    if (tries > 20) break;
  } while (existingStars.some(s => distance(s, newStar) < 10));
  return newStar;
}

function toggleStar(index: number) {
  if (!stars.value[index]) return;

  stars.value[index].visible = false;

  setTimeout(() => {
    if (!stars.value[index]) return;

    let newStar: Star;
    let tries = 0;
    do {
      newStar = {
        x: randomPercent(),
        y: randomPercent(),
        image: randomImage(),
        visible: false
      };
      tries++;
      if (tries > 20) break;
    } while (stars.value.some((s, i) => i !== index && distance(s, newStar) < 8));

    stars.value[index] = newStar;

    setTimeout(() => {
      if (stars.value[index]) {
        stars.value[index].visible = true;
      }
    }, 50);
  }, 1000);
}

onMounted(() => {
  // Inicialização das estrelas movida para dentro do onMounted para respeitar o SSR e o Vite
  for (let i = 0; i < 10; i++) {
    stars.value.push(createStar(stars.value));
  }

  // Animação de entrada gradual
  stars.value.forEach((star, i) => {
    setTimeout(() => {
      if (stars.value[i]) stars.value[i].visible = true;
    }, 500 + i * 100);
  });

  // Loop de cintilação individual de cada estrela
  stars.value.forEach((_, i) => {
    const id = window.setInterval(() => {
      toggleStar(i);
    }, 2000 + i * 400);
    intervals.push(id);
  });
});

onUnmounted(() => {
  // Limpa todos os loops ativos ao mudar de página, impedindo sobrecarga no navegador
  intervals.forEach(clearInterval);
});
</script>

<template>
  <v-container fluid class="pa-0 fill-height stars-container">
    <div v-for="(star, index) in stars" :key="index" class="floating-star" :class="{ visible: star.visible }" :style="{
      top: star.y + '%',
      left: star.x + '%'
    }">
      <img :src="star.image" alt="Sparkling Star" />
    </div>
  </v-container>
</template>

<style scoped>
/* ============================================================
   1. CONTÊINER DE ESTRELAS
   ============================================================ */
.stars-container {
  position: absolute !important;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
}

/* ============================================================
   2. ESTRELAS INDIVIDUAIS
   ============================================================ */
.floating-star {
  position: absolute;
  width: 24px;
  height: 24px;
  opacity: 0;
  transition: opacity 1s ease-in-out;
  user-select: none;
  z-index: 0;
}

.floating-star.visible {
  opacity: 1;
}
</style>