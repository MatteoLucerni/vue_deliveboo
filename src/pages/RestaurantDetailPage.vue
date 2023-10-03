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
        }
    },
    methods: {
        getRestaurant() {
            axios.get(this.endpoint).then(res => {
                this.restaurant = res.data.restaurant,
                    this.plates = res.data.plates
            }).catch(err => {
                this.$router.push({ name: 'not-found' })
            })
        }
    },
    created() {
        this.getRestaurant()
    }
}
</script>

<template>
    <AppLoader>

        <AppHeader />
        <div class="backgrund-color-page pt-3">
            <div class="container">

                <!-- *****TO DO FIX**** -->
                <button @click="$router.push({ name: 'home' })" class="button-main-db mb-3 d-none d-md-block">Go back to
                    home</button>
                <!-- *******************-->

                <div class="restaurant-card p-3">
                    <div class="row">
                        <div class="col-sm">
                            <h1 class="mb-4 fw-bolder text-center">{{ restaurant.name }}</h1>
                        </div>
                        <div class="col-sm">
                            <img class="img-fluid rounded-4 mb-4"
                                :src="restaurant.image ?? 'https://www.areafit.it/wp-content/uploads/2022/08/placeholder.png'"
                                :alt="restaurant.name"><br>
                        </div>
                        <div class="col-sm">
                            <h6>{{ restaurant.address }}</h6>

                            <!-- *****Aggiungere cose del ristorante**** -->
                            <small class="text-success fw-bold "></small>

                        </div>
                    </div>
                </div>
                <div class="restaurant-card mt-3 p-3">
                    <h1 class="mb-4 fw-bolder text-center">Menù</h1>
                    <div class="row g-3">
                        <div v-for="plate in plates" :key="plate.id" class="col-6">
                            <div class="restaurant-card h-100 p-3 plate-card">
                                <div>
                                    <img class="w-100 rounded-4 mb-4 h-fix"
                                        :src="plate.image ?? 'https://www.areafit.it/wp-content/uploads/2022/08/placeholder.png'"
                                        :alt="plate.name"><br>
                                </div>
                                <div>
                                    <h6><strong>{{ plate.name }}</strong></h6>
                                    <h6>{{ plate.price }} </h6>
                                    <small class="text-success fw-bold ">{{ plate.category.name }}</small>
                                    <p class="fw-bold ">{{ plate.ingredients }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </AppLoader>
</template>
    
<style scoped>
.backgrund-color-page {
    background-color: #ffebe3;
}

.plate-card {
    background-color: #f6f6f6;
}

/* FIXARE DIMENSIONI IMMAGINE */
.h-fix {
    height: 120px;
}
</style>