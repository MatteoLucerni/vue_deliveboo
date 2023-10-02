<script>
import axios from 'axios';
import AppAlert from '../components/AppAlert.vue';
import AppHeader from '../components/AppHeader.vue';
import AppLoader from '../components/AppLoader.vue';
export default {
    name: 'HomePage',
    components: {
        AppAlert,
        AppHeader,
        AppLoader
    },
    data() {
        return {
            restaurants: [],
            endpoint: 'http://127.0.0.1:8000/api/restaurants',
            errors: {},
            successMessage: null
        };
    },
    computed: {
        hasErrors() {
            return Object.keys(this.errors).length;
        },
        showAlert() {
            return Boolean(this.hasErrors || this.successMessage);
        },
        alertType() {
            return this.hasErrors ? 'danger' : 'success';
        }
    },
    methods: {
        fetchrestaurants() {
            axios.get(this.endpoint).then((res) => {
                this.restaurants = res.data.restaurants;
                console.log('done');
            }).catch((err) => console.error(err)).then((res) => { });
        }
    },
    created() {
        this.fetchrestaurants();
    },
};
</script>

<template>
    <AppLoader>
        <AppHeader />
        <div class="pt-5">
            <div class="container">
                <h1 class="text-center pb-3">Restaurants list</h1>
                <AppAlert :isOpen="showAlert" :type="alertType">
                    <div v-if="successMessage">{{ successMessage }}</div>
                    <ul v-if="hasErrors">
                        <li v-for="(error, field) in errors" :key="field">{{ error }}</li>
                    </ul>
                </AppAlert>
                <div class="buttons d-flex justify-content-between">
                    Filtri
                </div>
                <ul class="list-group py-5">
                    <li v-for="restaurant in restaurants"
                        class="list-group-item border rounded d-flex justify-content-between align-items-center p-4 my-2 bg-light">
                        <div class="d-flex align-items-center">
                            <img class="w-25 me-3"
                                :src="restaurant.image ?? 'https://www.areafit.it/wp-content/uploads/2022/08/placeholder.png'"
                                :alt="restaurant.name">
                            <div>
                                <h2 class="mb-2">{{ restaurant.name }}</h2>
                            </div>
                        </div>
                        <div class="d-flex">
                            <RouterLink class="btn btn-primary"
                                :to="{ name: 'restaurant-detail', params: { id: restaurant.id } }">
                                Details
                            </RouterLink>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </AppLoader>
</template>

<style scoped></style>
