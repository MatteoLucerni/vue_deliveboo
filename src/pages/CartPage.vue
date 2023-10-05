<script>
import { callWithAsyncErrorHandling } from 'vue';
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
        changeQuantity(item, direction) {
            if (direction === 'increase') {
                item.quantity++;
            } else if (direction === 'decrease' && item.quantity > 1) {
                item.quantity--;
            }

            localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
        }

    },
    computed: {
        totalPrice() {
            let totalPrice = 0;
            this.cartItems.forEach(item => {
                totalPrice = totalPrice + (item.price * item.quantity)
            });

            totalPrice = totalPrice.toFixed(2)

            return totalPrice
        }
    },
    created() {
        const storedItems = localStorage.getItem('cartItems');

        if (storedItems) {
            this.cartItems = JSON.parse(storedItems);
        }

        console.log(this.cartItems)
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
                                    @click="changeQuantity(item, 'decrease')">Less</button>
                                {{ item.quantity }}
                                <button class="btn border ms-2" @click="changeQuantity(item, 'increase')">More</button>
                            </span>
                            <button class="btn btn-danger my-2"
                                @click="removeItem(item.id), updateHeader()">Rimuovi</button>
                        </div>
                    </li>
                </ul>
                <div class="my-3">Totale ordine: {{ totalPrice }} €</div>
                <button class="btn btn-success">Procede to next step</button>
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