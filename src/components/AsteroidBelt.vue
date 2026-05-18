<script setup lang="ts">
import { ref, onMounted } from "vue"

interface Asteroid {
  id: number
  size: string
  delay: string
  color: string
  duration: string
  startY: string // Altura de nascimento massivamente espalhada
  blur: string
}

const asteroids = ref<Asteroid[]>([])

// Cores pastéis, místicas e translúcidas
const auroraColors = [
  "rgba(0, 245, 212, 0.35)",  /* Turquesa/Ciano */
  "rgba(157, 78, 221, 0.3)",   /* Roxo Místico */
  "rgba(255, 112, 166, 0.35)", /* Rosa Algodão Doce */
  "rgba(186, 255, 201, 0.3)",  /* Verde Aurora */
  "rgba(255, 214, 165, 0.35)", /* Ouro/Pêssego */
]

function randomBetween(min: number, max: number): number {
  return Math.random() * (max - min) + min
}

onMounted(() => {
  // Aumentamos para 50-60 partículas para preencher bem a nova área gigante
  const count = Math.floor(randomBetween(50, 60))
  const items: Asteroid[] = []

  for (let i = 0; i < count; i++) {
    // Mantemos tamanhos variados para gerar profundidade 3D no espaço expandido
    const size = randomBetween(4, 20)
    const randomColor = auroraColors[Math.floor(Math.random() * auroraColors.length)]
    const blurEffect = Math.random() > 0.4 ? `${randomBetween(1, 5)}px` : "0px"

    items.push({
      id: i,
      size: `${size}px`,
      delay: `${randomBetween(-30, 0)}s`, // Janela de delay maior para distribuir o fluxo
      duration: `${randomBetween(18, 26)}s`, // Movimento lento, majestoso e hipnótico
      color: randomColor,
      // Alargado de (20, 70) para (5, 95)% para dominar quase toda a altura do bloco
      startY: `${randomBetween(5, 95)}%`,
      blur: blurEffect
    })
  }
  asteroids.value = items
})
</script>

<template>
  <section class="asteroid-belt-container">
    <div v-for="asteroid in asteroids" :key="asteroid.id" class="asteroid" :style="{
      top: asteroid.startY,
      width: asteroid.size,
      height: asteroid.size,
      animationDelay: asteroid.delay,
      animationDuration: asteroid.duration,
      background: asteroid.color,
      filter: `blur(${asteroid.blur})`,
      boxShadow: `0 0 20px ${asteroid.color}` /* Brilho expandido proporcional à nova área */
    }" />
  </section>
</template>

<style scoped>
.asteroid-belt-container {
  position: absolute;
  width: 100%;
  height: 65vh;
  /* Aumentado drasticamente para cobrir uma área vertical massiva */
  overflow: hidden;
  background: transparent;
}

/* --- CONFIGURAÇÃO DAS PARTÍCULAS --- */
.asteroid {
  position: absolute;
  left: -50px;
  border-radius: 50%;
  will-change: transform, opacity;
  animation: auroraPath cubic-bezier(0.445, 0.05, 0.55, 0.95) infinite;
}

.asteroid:nth-child(3n) {
  border-radius: 45% 55% 50% 50%;
}

.asteroid:nth-child(5n) {
  border-radius: 55% 45% 45% 55%;
}

/* --- TRAJETÓRIA AMPLIADA EM ONDA SENOIDAL --- 
   Aumentamos os valores de Y (-140px e -60px) para acompanhar a nova 
   altura do container, criando ondulações verticais profundas e imponentes.
*/
@keyframes auroraPath {
  0% {
    transform: translate(0vw, 0px) rotate(0deg);
    opacity: 0;
  }

  /* Aparecimento muito suave na entrada da tela */
  12% {
    opacity: 0.7;
  }

  /* Primeira crista da onda (Subida acentuada) */
  35% {
    transform: translate(35vw, -140px) rotate(120deg);
    opacity: 0.8;
  }

  /* Vale da onda (Descida controlada no centro da tela) */
  65% {
    transform: translate(65vw, -60px) rotate(240deg);
    opacity: 0.8;
  }

  /* Começa o fade-out na saída */
  88% {
    opacity: 0.5;
  }

  100% {
    /* Finaliza a viagem subindo em direção ao espaço profundo do lado direito */
    transform: translate(110vw, -180px) rotate(360deg);
    opacity: 0;
  }
}

/* --- ADAPTAÇÃO MOBILE (PRESERVA A GPU) --- */
@media (max-width: 959px) {
  .asteroid-belt-container {
    height: 40vh;
    /* No mobile reduzimos um pouco para manter a rolagem confortável */
  }

  @keyframes auroraPath {
    0% {
      transform: translate(0vw, 0px) rotate(0deg);
      opacity: 0;
    }

    12% {
      opacity: 0.6;
    }

    35% {
      transform: translate(35vw, -60px) rotate(120deg);
      opacity: 0.7;
    }

    65% {
      transform: translate(65vw, -25px) rotate(240deg);
      opacity: 0.7;
    }

    100% {
      transform: translate(110vw, -80px) rotate(360deg);
      opacity: 0;
    }
  }
}
</style>