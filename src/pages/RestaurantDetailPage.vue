<script>
import axios from 'axios';
import AppHeader from '../components/AppHeader.vue';
import AppLoader from '../components/AppLoader.vue';
export default {
    name: 'RestaurantDetailPage',
    components: {
        AppHeader,
        AppLoader
    },
    data() {
        return {
            endpoint: 'http://127.0.0.1:8000/api/restaurants/' + this.$route.params.id,
            restaurant: {},
            plates: {},
            isLoading: false
        }
    },
    methods: {
        getRestaurant() {
            this.isLoading = true
            axios.get(this.endpoint).then(res => {
                this.restaurant = res.data.restaurant,
                    this.plates = res.data.plates
            }).catch(err => {
                this.$router.push({ name: 'not-found' })
            }).then(() => { this.isLoading = false })
        }
    },
    created() {
        this.getRestaurant()
    }
}
</script>

<template>
    <AppLoader v-if="isLoading" />
    <AppHeader />
    <div class="background-color-page py-3">
        <div class="container">

            <!-- BACK BUTTON -->
            <button @click="$router.push({ name: 'home' })"
                class="button-main-db mt-2 mb-4 d-flex  justify-content-center align-items-center">
                <div>
                    <strong><i class="fa-solid fa-arrow-left"></i></strong>
                </div>
                <div>
                    <strong><span class="d-none d-lg-block ms-2">Back</span></strong>
                </div>
            </button>

            <!-- RESTAURANT -->
            <div class="restaurant-card p-3">
                <div class="row">

                    <!-- restaurant name -->
                    <div class="col-12">
                        <h1 class="mb-4 fw-bolder text-center">{{ restaurant.name }}</h1>
                    </div>

                    <!-- restaurant image -->
                    <div class=" col-12 col-lg-6">
                        <img class="rounded-4 mb-3 img-fluid ratio ratio-4x3"
                            :src="restaurant.image ?? 'https://www.areafit.it/wp-content/uploads/2022/08/placeholder.png'"
                            :alt="restaurant.name">
                    </div>

                    <!-- restaurant details -->
                    <div class=" col-12 col-lg-6 d-flex align-items-center justify-content-center">
                        <div>
                            <h5><strong>Address: </strong>{{ restaurant.address }}</h5>
                            <h5 class="my-4"><strong>Phone: </strong>{{ restaurant.phone_number }}</h5>
                            <h5><strong>Info:</strong></h5>
                            <p><strong>{{ restaurant.description }}</strong></p>
                        </div>
                    </div>

                </div>
            </div>

            <!-- MENU -->
            <div class="restaurant-card my-4 p-3">
                <h1 class="mb-4 fw-bolder text-center">Menù</h1>
                <div class="row g-3">
                    <div v-for="plate in plates" :key="plate.id" class="col-sm-6 col-md-6 col-lg-4 col-xl-3">
                        <div class="restaurant-card h-100 p-3 plate-card">

                            <!-- dish image -->
                            <div class=" img-fluid ratio ratio-4x3  mb-4">
                                <img class="rounded-4"
                                    :src="plate.image ?? 'https://www.areafit.it/wp-content/uploads/2022/08/placeholder.png'"
                                    :alt="plate.name">
                            </div>

                            <!-- dish details -->
                            <div>
                                <h5><strong>{{ plate.name }}</strong></h5>
                                <h5><strong>€ {{ plate.price }}</strong></h5>
                                <small class="text-success fw-bold ">{{ plate.category.name }}</small>
                                <div><strong>{{ plate.ingredients }}</strong></div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            <!-- BACK BUTTON -->
            <button @click="$router.push({ name: 'home' })"
                class="button-main-db mt-4 mb-2 d-flex  justify-content-center align-items-center">
                <div>
                    <strong><i class="fa-solid fa-arrow-left"></i></strong>
                </div>
                <div>
                    <strong><span class="d-none d-lg-block ms-2">Back</span></strong>
                </div>
            </button>
        </div>
    </div>
</template>
    
<style scoped>
.background-color-page {
    background-color: #ffebe3;
}

.plate-card {
    background-color: #f6f6f6;

}
</style>