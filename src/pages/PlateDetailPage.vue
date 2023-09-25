<script>
import axios from 'axios';
export default {
    name: 'PlateDetailPage',
    components: {

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
                console.log(this.plate)
            }).catch(err => console.error(err))
        }
    },
    created() {
        this.getPlate()
    }
}
</script>

<template>
    <h1 class="my-5 fw-bolder ">{{ plate.name }}</h1>
    <img class="w-25" :src="plate.image" :alt="plate.name"><br>
    <small>{{ plate.price }}</small>
    <h6>{{ plate.ingredients }}</h6>
    <p>{{ plate.description }}</p>
</template>

<style scoped></style>