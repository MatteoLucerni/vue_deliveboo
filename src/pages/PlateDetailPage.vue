<script>
import axios from 'axios';
import AppHeader from '../components/AppHeader.vue'
export default {
    name: 'PlateDetailPage',
    components: {
        AppHeader
    },
    data() {
        return {
            endpoint: 'http://127.0.0.1:8000/api/plates/' + this.$route.params.id,
            plate: {}
        }
    },
    methods: {
        getPlate() {
            axios.get(this.endpoint).then(res => {
                this.plate = res.data
            }).catch(err => {
                this.$router.push({ name: 'not-found' })
            })
        }
    },
    created() {
        this.getPlate()
    }
}
</script>

<template>
    <AppHeader />
    <div class="container border rounded p-5 mt-5">
        <h1 class="mb-5 fw-bolder ">{{ plate.name }}</h1>
        <div class="d-flex">
            <img class="w-25" :src="plate.image" :alt="plate.name"><br>
            <div class="ms-3">
                <h6>{{ plate.ingredients }}</h6>
                <small class="text-success fw-bold ">{{ plate.price }}€</small>
                <p>{{ plate.description }}</p>
            </div>
        </div>

        <button @click="$router.push({ name: 'home' })" class="btn btn-secondary mt-4">Go back to home</button>
    </div>
</template>

<style scoped></style>