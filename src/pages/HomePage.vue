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
        AppLoader,
    },
    data() {
        return {
            restaurants: {
                data: [],
                links: []
            },
            types: [],
            errors: {},
            successMessage: null,
            selectedFilters: [],
            keywordFilter: '',
            isLoading: false,
            showAllTypes: false,
            storage_path: 'http://127.0.0.1:8000/storage/'
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
        },
        filteredTypes() {
            return this.types.slice(0, this.showAllTypes ? this.types.length : 4);
        },
    },
    methods: {
        fetchrestaurants(endpoint = 'http://127.0.0.1:8000/api/restaurants') {
            this.isLoading = true;
            axios.get(endpoint)
                .then((res) => {
                    this.restaurants = {
                        data: res.data.restaurants.data,
                        links: res.data.restaurants.links
                    }
                    this.types = res.data.types;
                })
                .catch((err) => console.error(err)).then((res) => { })
                .then(() => { this.isLoading = false })
                ;
        },
        sendFilters(endpoint = 'http://127.0.0.1:8000/api/restaurants') {
            const filters = {
                filter: this.selectedFilters,
                keyword: this.keywordFilter
            };

            axios.get(endpoint, { params: filters })
                .then((res) => {
                    this.restaurants = {
                        data: res.data.restaurants.data,
                        links: res.data.restaurants.links
                    }
                })
                .catch((err) => console.error(err))
        }

    },
    created() {
        this.fetchrestaurants();
    },
    mounted() {
        const videoElement = document.querySelector('video');

        const playVideoDelayed = () => {
            setTimeout(() => {
                if (videoElement && videoElement.paused) {
                    videoElement.play();
                }
            }, 1000);
        };

        playVideoDelayed();
    },
};
</script>

<template>
    <div class="background-color-page">

        <AppHeader />
        <div class="container-fluid px-0 overflow-x-hidden">
            <video autoplay muted preload="auto" class="object-fit-contain">
                <source src="../../public/deliveboo-banner-orange.mp4" type="video/mp4">
            </video>
            <div class="pt-5 ">
                <div class="container">
                    <AppAlert :isOpen="showAlert" :type="alertType">
                        <div v-if="successMessage">{{ successMessage }}</div>
                        <ul v-if="hasErrors">
                            <li v-for="(error, field) in errors" :key="field">{{ error }}</li>
                        </ul>
                    </AppAlert>

                    <!-- Filters -->
                    <div class="filter-container filter-card d-flex flex-column p-4 mb-5">
                        <!-- Filter by type -->
                        <h5 class="text-center">Search By Type</h5>
                        <br>
                        <div class="buttons d-flex flex-wrap">
                            <div v-for="(rType, index) in filteredTypes" :key="rType.name"
                                :class="['form-check', index >= 0 && !showAllTypes ? 'd-none' : '', 'mx-2 badge rounded-pill text-dark border d-flex align-items-center pb-2 pe-3 my-2']">
                                <input @change="sendFilters()" v-model="selectedFilters" :value="rType.name"
                                    class="form-check-input ms-2" type="checkbox" :id="rType.name">
                                <label class="form-check-label ms-2" :for="rType.name">
                                    {{ rType.name }}
                                </label>
                            </div>
                        </div>
                        <!-- "Show More" button -->
                        <div class="text-center">
                            <button @click="showAllTypes = !showAllTypes" class="button-main-db mt-2">
                                {{ showAllTypes ? 'Hide' : 'Show types' }}
                            </button>
                        </div>
                        <!-- Filter by keyword -->
                        <h5 class="my-3 text-center pt-4">Search By Name</h5>
                        <input v-model="keywordFilter" class="form-control me-2" type="search" placeholder="Search"
                            aria-label="Search">
                        <div class="text-center mt-4">
                            <button @click="sendFilters()" class="button-main-db">Filter</button>
                        </div>
                    </div>
                </div>

                <!-- Layout Card (visible on mobile and tablet screens) -->
                <div class="layout-card d-sm-block d-md-block d-lg-none">
                    <!-- Your layout card content here -->
                </div>

                <div class="card-layout">
                    <!-- Restaurant Cards -->
                    <div class="container pt-5">
                        <div class="row">
                            <div v-if="restaurants.data.length" v-for="restaurant in restaurants.data"
                                class="col-12 col-md-6 col-lg-3 mb-4" :key="restaurant.id">
                                <div class="restaurant-card d-flex flex-column p-4 bg-light h-100 justify-content-between">
                                    <!-- Set a fixed aspect ratio for the images -->
                                    <div class="image-fluid ratio ratio-4x3 mb-3">
                                        <img class="rounded-3" :src="storage_path + restaurant.image"
                                            :alt="restaurant.name">
                                    </div>
                                    <h2 class="mb-2">{{ restaurant.name }}</h2>
                                    <small>Types:</small>
                                    <ul class="py-1 pb-3">
                                        <li v-for="rType in restaurant.types"><i class="fa-solid fa-bowl-food"></i> {{
                                            rType.name }}
                                        </li>
                                    </ul>
                                    <div class="text-center mt-3 mb-3">
                                        <RouterLink class="button-main-db"
                                            :to="{ name: 'restaurant-detail', params: { id: restaurant.id } }">
                                            Details
                                        </RouterLink>
                                    </div>
                                </div>
                            </div>
                            <li class="text-danger text-center col-12 pb-5" v-else>
                                <h3>No restaurants, try changing filters</h3>
                            </li>
                            <!-- Pagination -->
                            <nav v-if="restaurants.data.length" aria-label="Page navigation example mb-5">
                                <ul class="pagination justify-content-end mb-3 custom-pagination">
                                    <li class="page-item" v-for="link in restaurants.links"
                                        :class="[{ active: link.active }, { disabled: !link.url }]" :key="link.label">
                                        <button type="button" :disabled="!link.url" class="page-link" v-html="link.label"
                                            @click="fetchrestaurants(link.url)"></button>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <AppLoader v-if="isLoading" />
    </div>
</template>
