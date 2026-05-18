<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
import vector4 from "@/assets/Vector 4@2x.svg";
import Jupiter from "@/components/Jupiter.vue";
import Stars from "@/components/Stars.vue";

interface GalleryItem {
  id: number;
  title: string;
  tool: string;
  imageUrl: string;
}

const galleryItems: GalleryItem[] = [
  { id: 1, title: "Abstract Dreamscape", tool: "Midjourney", imageUrl: "https://picsum.photos/seed/flow1/400/500" },
  { id: 2, title: "Urban Cyberpunk", tool: "Blender", imageUrl: "https://picsum.photos/seed/flow2/400/500" },
  { id: 3, title: "Minimalist Interface", tool: "Figma", imageUrl: "https://picsum.photos/seed/flow3/400/500" },
  { id: 4, title: "Ethereal Landscape", tool: "Photoshop", imageUrl: "https://picsum.photos/seed/flow4/400/500" },
  { id: 5, title: "Neon Dreams", tool: "Stable Diffusion", imageUrl: "https://picsum.photos/seed/flow5/400/500" },
  { id: 6, title: "Futuristic City", tool: "Unreal Engine", imageUrl: "https://picsum.photos/seed/flow6/400/500" },
  { id: 7, title: "Organic Bloom", tool: "Blender", imageUrl: "https://picsum.photos/seed/flow7/400/500" },
  { id: 8, title: "Cosmic Horizon", tool: "Midjourney", imageUrl: "https://picsum.photos/seed/flow8/400/500" }
];

const displayItems = computed(() => [...galleryItems, ...galleryItems]);

const trackRef = ref<HTMLElement | null>(null);
const isHovering = ref(false);
const hoverDirection = ref<'left' | 'right' | null>(null); // Novo: Controla direção da aceleração
const dialogOpen = ref(false);
const selectedItem = ref<GalleryItem | null>(null);

const itemWidth = ref(300);
const itemHeight = ref(420);

const GAP = 24;
const NORMAL_SPEED = 55;
const FAST_SPEED = 700; // Velocidade ao aproximar o mouse das bordas

let position = 0;
let animationId: number | null = null;
let lastTime = 0;

const oneSetWidth = computed(() => galleryItems.length * (itemWidth.value + GAP));

const toolColors: Record<string, string> = {
  Photoshop: "#31A8FF",
  Blender: "#EA7600",
  Midjourney: "#8B5CF6",
  Figma: "#F24E1E",
  "Stable Diffusion": "#0EA5E9",
  "Unreal Engine": "#2D3561",
  Unity: "#E2232A",
  Godot: "#478CBF"
};

function getToolColor(tool: string): string {
  return toolColors[tool] || "#757575";
}

function updateDimensions() {
  if (typeof window === "undefined") return;
  const w = window.innerWidth;
  if (w < 600) { itemWidth.value = 180; itemHeight.value = 250; }
  else if (w < 960) { itemWidth.value = 240; itemHeight.value = 340; }
  else { itemWidth.value = 300; itemHeight.value = 420; }

  if (position >= oneSetWidth.value) position = position % oneSetWidth.value;
}

function animate(time: number) {
  if (!lastTime) lastTime = time;
  let dt = (time - lastTime) / 1000;
  lastTime = time;
  dt = Math.min(dt, 0.1);

  // Lógica de Movimentação Dinâmica
  if (hoverDirection.value === 'right') {
    position += FAST_SPEED * dt;
  } else if (hoverDirection.value === 'left') {
    position -= FAST_SPEED * dt;
  } else if (!isHovering.value) {
    position += NORMAL_SPEED * dt;
  }

  // Loop Infinito (Bordas)
  if (position >= oneSetWidth.value) position -= oneSetWidth.value;
  if (position < 0) position += oneSetWidth.value;

  if (trackRef.value) {
    trackRef.value.style.transform = `translate3d(${-position}px, 0, 0)`;
  }

  animationId = requestAnimationFrame(animate);
}

function openPreview(item: GalleryItem) {
  selectedItem.value = item;
  dialogOpen.value = true;
}

onMounted(() => {
  updateDimensions();
  window.addEventListener("resize", updateDimensions);
  animationId = requestAnimationFrame(animate);
});

onUnmounted(() => {
  if (animationId) cancelAnimationFrame(animationId);
  window.removeEventListener("resize", updateDimensions);
});
</script>

<template>
  <section id="portfolio" class="gallery-section">
    <div class="scenery-vector-4">
      <img :src="vector4" alt="Background Scene" />
    </div>

    <Jupiter />
    <Stars />

    <v-row class="ml-2 ml-sm-6 pt-12 pt-sm-16 header-content" align="start" justify="start">
      <v-col cols="12" sm="10" md="8" lg="6" class="ml-4 ml-sm-8 ml-md-16">
        <div class="custom-name text-primary">Illustrations</div>
        <div class="custom-text text-primary mt-2 mb-6">
          Commissions and personal projects for fun
        </div>
      </v-col>
    </v-row>

    <div class="gallery-container">
      <div class="nav-zone zone-left" @mouseenter="hoverDirection = 'left'" @mouseleave="hoverDirection = null" />

      <div class="nav-zone zone-right" @mouseenter="hoverDirection = 'right'" @mouseleave="hoverDirection = null" />

      <div class="gallery-viewport" @mouseenter="isHovering = true" @mouseleave="isHovering = false">
        <div ref="trackRef" class="gallery-track">
          <div v-for="(item, idx) in displayItems" :key="idx" class="gallery-item"
            :style="{ width: `${itemWidth}px`, height: `${itemHeight}px` }" @click="openPreview(item)">
            <div class="gallery-image-wrapper">
              <img :src="item.imageUrl" :alt="item.title" class="gallery-image" loading="lazy" />
              <div class="item-overlay" />
              <v-chip :color="getToolColor(item.tool)" size="x-small" variant="flat" class="tool-chip" label>
                {{ item.tool }}
              </v-chip>
            </div>
          </div>
        </div>
      </div>
    </div>

    <v-dialog v-model="dialogOpen" fullscreen transition="dialog-bottom-transition">
      <v-card v-if="selectedItem" class="preview-card" elevation="0" color="#000">
        <v-btn icon variant="text" class="close-btn" @click="dialogOpen = false">
          <v-icon color="white" size="28">mdi-close</v-icon>
        </v-btn>
        <div class="preview-content">
          <div class="preview-image-container">
            <img :src="selectedItem.imageUrl" :alt="selectedItem.title" class="preview-image" />
          </div>
          <div class="preview-meta">
            <h2 class="preview-title">{{ selectedItem.title }}</h2>
            <v-chip :color="getToolColor(selectedItem.tool)" variant="flat" label>{{ selectedItem.tool }}</v-chip>
          </div>
        </div>
      </v-card>
    </v-dialog>
  </section>
</template>

<style scoped>
.gallery-section {
  margin-top: 0vh;
  /* Empurra a seção inteira para baixo (aumente este valor se quiser mais baixo ainda) */
  padding: 200px 0;
  position: relative;
  overflow-y: visible !important;
  /* Permite que Júpiter voe para fora da caixa se necessário */
  /* Permite ver o fundo escuro do App */
}

/* --- ESTILIZAÇÃO DO NOVO VETOR 4 --- */
.scenery-vector-4 {
  position: absolute;
  top: -200px;
  /* Ajuste para encaixar logo abaixo da seção anterior */
  right: 0;
  width: 20%;
  max-width: 800px;
  pointer-events: none;
  /* Não bloqueia cliques */
}

.scenery-vector-4 img {
  width: 100%;
  height: auto;
}

.header-content {
  position: relative;
  z-index: 5;
}

.gallery-container {
  position: relative;
  padding: 0 2%;
  z-index: 10;
}

/* --- ZONAS DE ACELERAÇÃO --- */
.nav-zone {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 10%;
  /* 10% de cada lado ativa a aceleração */
  z-index: 100;
  cursor: w-resize;
  /* Cursor indicativo de movimento lateral */
}

.zone-left {
  left: 0;
  cursor: w-resize;
}

.zone-right {
  right: 0;
  cursor: e-resize;
}

.gallery-viewport {
  overflow: hidden;
  position: relative;
  mask-image: linear-gradient(to right, transparent 0%, #000 8%, #000 92%, transparent 100%);
  -webkit-mask-image: linear-gradient(to right, transparent 0%, #000 8%, #000 92%, transparent 100%);
}

.gallery-track {
  display: flex;
  gap: 24px;
  width: fit-content;
  will-change: transform;
}

/* Restante dos estilos originais preservados */
.custom-name {
  font-size: clamp(28px, 6vw, 40px);
  font-weight: bold;
  letter-spacing: 1.7px;
}

.custom-text {
  font-size: clamp(13px, 2vw, 14px);
  letter-spacing: 1.7px;
}

.gallery-item {
  flex-shrink: 0;
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.4s ease;
}

.gallery-item:hover {
  transform: scale(1.05);
}

.gallery-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.item-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50%;
  /* Mude o background para transparente para sumir com o preto da base */
  background: transparent !important;
  pointer-events: none;
}

.tool-chip {
  position: absolute;
  bottom: 12px;
  left: 12px;
}

.gallery-section {
  position: relative;
  /* Importante para o Jupiter se posicionar em relação a esta seção */
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: transparent;
}

/* Garanta que o overflow-y seja visible para o Jupiter não ser cortado se subir muito */
.gallery-section {
  overflow-y: visible !important;
}

/* Media Queries */
@media (max-width: 959px) {
  .scenery-vector-4 {
    width: 80%;
    top: -20px;
  }

  .nav-zone {
    width: 15%;
  }

  /* Zonas maiores no mobile/tablet */
}
</style>