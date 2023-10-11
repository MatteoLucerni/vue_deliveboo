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
            plates: [],
            isLoading: false,
            storage_path: 'http://127.0.0.1:8000/storage/',
            cartItems: [],
        }
    },
    methods: {
        getRestaurant() {
            this.isLoading = true
            axios.get(this.endpoint).then(res => {
                this.restaurant = res.data.restaurant
                this.plates = res.data.restaurant.plates
            }).catch(err => {
                this.$router.push({ name: 'not-found' })
            }).then(() => { this.isLoading = false })
        },
        addToCart(itemToAdd) {
            const existingItemIndex = this.cartItems.findIndex(item => item.id === itemToAdd.id);
            let checkPassed = true;
            this.cartItems.forEach(item => {
                if (item.restaurant_id != itemToAdd.restaurant_id) {
                    checkPassed = false
                }
            });

            if (checkPassed) {
                if (existingItemIndex !== -1) {
                    this.cartItems[existingItemIndex].quantity += 1;
                } else {
                    this.cartItems.push({ ...itemToAdd, quantity: 1 });
                }
                localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
            } else {
                this.startModal(itemToAdd);
            }
        },
        updateHeader() {
            this.$refs.header.updateCartCount()
        },
        startModal(item) {
            const deleteModal = document.getElementById('deleteModal');
            const confirmButton = document.getElementById('confirm-button');
            const bootstrapModal = new bootstrap.Modal(deleteModal);
            bootstrapModal.show();
            confirmButton.addEventListener('click', () => {
                this.emptyCart();
                this.addToCart(item)
                this.updateHeader();
            })
        },
        emptyCart() {
            this.cartItems = []
            localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
            console.log('Cart is now empty')
        }
    },

    computed: {
        visiblePlates() {
            return this.plates.filter(plate => plate.is_visible);
        }
    },

    created() {

        this.getRestaurant()

        const storedItems = localStorage.getItem('cartItems');

        if (storedItems) {
            this.cartItems = JSON.parse(storedItems);
        }
    }
}
</script>

<template>
    <AppLoader v-if="isLoading" />
    <AppHeader ref="header" />
    <div class="background-color-page pt-4">
        <div class="container">
            <!-- Modal -->
            <div class="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Delete Confirmation</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <p>You already have plates in the cart from another restaurant. Do you want to discard them and
                                create a new cart in this new restaurant?</p>
                        </div>
                        <div class="modal-footer">
                            <button id="confirm-button" type="button" class="btn button-warning-db"
                                data-bs-dismiss="modal">Discard items in the
                                cart</button>
                            <button type="button" class="btn button-secondary-db" data-bs-dismiss="modal">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- RESTAURANT -->
            <div class="restaurant-card p-3 ">
                <div class="row">

                    <!-- restaurant name -->
                    <div class="col-12">
                        <h1 class="mb-4 fw-bolder text-center">{{ restaurant.name }}</h1>
                    </div>

                    <!-- restaurant image -->
                    <div v-if="restaurant.image" class=" col-12 col-lg-6">
                        <img class="rounded-4 mb-3 img-fluid ratio ratio-4x3" :src="storage_path + restaurant.image"
                            :alt="restaurant.name">
                    </div>

                    <!-- restaurant details -->
                    <div class=" col-12 col-lg-6 d-flex align-items-center justify-content-center">
                        <div>
                            <h5><strong>Address: </strong>{{ restaurant.address }}</h5>
                            <h5 class="my-4"><strong>Phone: </strong>{{ restaurant.phone_number }}</h5>
                            <h5><strong>Info:</strong></h5>
                            <p>{{ restaurant.description }}</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
        <!-- MENU -->
        <div class="card-layout mt-4 p-3">
            <div class="container">

                <h1 class="mb-4 fw-bolder text-center">Menù</h1>
                <div class="row g-3">
                    <div v-if="plates.length" v-for="plate in visiblePlates" :key="plate.id"
                        class="col-sm-6 col-md-6 col-lg-4 col-xl-3">
                        <div class="restaurant-card h-100 p-3 plate-card">

                            <!-- dish image -->
                            <div @click="addToCart(plate), updateHeader()"
                                class=" img-fluid ratio ratio-4x3 mb-4 img-hover">
                                <img class="rounded-4 object-fit-cover" :src="storage_path + plate.image" :alt="plate.name">
                                <button class="button-cart-db rounded-4"><i
                                        class="fa-solid fa-cart-shopping text-dark back-icon"></i></button>
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
                    <div class="text-danger text-center fs-2" v-else>No dishes available</div>
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


    </div>
</template>
    
<style scoped lang="scss">
.background-color-page {
    background-color: #ffebe3;
}

.plate-card {
    background-color: #f6f6f6;
}

.img-hover:hover .button-cart-db {
    display: block;
}
</style>