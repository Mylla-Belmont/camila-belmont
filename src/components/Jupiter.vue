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
/* --- COORDENADAS E PARÂMETROS ORIGINAIS --- */
.position-jupiter {
    position: absolute;
    /* Alinhado com a transição entre Skills e Galeria */
    top: -120px;
    right: -5vw;
    /* Largura responsiva clamp(mínimo, ideal, máximo) */
    width: clamp(580px, 18vw, 620px);
    z-index: 2;
    /* Fica acima do Vector 4 */
    pointer-events: none;
}

.planet-jupiter {
    width: 100%;
    height: auto;
    /* Brilho HUD suave */
    filter: drop-shadow(0 0 15px rgba(255, 126, 41, 0.15));
}

/* Animação estelar de flutuação (Copidada dos outros planetas) */
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
    /* Animação lenta e fluida */
    animation: float 5s ease-in-out infinite;
}

/* --- MEDIA QUERIES ORIGINAIS PRESERVADAS --- */

/* Tablets / Medium screens */
@media (min-width: 481px) and (max-width: 959px) {
    .position-jupiter {
        top: -100px;
        right: 10vw;
        width: clamp(150px, 20vw, 220px);
    }
}

/* Mobile */
@media (max-width: 480px) {
    .position-jupiter {
        top: -60px;
        right: 5vw;
        width: 120px;
    }
}
</style>