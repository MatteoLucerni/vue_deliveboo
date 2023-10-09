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

            this.updateHeader()
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
    },
};
</script>

<template>
    <AppHeader ref="header" />
    <div class="bg-white pb-5">
        <video autoplay muted preload="auto" class="object-fit-contain">
            <source src="../../public/cart.mp4" type="video/mp4">
        </video>
        <div class="container">


            <div class="row my-4 box g-1" v-for="item in cartItems" :key="item.id">

                <div
                    class=" col-12 col-lg-7 d-flex align-items-center justify-content-center justify-content-lg-start  mb-3 mb-lg-0  ">
                    <div class="fs-5">
                        {{ item.name }} - {{ item.price }} €
                    </div>

                </div>
                <div
                    class=" col-12 col-sm-6 col-md-8 col-lg-3    justify-content-md-start justify-content-lg-end  d-flex align-items-end align-items-lg-center justify-content-center ">
                    <span>
                        <button class="button-secondary-db mx-3 " v-if="item.quantity > 1"
                            @click="changeQuantity(item, 'decrease')"><i class="fa-solid fa-minus"></i></button>
                        {{ item.quantity }}
                        <button class="button-secondary-db mx-3" @click="changeQuantity(item, 'increase')"><i
                                class="fa-solid fa-plus"></i></button>
                    </span>
                </div>
                <div
                    class="  col-12 col-sm-6 col-md-4 col-lg-2  justify-content-md-end d-flex align-items-center justify-content-lg-end justify-content-center mt-3 mt-md-0   ">
                    <button class="button-danger-db" @click="removeItem(item.id), updateHeader()"><strong>Remove</strong>
                    </button>
                </div>
            </div>

            <div class="my-4">
                <h3 v-if="!cartItems.length" class="text-danger text-center fw-bold">Cart is empty</h3>

                <div v-else class="row">
                    <!-- BACK BUTTON -->
                    <div class="col-12 col-lg-8 d-flex align-items-center justify-content-center justify-content-lg-start justify-content-xl-start">
                        <button @click="$router.back" class="button-main-db d-flex">
                            <div>
                                <strong><i class="fa-solid fa-arrow-left"></i></strong>
                            </div>
                            <div>
                                <strong><span class="d-none d-lg-block ms-2">Back</span></strong>
                            </div>
                        </button>
                    </div>
                    <div
                        class=" col-12 col-lg-2 d-flex align-items-center justify-content-center justify-content-lg-end my-4   ">
                        <div class="fs-5">Total price: {{
                            totalPrice }} €</div>
                    </div>

                    <div
                        class="  col-12 col-lg-2 d-flex align-items-center justify-content-center justify-content-lg-end justify-content-xl-end ">

                        <!-- CONFIRM BUTTON -->
                        <RouterLink :to="{ name: 'order-form' }" class="button-main-db">Confirm
                        </RouterLink>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.container {
    font-weight: bold;
}

.box {
    padding: 20px;
    border-radius: 12px;
    box-shadow: 0px 2px 8px #999898;
    background-color: #f6f6f6;

}

.margin {
    margin-top: 20px;
}
</style>