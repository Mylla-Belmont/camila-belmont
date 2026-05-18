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
const showFullGallery = ref(false);
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

// Lógica para rolar a tela suavemente até a seção quando recolher a galeria
function toggleGallery(status: boolean) {
  showFullGallery.value = status;
  if (!status) {
    setTimeout(() => {
      const element = document.getElementById("portfolio");
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  }
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
      <img :src="vector4" alt="Background Scene Right" />
    </div>

    <Stars />
    <Jupiter />

    <v-row class="ml-2 ml-sm-6 pt-12 pt-sm-16 header-content" align="start" justify="start">
      <v-col cols="12" sm="10" md="8" lg="6" class="ml-4 ml-sm-8 ml-md-16">
        <div class="custom-name text-primary">Illustrations</div>
        <div class="custom-text text-primary mt-2 mb-6">
          Commissions and personal projects for fun
        </div>
      </v-col>
    </v-row>

    <transition name="gallery-fade" mode="out-in">
      <div v-if="!showFullGallery" key="carousel">
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

        <div class="text-center mt-12 mb-4">
          <v-btn class="cosmic-gallery-btn text-primary" size="large" @click="toggleGallery(true)">
            <span>Ver Galeria Completa</span>
            <v-icon class="ml-2 icon-transition" size="20">mdi-chevron-down</v-icon>
          </v-btn>
        </div>
      </div>

      <div v-else key="full" class="full-gallery">
        <v-row class="full-gallery-grid">
          <v-col v-for="item in galleryItems" :key="item.id" cols="12" sm="6" class="pa-3">
            <div class="full-gallery-card" @click="openPreview(item)">
              <div class="full-gallery-image-wrapper">
                <img :src="item.imageUrl" :alt="item.title" class="full-gallery-image" loading="lazy"
                  @contextmenu.prevent @dragstart.prevent />
                <div class="protection-shield" />
              </div>
            </div>
          </v-col>
        </v-row>

        <div class="text-center mt-12 mb-8">
          <v-btn class="cosmic-gallery-btn text-primary active" size="large" @click="toggleGallery(false)">
            <span>Recolher Galeria</span>
            <v-icon class="ml-2 icon-transition" size="20">mdi-chevron-up</v-icon>
          </v-btn>
        </div>
      </div>
    </transition>

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
  width: 100%;
  padding: 160px 0;
  position: relative;
}

/* --- VECTOR 4 (CANTO DIREITO) --- */
.scenery-vector-4 {
  position: absolute;
  top: -100px;
  right: 0;
  width: 20%;
  max-width: 600px;
  pointer-events: none;
  z-index: 1;
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
  font-size: clamp(32px, 6vw, 42px);
  font-weight: 800;
  letter-spacing: 1.5px;
}

.custom-text {
  font-size: clamp(14px, 2vw, 16px);
  letter-spacing: 1.2px;
  opacity: 0.9;
}

.gallery-item {
  flex-shrink: 0;
  border-radius: 20px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.4s cubic-bezier(0.25, 1, 0.5, 1);
}

.gallery-item:hover {
  transform: scale(1.04);
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
  user-select: none;
}

.protection-shield {
  position: absolute;
  inset: 0;
  z-index: 20;
  background: transparent;
  cursor: pointer;
}

.tool-chip {
  position: absolute;
  bottom: 12px;
  left: 12px;
  z-index: 3;
}

/* --- DIALOG PREVIEW ADAPTÁVEL --- */
.preview-card {
  background: transparent !important;
  overflow: visible !important;
}

.preview-content {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.preview-image-container {
  position: relative;
  display: inline-block;
  max-height: 85vh;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6);
  background-color: #1a1a1a;
}

.preview-image {
  display: block;
  max-width: 100%;
  max-height: 85vh;
  object-fit: contain;
}

.close-btn-wrapper {
  position: absolute;
  top: 12px;
  right: 12px;
  z-index: 1000;
  pointer-events: auto !important;
}

.close-btn {
  background: rgba(0, 0, 0, 0.5) !important;
  backdrop-filter: blur(8px);
  border-radius: 50% !important;
  width: 36px !important;
  height: 36px !important;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

/* --- TRANSITIONS --- */
.gallery-fade-enter-active,
.gallery-fade-leave-active {
  transition: opacity 0.4s ease;
}

.gallery-fade-enter-from,
.gallery-fade-leave-to {
  opacity: 0;
}

/* --- NOVO ESTILO: BOTÃO CÓSMICO GLASSMORPHISM --- */
.cosmic-gallery-btn {
  text-transform: none !important;
  letter-spacing: 1.5px;
  font-weight: 500;
  font-size: 15px !important;
  height: 54px !important;
  padding: 0 32px !important;
  border-radius: 30px !important;

  /* Efeito de Vidro Espacial Neutro */
  background: rgba(255, 255, 255, 0.04) !important;
  border: 1px solid rgba(255, 255, 255, 0.15) !important;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);

  box-shadow: 0 2px 16px 0 rgba(0, 0, 0, 0.16);
  transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1) !important;
}

.cosmic-gallery-btn:hover {
  background: rgba(255, 255, 255, 0.12) !important;
  border-color: rgba(255, 255, 255, 0.5) !important;
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.2), inset 0 0 12px rgba(255, 255, 255, 0.1);
  transform: translateY(-2px);
}

.cosmic-gallery-btn:active {
  transform: translateY(1px);
}

.icon-transition {
  transition: transform 0.3s ease;
}

.cosmic-gallery-btn:hover .icon-transition {
  transform: scale(1.2);
}

/* --- ESTILO DA NOVA PÁGINA (GRID COMPLETO) --- */
.full-gallery {
  padding: 0 6%;
  position: relative;
  z-index: 10;
}

.full-gallery-header {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 40px;
}

.back-btn {
  font-size: 14px;
  letter-spacing: 0.8px;
  text-transform: none !important;
  margin-bottom: 16px;
  padding-left: 0 !important;
  opacity: 0.8;
}

.back-btn:hover {
  opacity: 1;
}

.full-gallery-title {
  font-size: clamp(26px, 4vw, 36px);
  font-weight: 800;
  letter-spacing: 1.5px;
}

.full-gallery-grid {
  margin: 0 -12px;
}

.full-gallery-card {
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.4s cubic-bezier(0.25, 1, 0.5, 1);
  aspect-ratio: 16 / 10;
  position: relative;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.full-gallery-card:hover {
  transform: scale(1.02);
}

.full-gallery-image-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
}

.full-gallery-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* --- RESPONSIVIDADE MOBILE --- */
@media (max-width: 959px) {
  .scenery-vector-4 {
    width: 50%;
  }

  .full-gallery {
    padding: 0 4%;
  }

  .preview-image-container,
  .preview-image {
    max-height: 75vh;
  }

  .close-btn {
    width: 32px !important;
    height: 32px !important;
  }

  .cosmic-gallery-btn {
    height: 48px !important;
    padding: 0 24px !important;
    font-size: 14px !important;
  }
}
</style>