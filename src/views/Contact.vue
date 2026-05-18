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
/* --- CONTAINER MESTRE DE CONTATO --- */
.contact-wrapper {
    position: relative;
    z-index: 1;
    max-width: 100vw;
}

/* --- TRATAMENTO DO VETOR 5 (SEM CORTES) --- */
.contact-background {
    background-image: url("@/assets/Vector 5@2x.svg");
    background-position: bottom center;
    background-repeat: no-repeat;

    /* Uso do contain garante que a proporção exata do desenho seja preservada */
    background-size: contain;

    /* Define uma altura mínima baseada na proporção do desenho para não achatar */
    min-height: 60vh;
    display: flex;
    align-items: flex-end;
    padding-bottom: 60px;
}

/* --- CAMADA DE CONTEÚDO ACIMA DO VETOR --- */
.content-layer {
    position: relative;
    z-index: 5;
}

/* --- AJUSTES DE TELA (MEDIA QUERIES ATUALIZADAS) --- */

/* Dispositivos Médios e Mobile */
@media (max-width: 959px) {
    .contact-background {
        background-size: 100% auto;
        /* Força o vetor a ocupar toda a largura no celular */
        min-height: 45vh;
        padding-bottom: 40px;
    }
}

/* Telas Grandes (Desktop) */
@media (min-width: 960px) {
    .contact-background {
        background-size: 100% auto;
        /* Impede o efeito "cover" que corta as laterais */
        min-height: 80vh;
        /* Dá o tamanho ideal para o rodapé espacial */
    }
}

/* --- ANIMAÇÃO DE ENTRADA SUAVE --- */
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
</style>