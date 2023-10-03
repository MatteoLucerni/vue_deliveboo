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
        <div class="container">

            <button @click="$router.push({ name: 'home' })" class="button-main-db mt-4 d-none d-md-block">Go back to
                home</button>
            <div class="restaurant-card p-3 mt-3">
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
                        <small class="text-success fw-bold ">{{ restaurant.vat_number }}</small>
                    </div>
                </div>
            </div>
            <div class="restaurant-card p-3 mt-3">
                <h1 class="mb-4 fw-bolder text-center">Menù</h1>
                <div class="row">
                    <div v-for="plate in plates" :key="plate.id" class="restaurant-card p-3 mt-3 col-md-3 col-lg-2">
                        <div>{{ plate.name }} {{ plate.category.name }} {{ plate.price }}</div>
                    </div>
                </div>
            </div>
        </div>
    </AppLoader>
</template>
    
<style scoped></style>