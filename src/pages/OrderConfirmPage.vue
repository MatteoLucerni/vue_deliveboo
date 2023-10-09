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
    <div class="background-color-page py-3">
        <div class="container">
            <h1 class="text-success py-3">Thanks! Your order has been placed correctly</h1>
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title mb-5">
                        Order Summary</h5>
                    <ul>
                        <li class="card-text" v-for="item in cartItems" :key="item.id">
                            <p>{{ item.name }} - {{ item.price }} € - {{ item.quantity }} quantity</p>
                        </li>
                    </ul>
                    <div class="d-flex justify-content-end">
                        <RouterLink @click="emptyCart" :to="{ name: 'home' }" class="btn btn-success">Return to home
                        </RouterLink>
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