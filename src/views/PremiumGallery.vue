<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
import vector4 from "@/assets/Vector 4@2x.svg";
import Jupiter from "@/components/Jupiter.vue";
import Stars from "@/components/Stars.vue";

const imageModules = import.meta.glob<{ default: string }>(
  "@/assets/illustrations/*",
  { eager: true }
)

interface GalleryItem {
  id: number;
  title: string;
  tool: string;
  imageUrl: string;
}

const toolAssignments: string[] = [
  "Sketchbook", "Sketchbook", "Sketchbook", "Sketchbook", "Sketchbook",
  "Sketchbook", "Sketchbook", "Sketchbook", "Sketchbook", "Sketchbook",
  "Sketchbook", "Sketchbook", "Sketchbook", "Sketchbook", "Sketchbook",
  "Photoshop", "Photoshop", "Photoshop", "Sketchbook", "Sketchbook",
  "Sketchbook", "Sketchbook", "Paint", "Sketchbook", "Krita",
  "Krita", "Ibis Paint", "Ibis Paint", "Ibis Paint", "Ibis Paint",
  "Ibis Paint", "Ibis Paint", "Ibis Paint", "Ibis Paint", "Ibis Paint",
]

function deriveTitle(filepath: string): string {
  const filename = filepath.split("/").pop()?.split("\\").pop() ?? ""
  return filename.replace(/\.[^.]+$/, "").replace(/^a/, "A")
}

const galleryItems: GalleryItem[] = Object.entries(imageModules)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([path, module], index) => ({
    id: index + 1,
    title: deriveTitle(path),
    tool: toolAssignments[index] ?? "Photoshop",
    imageUrl: module.default,
  }))

const displayItems = computed(() => [...galleryItems, ...galleryItems]);

const trackRef = ref<HTMLElement | null>(null);
const isHovering = ref(false);
const hoverDirection = ref<"left" | "right" | null>(null);
const dialogOpen = ref(false);
const selectedItem = ref<GalleryItem | null>(null);

const itemWidth = ref(300);
const itemHeight = ref(420);

const GAP = 24;
const NORMAL_SPEED = 55;
const FAST_SPEED = 700;

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
  Godot: "#478CBF",
  Procreate: "#5B4FE9",
  Krita: "#3B7EBF",
  "Ibis Paint": "#ED8E00",
  Paint: "#FFC107",
  Canva: "#00C4CC",
  Sketchbook: "#2D3561",
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

  if (hoverDirection.value === "right") {
    position += FAST_SPEED * dt;
  } else if (hoverDirection.value === "left") {
    position -= FAST_SPEED * dt;
  } else if (!isHovering.value) {
    position += NORMAL_SPEED * dt;
  }

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
    <AsteroidBelt />

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
            :style="{ width: `${itemWidth}px`, height: `${itemHeight}px` }">
            <div class="gallery-image-wrapper">
              <img :src="item.imageUrl" :alt="item.title" class="gallery-image" loading="lazy" @contextmenu.prevent
                @dragstart.prevent />
              <div class="protection-shield" @click="openPreview(item)" />
              <div class="item-overlay" />
              <v-chip :color="getToolColor(item.tool)" size="x-small" variant="flat" class="tool-chip" label>
                {{ item.tool }}
              </v-chip>
            </div>
          </div>
        </div>
      </div>
    </div>

    <v-dialog v-model="dialogOpen" width="auto" max-width="90vw" transition="scale-transition">
      <v-card v-if="selectedItem" class="preview-card" elevation="24" color="transparent">

        <div class="preview-content">
          <div class="preview-image-container">
            <div class="close-btn-wrapper">
              <v-btn icon variant="text" class="close-btn" @click="dialogOpen = false">
                <v-icon color="white" size="24">mdi-close</v-icon>
              </v-btn>
            </div>

            <img :src="selectedItem.imageUrl" class="preview-image" @contextmenu.prevent @dragstart.prevent />
            <div class="protection-shield" />
          </div>
        </div>

      </v-card>
    </v-dialog>
  </section>
</template>

<style scoped>
.gallery-section {
  margin-top: 0vh;
  padding: 200px 0;
  position: relative;
  overflow-y: visible !important;
}

.scenery-vector-4 {
  position: absolute;
  top: -200px;
  right: 0;
  width: 20%;
  max-width: 800px;
  pointer-events: none;
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

.nav-zone {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 10%;
  z-index: 100;
  cursor: w-resize;
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

.gallery-image-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
}

.gallery-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  -webkit-touch-callout: none;
  -webkit-user-drag: none;
  user-select: none;
  -webkit-user-select: none;
}

.protection-shield {
  position: absolute;
  inset: 0;
  z-index: 2;
  cursor: pointer;
}

.item-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50%;
  background: transparent !important;
  pointer-events: none;
}

.tool-chip {
  position: absolute;
  bottom: 12px;
  left: 12px;
  z-index: 3;
}

/* --- CONTAINER MESTRE (ABRACE O CONTEÚDO) --- */
.preview-card {
  background: transparent !important;
  overflow: visible !important;
  /* Permite que o botão de fechar fique ligeiramente para fora se desejar */
}

.preview-content {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

/* --- O CONTAINER DA IMAGEM SE ADAPTA AO TAMANHO DELA --- */
.preview-image-container {
  position: relative;
  display: inline-block;
  /* Elemento se molda exatamente ao tamanho do conteúdo */
  max-height: 85vh;
  /* Garante que a imagem nunca ultrapasse o limite vertical da tela */
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6);
  /* Sombra pesada para destacar a arte do fundo */
  background-color: #1a1a1a;
  /* Fundo interno neutro para o carregamento */
}

/* --- A IMAGEM REAL --- */
.preview-image {
  display: block;
  max-width: 100%;
  max-height: 85vh;
  /* Sincronizado com o container */
  object-fit: contain;
  /* Mantém a proporção exata da ilustração original sem esticar */
}

/* --- BOTÃO DE FECHAR ANCORADO NA ARTE --- */
.close-btn-wrapper {
  position: absolute;
  /* Fica preso ao topo direito da imagem, não importa a largura dela */
  top: 12px;
  right: 12px;
  z-index: 1000;
  pointer-events: auto !important;
}

.close-btn {
  background: rgba(0, 0, 0, 0.5) !important;
  /* Fundo escuro para dar contraste mesmo em artes claras */
  backdrop-filter: blur(8px);
  border-radius: 50% !important;
  width: 36px !important;
  height: 36px !important;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: background 0.2s ease;
}

.close-btn:hover {
  background: rgba(0, 0, 0, 0.8) !important;
}

/* --- ESCUDO DE PROTEÇÃO --- */
.protection-shield {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 20;
  background: transparent;
}

/* --- RESPONSIVIDADE PARA CELULARES --- */
@media (max-width: 959px) {

  .preview-image-container,
  .preview-image {
    max-height: 75vh;
    /* No mobile, reduz o tamanho vertical para caber confortavelmente */
  }

  .close-btn {
    width: 32px !important;
    height: 32px !important;
  }
}

/* --- AJUSTE PARA ECRÃS PEQUENOS (TELEMÓVEIS) --- */
@media (max-width: 959px) {
  .preview-image-container {
    max-width: 95vw;
    /* No telemóvel, aproveita melhor o espaço lateral */
    max-height: 60vh;
    /* Diminui um pouco a altura para sobrar espaço para o texto abaixo */
  }
}

.preview-image {
  -webkit-touch-callout: none;
  -webkit-user-drag: none;
  user-select: none;
  -webkit-user-select: none;
}

.gallery-section {
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: transparent;
}

.gallery-section {
  overflow-y: visible !important;
}

@media (max-width: 959px) {
  .scenery-vector-4 {
    width: 80%;
    top: -20px;
  }

  .scenery-vector-6 {
    width: 60%;
    top: -10px;
  }

  .nav-zone {
    width: 15%;
  }
}
</style>
