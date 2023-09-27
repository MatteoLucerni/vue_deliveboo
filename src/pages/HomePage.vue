<script>
import axios from 'axios';
import AppAlert from '../components/AppAlert.vue';
import AppHeader from '../components/AppHeader.vue';
export default {
    name: 'HomePage',
    components: {
        AppAlert,
        AppHeader
    },
    data() {
        return {
            plates: [],
            endpoint: 'http://127.0.0.1:8000/api/plates',
            errors: {},
            successMessage: null
        };
    },
    computed: {
        hasErrors() {
            return Object.keys(this.errors).length;
        },
        showAlert() {
            return Boolean(this.hasErrors || this.successMessage);
        },
        alertType() {
            return this.hasErrors ? 'danger' : 'success';
        }
    },
    methods: {
        fetchPlates() {
            axios.get(this.endpoint).then((res) => {
                this.plates = res.data.plates;
                console.log('done');
            }).catch((err) => console.error(err)).then((res) => { });
        },
        deletePlate(id) {
            axios.delete(this.endpoint + '/' + id).then((res) => {
                console.log('Deleted', res.data);
                this.fetchPlates();
                this.successMessage = 'Plate moved to trash successfully'
            }).catch(err => {
                if (err.response.status === 400) {
                    const { errors } = err.response.data;
                    const errorMessage = {};
                    for (let field in errors) errorMessage[field] = errors[field][0];
                    this.errors = errorMessage;
                } else {
                    console.error(err);
                    this.errors = { network: 'Error!' }
                }
            });
        },
        confirmDelete(id) {
            const hasConfirmed = confirm(
                `Are you sure that you want to move to trash this plate?`
            );

            if (hasConfirmed) this.deletePlate(id);
        },
    },
    created() {
        this.fetchPlates();
    },
};
</script>

<template>
    <AppHeader />
    <div class="bg-pink pt-5">
        <div class="container">
            <h1 class="text-center">Plates list</h1>
            <AppAlert :isOpen="showAlert" :type="alertType">
                <div v-if="successMessage">{{ successMessage }}</div>
                <ul v-if="hasErrors">
                    <li v-for="(error, field) in errors" :key="field">{{ error }}</li>
                </ul>
            </AppAlert>
            <div class="buttons text-end">
                <RouterLink class="btn btn-success" :to="{ name: 'create-plate' }">
                    Create a new plate
                </RouterLink>
                <RouterLink class="btn btn-secondary ms-2" :to="{ name: 'plates-trash' }">
                    Go to trash bin
                </RouterLink>
            </div>
            <ul class="list-group mt-4 py-5">
                <li v-for="plate in plates"
                    class="list-group-item border rounded d-flex justify-content-between align-items-center p-4 my-2">
                    <div class="d-flex align-items-center">
                        <img class="w-25 me-3"
                            :src="plate.image ?? 'https://www.areafit.it/wp-content/uploads/2022/08/placeholder.png'"
                            :alt="plate.name">
                        <div>
                            <h2 class="mb-2">{{ plate.name }}</h2>
                            <p class="mb-0">{{ plate.price }}</p>
                        </div>
                    </div>
                    <div class="d-flex">
                        <RouterLink class="btn btn-primary me-2" :to="{ name: 'plate-detail', params: { id: plate.id } }">
                            Details
                        </RouterLink>
                        <RouterLink class="btn btn-success me-2" :to="{ name: 'edit-plate', params: { id: plate.id } }">
                            Edit
                        </RouterLink>
                        <button @click="confirmDelete(plate.id)" class="btn btn-danger">Delete</button>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<style scoped>
.bg-pink {
    background: rgb(142, 142, 142);
    background: linear-gradient(0deg, rgba(142, 142, 142, 1) 0%, rgba(182, 182, 182, 1) 45%, rgba(245, 245, 245, 1) 100%);
}
</style>
