<script lang="ts" setup>
import { ref } from "vue";
// IMPORTANTE: Importamos a imagem como um módulo para o Vite processá-la corretamente
import logoImg from "@/assets/Logo-CB.png";

const sectionMap: Record<string, string> = {
  "About me": "about-me",
  Skills: "skills",
  Portfolio: "portfolio",
  Projects: "projects",
  Contact: "contact"
};

const menuItems = ref(Object.keys(sectionMap));
const drawer = ref(false);

function scrollToSection(sectionId: string) {
  const el = document.getElementById(sectionId);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  drawer.value = false;
}

function onLogoClick() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function onMenuClick(label: string) {
  const id = sectionMap[label];
  if (id) scrollToSection(id);
}
</script>

<template>
  <div>
    <v-app-bar color="primary" elevation="0" flat class="px-4 px-md-8">
      <v-container fluid class="pa-0 fill-height d-flex align-center justify-space-between">
        <div class="d-flex align-center" style="cursor: pointer" @click="onLogoClick">
          <v-img
            alt="Logo"
            :src="logoImg"
            transition="scale-transition"
            width="50"
            height="50"
            contain
          />
        </div>

        <v-spacer />

        <div class="d-none d-md-flex align-center">
          <v-btn
            v-for="(label, i) in menuItems"
            :key="i"
            variant="plain"
            class="px-2"
            @click="onMenuClick(label)"
          >
            <span class="custom-btn text-secondary mx-3">{{ label }}</span>
          </v-btn>
        </div>

        <div class="d-flex d-md-none">
          <v-btn icon="mdi-menu" variant="text" color="secondary" @click="drawer = !drawer" />
        </div>
      </v-container>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" location="right" temporary color="primary" width="250">
      <v-list class="pt-8">
        <v-list-item
          v-for="(label, i) in menuItems"
          :key="i"
          link
          class="py-3"
          @click="onMenuClick(label)"
        >
          <v-list-item-title class="text-secondary custom-drawer-item text-right pr-4">
            {{ label }}
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<style scoped>
.custom-btn {
  font-size: 14px;
  letter-spacing: 1px;
  text-transform: capitalize;
  font-weight: 500;
}

.custom-drawer-item {
  font-size: 16px;
  letter-spacing: 1px;
  text-transform: capitalize;
}

.v-toolbar__content > .v-container {
  height: 100%;
  max-width: 100%;
}
</style>