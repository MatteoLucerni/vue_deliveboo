<script>
import AppHeader from '../components/AppHeader.vue'
export default {
    components: {
        AppHeader
    }
};
</script>

<template>
    <AppHeader />
    <div class="background-color-page py-3">
        <div class="container">
            <h1>Cart Page</h1>
            <button @click="$router.back()" class="btn btn-secondary mt-4">Go back</button>
        </div>
    </div>
</template>

<style scoped>
.background-color-page {
    background-color: #ffebe3;
    height: 765px;
}
</style>