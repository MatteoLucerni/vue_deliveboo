<script>
import AppHeader from '../components/AppHeader.vue';
export default {
    components: {
        AppHeader
    },
    data() {
        return {
        };
    },
    methods: {
        emptyCart() {
            this.cartItems = []
            localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
            console.log('Cart is now empty')
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
    }, created() {

        this.cartItems = this.$route.params.cartItems;

        const storedItems = localStorage.getItem('cartItems');

        if (storedItems) {
            this.cartItems = JSON.parse(storedItems);
        }
    },
    // Il resto del tuo componente
};
</script>

<template>
    <AppHeader />
    <div class="container-fluid px-0 overflow-x-hidden">
        <div class="pb-5">
            <video autoplay muted preload="auto" class="object-fit-contain">
                <source src="../../public/order.mp4" type="video/mp4">
            </video>
            <div class="container pt-4">
                <div class="restaurant-card p-5">
                    <h1 class="text-success py-3">Thanks! Your order has been placed correctly</h1>
                    <div class="card-body">
                        <h5 class="card-title mb-3">
                            Order Summary:</h5>
                        <ul class="px-0 pb-3 border-bottom border-dark">
                            <li v-for="item in this.cartItems" :key="item.id" class="card-text">
                                <strong class="text-order">x {{ item.quantity }}</strong> {{ item.name }} -
                                <span class="text-success text-size fw-bold">{{ item.price }} €</span>
                            </li>
                        </ul>
                        <h5 class="mt-3">Total: <strong class="text-success">{{ totalPrice }} €</strong></h5>
                        <div class="d-flex justify-content-end">
                            <RouterLink @click="emptyCart" :to="{ name: 'home' }" class="btn button-main-db">Return to home
                            </RouterLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.background-color-page {
    background-color: #ffebe3;
    min-height: 100vh;
    min-width: 100vw;
}
</style>