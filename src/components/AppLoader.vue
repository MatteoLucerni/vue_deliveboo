<script>
export default {
    data() {
        return {
            isLoading: true, // Inizialmente mostriamo il loader
        };
    },
    methods: {
        // Chiamato quando il contenuto dell'applicazione è stato caricato completamente
        contentLoaded() {
            this.isLoading = false; // Nascondiamo il loader
        },
    },
    mounted() {
        // Simuliamo un caricamento fittizio con un timeout di 3 secondi
        setTimeout(this.contentLoaded, 2000);
    },
};
</script>

<template>
    <div class="app-loader" v-if="isLoading">
        <div class="heart-loader">
            <div>
                <img class="heart" src="../../public/Yummy_Food.svg" alt="">
            </div>
        </div>
    </div>
    <div v-else>
        <!-- Contenuto dell'applicazione -->
        <slot></slot>
    </div>
</template>
  
<style>
.app-loader {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #F68949;
}

.heart-loader {
    animation: heartbeat 1s infinite;
}

.heart {
    border: 4px solid #f3f3f3;
    border-radius: 50%;
    width: 150px;
    height: 150px;
    position: relative;
    transform: rotate(-45deg);
    animation: heartpulse 1s infinite alternate;
}

@keyframes heartpulse {
    0% {
        transform: scale(1);
    }

    100% {
        transform: scale(1.2);
    }
}

@keyframes heartbeat {
    0% {
        transform: scale(1);
    }

    50% {
        transform: scale(1.1);
    }

    100% {
        transform: scale(1);
    }
}
</style>