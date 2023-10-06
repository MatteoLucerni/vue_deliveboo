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
                })
                .catch(error => {
                    // Gestisci eventuali errori
                    console.error('Errore nell\'invio dell\'ordine:', error);
                });
        }
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
    // Il resto del tuo componente
};
</script>

<template>
    <AppHeader />
    <div class="background-color-page py-3">
        <div class="container">
            <h2>Finalizza il tuo ordine</h2>
            <div class="row">
                <div class="col-6">
                    <button @click="$router.back()" class="btn btn-secondary my-4">Go back</button>
                </div>
                <div class="col-6">
                    <ul class="list-unstyled">
                        <h3 class="text-center">Riepielogo ordine</h3>
                        <li v-for="item in cartItems" :key="item.id">
                            <div class="card my-3 px-5 d-flex flex-row align-items-center justify-content-between">
                                <p>{{ item.name }} - {{ item.price }} € - {{ item.quantity }} quantity</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <form action="POST" @submit.prevent="sendOrder" novalidate>
                <div class="row">
                    <div class="col-6">
                        <label for="order-name" class="form-label">Nome</label>
                        <input v-model="orderData.name" id="order-name" class="form-control" type="text"
                            placeholder="Inserisci il tuo nome">
                    </div>
                    <div class="col-6">
                        <label for="order-surname" class="form-label">Cognome</label>
                        <input v-model="orderData.surname" id="order-surname" class="form-control" type="text"
                            placeholder="Inserisci il tuo cognome">
                    </div>
                    <div class="col-6">
                        <label for="order-email" class="form-label">Mail</label>
                        <input v-model="orderData.email" id="order-email" class="form-control" type="email"
                            placeholder="Inserisci la tua email">
                    </div>
                    <div class="col-6">
                        <label for="order-tel" class="form-label">telefono</label>
                        <input v-model="orderData.tel" id="order-tel" type="number" class="form-control"
                            placeholder="Inserisci il tuo telefono">
                    </div>
                    <div class="col-12">
                        <label for="order-address" class="form-label">Indirizzo</label>
                        <input v-model="orderData.address" id="order-address" type="text" class="form-control"
                            placeholder="Inserisci il tuo Indirizzo">
                    </div>
                    <div class="col-12">
                        <label for="order-note" class="form-label">Note</label>
                        <textarea v-model="orderData.note" id="order-note" type="text" class="form-control"></textarea>
                    </div>
                    <div class="col-12">
                        <p>{{ totalPrice }}</p>
                    </div>
                    <div class="col-12 mt-3">
                        <div class="d-flex justify-content-end">
                            <button class="btn btn-success">Invia l'ordine</button>
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
    height: 765px;
}
</style>