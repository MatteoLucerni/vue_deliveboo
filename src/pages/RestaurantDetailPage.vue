<script>
import axios from 'axios';
import AppHeader from '../components/AppHeader.vue'
export default {
    name: 'RestaurantDetailPage',
    components: {
        AppHeader
    },
    data() {
        return {
            endpoint: 'http://127.0.0.1:8000/api/restaurants/' + this.$route.params.id,
            restaurant: {}
        }
    },
    methods: {
        getrestaurant() {
            axios.get(this.endpoint).then(res => {
                this.restaurant = res.data
            }).catch(err => {
                this.$router.push({ name: 'not-found' })
            })
        }
    },
    created() {
        this.getrestaurant()
    }
}
</script>

<template>
    <AppHeader />
    <div class="container border rounded p-5 mt-5">
        <h1 class="mb-5 fw-bolder ">{{ restaurant.name }}</h1>
        <div class="d-flex">
            <img class="w-25" :src="restaurant.image ?? 'https://www.areafit.it/wp-content/uploads/2022/08/placeholder.png'"
                :alt="restaurant.name"><br>
            <div class="ms-3">
                <h6>{{ restaurant.address }}</h6>
                <small class="text-success fw-bold ">{{ restaurant.vat_number }}</small>
            </div>
        </div>

        <button @click="$router.push({ name: 'home' })" class="btn btn-secondary mt-4">Go back to home</button>
    </div>
</template>

<style scoped></style>