<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";

interface GalleryItem {
  id: number;
  title: string;
  tool: string;
  imageUrl: string;
}

const galleryItems: GalleryItem[] = [
  {
    id: 1,
    title: "Abstract Dreamscape",
    tool: "Midjourney",
    imageUrl: "https://picsum.photos/seed/flow1/400/500"
  },
  {
    id: 2,
    title: "Urban Cyberpunk",
    tool: "Blender",
    imageUrl: "https://picsum.photos/seed/flow2/400/500"
  },
  {
    id: 3,
    title: "Minimalist Interface",
    tool: "Figma",
    imageUrl: "https://picsum.photos/seed/flow3/400/500"
  },
  {
    id: 4,
    title: "Ethereal Landscape",
    tool: "Photoshop",
    imageUrl: "https://picsum.photos/seed/flow4/400/500"
  },
  {
    id: 5,
    title: "Neon Dreams",
    tool: "Stable Diffusion",
    imageUrl: "https://picsum.photos/seed/flow5/400/500"
  },
  {
    id: 6,
    title: "Futuristic City",
    tool: "Unreal Engine",
    imageUrl: "https://picsum.photos/seed/flow6/400/500"
  },
  {
    id: 7,
    title: "Organic Bloom",
    tool: "Blender",
    imageUrl: "https://picsum.photos/seed/flow7/400/500"
  },
  {
    id: 8,
    title: "Cosmic Horizon",
    tool: "Midjourney",
    imageUrl: "https://picsum.photos/seed/flow8/400/500"
  }
];

const displayItems = computed(() => [...galleryItems, ...galleryItems]);

const trackRef = ref<HTMLElement | null>(null);
const isHovering = ref(false);
const dialogOpen = ref(false);
const selectedItem = ref<GalleryItem | null>(null);

const itemWidth = ref(300);
const itemHeight = ref(420);

const GAP = 24;
const SCROLL_SPEED = 55;

let position = 0;
let animationId: number | null = null;
let lastTime = 0;

const oneSetWidth = computed(() => galleryItems.length * (itemWidth.value + GAP));

// Adicionado mapeamento de cores para Unity e Godot em sintonia com o portfólio
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
  if (w < 600) {
    itemWidth.value = 180;
    itemHeight.value = 250;
  } else if (w < 960) {
    itemWidth.value = 240;
    itemHeight.value = 340;
  } else if (w < 1280) {
    itemWidth.value = 270;
    itemHeight.value = 380;
  } else {
    itemWidth.value = 300;
    itemHeight.value = 420;
  }
  
  if (position >= oneSetWidth.value) {
    position = position % oneSetWidth.value;
  }
}

function animate(time: number) {
  if (!lastTime) lastTime = time;
  let dt = (time - lastTime) / 1000;
  lastTime = time;
  dt = Math.min(dt, 0.1);

  if (!isHovering.value) {
    position += SCROLL_SPEED * dt;
    if (position >= oneSetWidth.value) {
      position -= oneSetWidth.value;
    }
    if (trackRef.value) {
      trackRef.value.style.transform = `translate3d(${-position}px, 0, 0)`;
    }
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
    <v-row class="ml-2 ml-sm-6 pt-12 pt-sm-16" align="center" justify="start">
      <v-col cols="12" sm="10" md="8" lg="6" class="ml-4 ml-sm-8 ml-md-16">
        <div class="custom-name text-primary">Illustrations</div>
        <div class="custom-text text-primary mt-2 mb-6">
          Commissions and personal projects for fun
        </div>
      </v-col>
    </v-row>

    <div
      class="gallery-container"
      @mouseenter="isHovering = true"
      @mouseleave="isHovering = false"
      @touchstart.passive="isHovering = true"
      @touchend.passive="isHovering = false"
    >
      <div class="gallery-viewport">
        <div ref="trackRef" class="gallery-track">
          <div
            v-for="(item, idx) in displayItems"
            :key="idx"
            class="gallery-item"
            :style="{ width: `${itemWidth}px`, height: `${itemHeight}px` }"
            @click="openPreview(item)"
          >
            <div class="gallery-image-wrapper">
              <img
                :src="item.imageUrl"
                :alt="item.title"
                class="gallery-image"
                loading="lazy"
                draggable="false"
              />
              <div class="item-overlay" />
              <v-chip
                :color="getToolColor(item.tool)"
                size="x-small"
                variant="flat"
                class="tool-chip"
                label
              >
                {{ item.tool }}
              </v-chip>
            </div>
          </div>
        </div>
      </div>
    </div>

    <v-dialog
      v-model="dialogOpen"
      fullscreen
      transition="dialog-bottom-transition"
      :scrim="false"
      content-class="preview-dialog-wrapper"
    >
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
            <v-chip :color="getToolColor(selectedItem.tool)" variant="flat" label>
              {{ selectedItem.tool }}
            </v-chip>
          </div>
        </div>
      </v-card>
    </v-dialog>
  </section>
</template>

<style scoped>
/* --- ESTILOS E POSICIONAMENTOS EXATOS PRESERVADOS --- */
.custom-name {
  font-size: clamp(28px, 6vw, 40px);
  letter-spacing: 1.7px;
  font-weight: bold;
}

.custom-text {
  font-size: clamp(13px, 2vw, 14px);
  letter-spacing: 1.7px;
}

.gallery-section {
  padding: clamp(40px, 8vw, 80px) 0;
  position: relative;
  overflow: hidden;
}

.gallery-container {
  position: relative;
  padding: 0 40px;
}

.gallery-viewport {
  overflow: hidden;
  -webkit-mask-image: linear-gradient(
    to right,
    transparent 0%,
    #000 4%,
    #000 96%,
    transparent 100%
  );
  mask-image: linear-gradient(to right, transparent 0%, #000 4%, #000 96%, transparent 100%);
}

.gallery-track {
  display: flex;
  gap: 24px;
  width: fit-content;
  will-change: transform;
}

.gallery-item {
  flex-shrink: 0;
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
  position: relative;
  transition: transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94),
    box-shadow 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.gallery-item:hover {
  transform: scale(1.04) translateY(-4px);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.35);
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
  display: block;
  transition: transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.gallery-item:hover .gallery-image {
  transform: scale(1.12);
}

.item-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50%;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.6), transparent);
  pointer-events: none;
}

.tool-chip {
  position: absolute;
  bottom: 12px;
  left: 12px;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.5px;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

.nav-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: rgba(255, 255, 255, 0.8);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  padding: 0;
  outline: none;
}

.nav-btn:hover {
  background: rgba(255, 255, 255, 0.15);
  border-color: rgba(255, 255, 255, 0.25);
  transform: translateY(-50%) scale(1.1);
}

.nav-btn:active {
  transform: translateY(-50%) scale(0.95);
}

.preview-card {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.close-btn {
  position: absolute !important;
  top: 24px;
  right: 24px;
  z-index: 20;
  background: rgba(255, 255, 255, 0.1) !important;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  transition: background 0.3s ease !important;
}

.close-btn:hover {
  background: rgba(255, 255, 255, 0.2) !important;
}

.preview-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
  max-width: 90vw;
  max-height: 90vh;
}

.preview-image-container {
  max-width: 80vw;
  max-height: 70vh;
  overflow: hidden;
  border-radius: 16px;
  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.5);
}

.preview-image {
  width: 100%;
  height: 100%;
  max-height: 70vh;
  object-fit: contain;
  display: block;
}

.preview-meta {
  display: flex;
  align-items: center;
  gap: 16px;
}

.preview-title {
  font-size: 24px;
  font-weight: 600;
  color: #fff;
  margin: 0;
  letter-spacing: 1px;
}

/* --- MEDIA QUERIES ORIGINAIS --- */
@media (max-width: 960px) {
  .gallery-section {
    padding: 60px 0;
  }

  .gallery-container {
    padding: 0 24px;
  }

  .gallery-track {
    gap: 16px;
  }

  .nav-btn {
    width: 38px;
    height: 38px;
  }

  .preview-title {
    font-size: 20px;
  }
}

@media (max-width: 600px) {
  .gallery-section {
    padding: 40px 0;
  }

  .gallery-container {
    padding: 0 16px;
  }

  .gallery-track {
    gap: 12px;
  }

  .tool-chip {
    bottom: 8px;
    left: 8px;
    font-size: 10px;
  }

  .nav-btn {
    width: 32px;
    height: 32px;
  }

  .close-btn {
    top: 16px;
    right: 16px;
  }

  .preview-title {
    font-size: 18px;
  }

  .preview-content {
    gap: 24px;
  }
}
</style>