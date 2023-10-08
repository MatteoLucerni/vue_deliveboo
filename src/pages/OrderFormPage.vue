<script>
import AppHeader from '../components/AppHeader.vue';
import axios from 'axios';

export default {
    components: {
        AppHeader
    },
    data() {
        return {
            cartItems: [],
            orderData: { // Aggiungi un oggetto per raccogliere i dati del form
                name: '',
                surname: '',
                email: '',
                tel: '',
                address: '',
                note: '',
            },
            endpoint: 'http://127.0.0.1:8000/api/orders'
        };
    },
    methods: {
        sendOrder() {
            // Crea un oggetto che contiene sia i dati del carrello che quelli del form
            const requestData = {
                cartItems: this.cartItems,
                orderData: this.orderData,
                totalPrice: Number(this.totalPrice)
            };

            // Invia i dati al backend
            axios.post(this.endpoint, requestData)
                .then(response => {
                    console.log('Ordine inviato con successo:', response.data);
                    this.$router.push({ name: 'order-confirm' });
                })
                .catch(error => {
                    // Gestisci eventuali errori
                    console.error('Errore nell\'invio dell\'ordine:', error);
                });
        },
    }, computed: {
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
    mounted() { // Spostiamo il codice all'interno di mounted()
        const form = document.getElementById('payment-form');

        braintree.dropin.create({
            container: document.getElementById('dropin-container'),
            authorization: 'sandbox_csjrhkwf_rpfz7j9mv8rwr28x',
            sandboxMerchantId: 'rpfz7j9mv8rwr28x',
            publickKey: 'r869z8337v2spxhs',
            privateKey: 'aab0bb29513f23f66139513f2cdccef6',
            // container: '#dropin-container'
        }, (error, dropinInstance) => {
            if (error) console.error(error);

            form.addEventListener('submit', event => {
                event.preventDefault();

                dropinInstance.requestPaymentMethod((error, payload) => {
                    if (error) console.error(error);
                    console.log(payload)
                    document.getElementById('nonce').value = payload.nonce;
                    this.sendOrder()
                });
            });
        });
    },
};
</script>

<template>
    <AppHeader />
    <div class="background-color-page py-3">
        <div class="container">
            <h2>
                Complete Your Order</h2>
            <div class="row">
                <div class="col-6">
                    <button @click="$router.back()" class="btn btn-secondary my-4">Go back</button>
                </div>
            </div>
            <!-- <form id="payment-form" action="POST" novalidate> -->
            <form id="payment-form" method="POST">
                <div class="row">
                    <div class="col-6">
                        <label for="order-name" class="form-label">Name</label>
                        <input v-model="orderData.name" id="order-name" class="form-control" type="text"
                            placeholder="Insert your name">
                    </div>
                    <div class="col-6">
                        <label for="order-surname" class="form-label">Surname</label>
                        <input v-model="orderData.surname" id="order-surname" class="form-control" type="text"
                            placeholder="Insert your surname">
                    </div>
                    <div class="col-6">
                        <label for="order-email" class="form-label">Mail</label>
                        <input v-model="orderData.email" id="order-email" class="form-control" type="email"
                            placeholder="Insert your email">
                    </div>
                    <div class="col-6">
                        <label for="order-tel" class="form-label">Phone</label>
                        <input v-model="orderData.tel" id="order-tel" type="number" class="form-control"
                            placeholder="Insert your phone">
                    </div>
                    <div class="col-12">
                        <label for="order-address" class="form-label">Address</label>
                        <input v-model="orderData.address" id="order-address" type="text" class="form-control"
                            placeholder="Insert your address">
                    </div>
                    <div class="col-12">
                        <label for="order-note" class="form-label">Note</label>
                        <textarea v-model="orderData.note" id="order-note" type="text" class="form-control"></textarea>
                    </div>
                    <div id="dropin-container"></div>
                    <div class="col-12 mt-3">
                        <div class="d-flex justify-content-end">
                            <button class="button-main-db">Send Order</button>
                            <input type="hidden" id="nonce" name="payment_method_nonce" />
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<style scoped>
.background-color-page {
    background-color: #ffebe3;

}
</style>