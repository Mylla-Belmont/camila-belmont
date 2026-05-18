<script lang="ts" setup>
import Stars from "@/components/Stars.vue";
</script>

<template>
  <v-container id="about-me" fluid class="pa-0 relative-container organic-background">
    <v-container class="px-4 px-md-6 py-0">
      <v-row class="fill-height" align="start" justify="start">
        <v-col
          cols="12"
          sm="10"
          md="6"
          lg="5"
          class="ml-0 text-center text-md-left d-flex flex-column custom-align-col"
        >
          <div class="about-name text-primary mb-6">About me</div>
          
          <div class="about-text text-primary mb-4 pr-md-4">
            I am an interdisciplinary professional working at the intersection of technology,
            design, and creativity. I hold a Bachelor’s degree in Information Systems, a technical
            degree in Computer Networks, and I am currently pursuing a Master’s degree in Computer
            Science.
          </div>
          
          <div class="about-text text-primary pr-md-4">
            Alongside my strong background in technology, I have always had a deep interest in
            graphic design, digital illustration, and game development — fields in which I have
            continuously sought to grow and improve.
          </div>
        </v-col>
      </v-row>
    </v-container>

    <Stars />
  </v-container>
</template>

<style scoped>
.skills-wrapper,
.relative-container {
  overflow: hidden;
  max-width: 100vw;
}

.relative-container {
  position: relative;
  z-index: 0;
}

.organic-background {
  background-image: url("@/assets/Vector 2@2x.svg");
  background-size: auto;
  background-position: top left;
  min-height: auto;
  margin-top: 0;
  padding-bottom: 40px;
  background-repeat: no-repeat;
}

/* --- MEDIA QUERIES E DISTÂNCIAS EXATAS PRESERVADAS --- */

/* Medium screens */
@media (min-width: 481px) and (max-width: 959px) {
  .custom-align-col {
    padding-top: 15vh !important;
  }
}

/* Mobile */
@media (max-width: 480px) {
  .custom-align-col {
    padding-top: 40px !important;
  }
}

/* Desktop standard */
@media (min-width: 960px) {
  .organic-background {
    background-size: cover;
    background-position: top left;
    min-height: 100vh;
    margin-top: 0vh;
  }

  .custom-align-col {
    padding-top: 25vh !important;
  }
}

/* Large screens (> 1920px) */
@media (min-width: 1921px) {
  .custom-align-col {
    padding-top: min(25vh, 350px) !important;
  }
}

/* --- TIPOGRAFIA --- */
.about-name {
  font-size: clamp(24px, 5vw, 32px);
  letter-spacing: 1.2px;
  font-weight: 700;
}

.about-text {
  font-size: clamp(12px, 1.8vw, 15px);
  letter-spacing: 1px;
  line-height: 1.7;
  font-weight: 400;
}
</style>