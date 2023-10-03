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
            types: [],
            endpoint: 'http://127.0.0.1:8000/api/restaurants',
            errors: {},
            successMessage: null,
            selectedFilters: [],
            keywordFilter: ''
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
                this.types = res.data.types;
            }).catch((err) => console.error(err)).then((res) => { });
        },
        sendFilters() {
            const filters = {
                filter: this.selectedFilters,
                keyword: this.keywordFilter
            };

            axios.get(this.endpoint, { params: filters })
                .then((res) => {
                    this.restaurants = res.data.restaurants;
                })
                .catch((err) => console.error(err))
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
                <!-- Filters -->
                <div class="filter-container restaurant-card d-flex flex-column p-4">
                    <!-- Filter by type -->
                    <h5>Filter by type</h5> <br>
                    <div class="buttons d-flex flex-wrap">
                        <div v-for="rType in types"
                            class="form-check mx-2 badge rounded-pill text-dark border d-flex align-items-center pb-2 pe-3"
                            :key="rType.name">
                            <input v-model="selectedFilters" :value="rType.name" class="form-check-input ms-2"
                                type="checkbox" :id="rType.name">
                            <label class="form-check-label ms-2" :for="rType.name">
                                {{ rType.name }}
                            </label>
                        </div>
                    </div>
                    <!-- Filter by keyword -->
                    <h5 class="my-3">Search restaurant</h5>
                    <input v-model="keywordFilter" class="form-control me-2" type="search" placeholder="Search"
                        aria-label="Search">
                    <div class="text-center mt-4">
                        <button @click="sendFilters()" class="button-main-db w-25">Filter</button>
                    </div>
                </div>
                <ul class="list-group py-5">
                    <li v-if="restaurants.length" v-for="restaurant in restaurants"
                        class="restaurant-card d-flex justify-content-between align-items-center p-4 my-2 bg-light">
                        <div class="d-flex align-items-center">
                            <img class="restaurant-image rounded-3 me-3"
                                :src="restaurant.image ?? 'https://www.areafit.it/wp-content/uploads/2022/08/placeholder.png'"
                                :alt="restaurant.name">
                            <div>
                                <h2 class="mb-2 py-2">{{ restaurant.name }}</h2>
                                <small>Types:</small>
                                <ul>
                                    <li v-for="rType in restaurant.types">{{ rType.name }}</li>
                                </ul>
                            </div>
                        </div>
                        <div class="text-center mt-3 mb-3">
                            <RouterLink class="button-main-db"
                                :to="{ name: 'restaurant-detail', params: { id: restaurant.id } }">
                                Details
                            </RouterLink>
                        </div>
                    </li>
                    <li class="text-danger text-center list-unstyled " v-else>
                        <h3>No restaurants, try changing filters</h3>
                    </li>
                </ul>
            </div>
        </div>
    </AppLoader>
</template>  

<style scoped></style>
