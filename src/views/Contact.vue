<script lang="ts" setup>
import Stars from "@/components/Stars.vue";
</script>

<template>
  <v-container id="contato" fluid class="pa-0 contact-wrapper contact-background">
    <v-container class="px-6 px-md-16 content-layer">
      <v-row class="fill-height mt-md-12" align="center" justify="center">

        <v-col cols="12" md="8" lg="6" class="text-center d-flex flex-column justify-center">
        </v-col>

      </v-row>
    </v-container>

    <Stars />
  </v-container>
</template>

<style scoped>
/* ============================================================
   1. CONTÊINER PRINCIPAL
   ============================================================ */
.contact-wrapper {
  position: relative;
  z-index: 1;
  max-width: 100vw;
}

/* ============================================================
   2. FUNDO COM VECTOR 5
   ============================================================ */
.contact-background {
  background-image: url("@/assets/Vector 5@2x.svg");
  background-position: bottom center;
  background-repeat: no-repeat;
  background-size: contain;
  min-height: 100vh;
  padding-bottom: 120px;
}

/* ============================================================
   3. CAMADA DE CONTEÚDO
   ============================================================ */
.content-layer {
  position: relative;
  z-index: 5;
}

/* ============================================================
   4. ANIMAÇÃO DE ENTRADA
   ============================================================ */
@keyframes fadeSlideIn {
  from {
    opacity: 0;
    transform: translateY(30px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.v-row {
  position: relative;
  animation: fadeSlideIn 1.2s ease-out;
}

/* ============================================================
   5. RESPONSIVIDADE
   ============================================================ */
@media (max-width: 959px) {
  .contact-background {
    background-size: 100% auto;
    min-height: 20vh;
    padding-bottom: 40px;
  }
}

@media (min-width: 960px) {
  .contact-background {
    background-size: 100% auto;
    min-height: 100vh;
  }
}
</style>