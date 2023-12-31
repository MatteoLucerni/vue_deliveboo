<script>
import AppHeader from '../components/AppHeader.vue';
import AppLoader from '../components/AppLoader.vue';
import axios from 'axios';

export default {
    components: {
        AppHeader,
        AppLoader
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
            errors: {},
            formValid: true,
            endpoint: 'http://127.0.0.1:8000/api/orders',
            paymentInfo: null,
            pageLoaded: true,
        };
    },
    methods: {
        // check @ is in a mail
        validateEmail(email) {
            const regex = /\S+@\S+\.\S+/;
            return regex.test(email);
        },
        //validation for form
        validateForm() {
            this.errors = {};
            this.formValid = true;
            //name
            if (!this.orderData.name.trim()) {
                this.errors.nameRequired = "Name is required";
                this.formValid = false;
            }
            //surname
            if (!this.orderData.surname.trim()) {
                this.errors.surnameRequired = "Surname is required";
                this.formValid = false;
            }
            //email
            if (!this.orderData.email.trim()) {
                this.errors.emailRequired = "Email is required";
                this.formValid = false;
            } else if (!this.validateEmail(this.orderData.email)) {
                this.errors.emailInvalid = "Email is invalid";
                this.formValid = false;
            }
            //tel
            if (!this.orderData.tel) {
                this.errors.telRequired = "tel is required";
                this.formValid = false;
            }
            if (isNaN(this.orderData.tel)) {
                this.errors.telInvalid = "tel is invalid";
                this.formValid = false;
            }
            //address
            if (!this.orderData.address.trim()) {
                this.errors.addressRequired = "Address is required";
                this.formValid = false;
            }
            return this.formValid

        },

        sendOrder() {
            if (!this.formValid) {
                return;
            }
            // Crea un oggetto che contiene sia i dati del carrello che quelli del form
            const requestData = {
                cartItems: this.cartItems,
                orderData: this.orderData,
                totalPrice: Number(this.totalPrice),
                paymentInfo: this.paymentInfo
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

            this.pageLoaded = false,
                form.addEventListener('submit', event => {
                    event.preventDefault();


                    dropinInstance.requestPaymentMethod((error, payload) => {
                        if (error) console.error(error);
                        console.log(payload)
                        document.getElementById('nonce').value = payload.nonce;
                        this.paymentInfo = payload;

                        this.sendOrder()
                    });

                });

        });
    },
};
</script>

<template>
    <AppLoader v-if="pageLoaded" />
    <AppHeader />
    <div class="container-fluid px-0 overflow-x-hidden">
        <video autoplay muted preload="auto" class="object-fit-cover">
            <source src="../../public/complete-order.mp4" type="video/mp4">
        </video>
        <div class="py-4">
            <div class="container">
                <div class="restaurant-card p-5">
                    <h2 class="py-2">Order Summary</h2>
                    <div class="card mb-4">
                        <div class="card-body">
                            <h5 class="card-title">Dishes</h5>
                            <ul class="px-0 pb-3 border-bottom border-dark">
                                <li v-for="item in this.cartItems" :key="item.id" class="card-text"><strong
                                        class="text-order">x
                                        {{ item.quantity
                                        }}</strong> {{ item.name }} - <span class="text-success text-size fw-bold">{{
    item.price
}}
                                        €</span>
                                </li>
                            </ul>
                            <h5 class="mt-3">Total: <strong class="text-success">{{ totalPrice }} €</strong></h5>
                        </div>
                    </div>
                    <h2 class="py-2">Customer Info and Payment method</h2>
                    <form id="payment-form" method="POST">
                        <div class="row">
                            <div class="col-md-6 col-12-md mb-2">
                                <label for="order-name" class="form-label">Name *</label>
                                <input required v-model="orderData.name" id="order-name" class="form-control" type="text"
                                    placeholder="Insert your name">
                            </div>
                            <div class="col-md-6 col-12 mb-2">
                                <label for="order-surname" class="form-label">Surname *</label>
                                <input required v-model="orderData.surname" id="order-surname" class="form-control"
                                    type="text" placeholder="Insert your surname">
                            </div>
                            <div class="col-md-6 col-12-sm mb-2">
                                <label for="order-email" class="form-label">Mail *</label>
                                <input required v-model="orderData.email" id="order-email" class="form-control" type="email"
                                    placeholder="Insert your email">
                            </div>
                            <div class="col-md-6 col-12-sm mb-2">
                                <label for="order-tel" class="form-label">Phone *</label>
                                <input required min="1000000000" max="9999999999" v-model="orderData.tel" id="order-tel"
                                    type="number" class="form-control" placeholder="Insert your phone">
                            </div>
                            <div class="col-12 mb-2">
                                <label for="order-address" class="form-label">Address *</label>
                                <input required v-model="orderData.address" id="order-address" type="text"
                                    class="form-control" placeholder="Insert your address">
                            </div>
                            <div class="col-12">
                                <label for="order-note" class="form-label">Note</label>
                                <textarea v-model="orderData.note" id="order-note" type="text"
                                    class="form-control"></textarea>
                            </div>
                            <div id="dropin-container"></div>
                            <div class="col-12 mt-3">
                                <div class="d-flex justify-content-end gap-3">
                                    <button @click="$router.back()" class="button-secondary-db">Go back</button>
                                    <button class="button-main-db">Send Order</button>
                                    <input type="hidden" id="nonce" name="payment_method_nonce" />
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

