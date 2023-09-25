<script>
export default {
    name: 'NotFoundPage'
}
</script>

<template>
    <div class="vh-100 d-flex flex-column justify-content-center align-items-center">
        <h3>
            404 | Page not found
        </h3>
        <button @click="$router.push({ name: 'home' })" class="btn btn-secondary mt-4">Go back home</button>
    </div>
</template>

<style scoped></style>