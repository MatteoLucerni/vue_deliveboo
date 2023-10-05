<script>
import AppHeader from '../components/AppHeader.vue'
export default {
    components: {
        AppHeader
    },
    data() {
        return {
            cartItems: []
        };
    },
    methods: {
        removeItem(itemId) {
            this.cartItems = this.cartItems.filter(item => item.id !== itemId);
            localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
        },
        updateHeader() {
            this.$refs.header.updateCartCount()
        },
        increaseQuantity(item) {
            item.quantity++
            localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
        },
        decreseQuantity(item) {
            item.quantity--
            localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
        }
    },
    created() {

        const storedItems = localStorage.getItem('cartItems');

        if (storedItems) {
            this.cartItems = JSON.parse(storedItems);
        }
    },
};
</script>

<template>
    <AppHeader ref="header" />
    <div class="background-color-page py-3">
        <div class="container">
            <div>
                <h2>Il tuo carrello:</h2>
                <ul class="list-unstyled">
                    <li v-for="item in cartItems" :key="item.id">
                        <div class="card my-3 px-5 d-flex flex-row align-items-center justify-content-between">
                            {{ item.name }} - {{ item.price }} €
                            <span class="text-danger">
                                <button class="btn border me-2" v-if="item.quantity > 1"
                                    @click="decreseQuantity(item)">Less</button>
                                {{ item.quantity }}
                                <button class="btn border ms-2" @click="increaseQuantity(item)">More</button>
                            </span>
                            <button class="btn btn-danger my-2"
                                @click="removeItem(item.id), updateHeader()">Rimuovi</button>
                        </div>
                    </li>
                </ul>
                <RouterLink :to="{ name: 'order-form', params: { cartItems: cartItems } }" class="btn btn-success">Procede
                    to next step</RouterLink>
            </div>
            <button @click="$router.back()" class="btn btn-secondary mt-4">Go back</button>
        </div>
    </div>
</template>

<style scoped>
.background-color-page {
    background-color: #ffebe3;
    height: 765px;
}
</style>