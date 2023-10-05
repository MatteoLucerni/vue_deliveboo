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
    <AppHeader />
    <div class="background-color-page py-3">
        <div class="container">
            <div>
                <h2>Il tuo carrello:</h2>
                <ul>
                    <li v-for="item in cartItems" :key="item.id">
                        {{ item.name }} - {{ item.price }} €
                        <button @click="removeItem(item.id)">Rimuovi</button>
                    </li>
                </ul>
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