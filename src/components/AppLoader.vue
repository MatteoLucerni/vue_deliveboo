<script>
export default {
};
</script>

<template>
    <div class="app-loader">
        <div class="heart-loader">
            <div>
                <img class="heart" src="../../public/Yummy_Food.svg" alt="">
            </div>
        </div>
    </div>
</template>
  
<style>
.app-loader {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 3;
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