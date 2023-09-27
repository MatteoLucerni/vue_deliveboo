<script>
import axios from 'axios';
import AppAlert from '../components/AppAlert.vue';
import AppHeader from '../components/AppHeader.vue';
export default {
    components: {
        AppAlert,
        AppHeader
    },
    data() {
        return {
            trashedPlates: [],
            endpoint: 'http://127.0.0.1:8000/api/plates',
            errors: {},
            successMessage: null
        }
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
        fetchTrashedPlates() {
            axios.get(this.endpoint + '/trash').then(res => {
                this.trashedPlates = res.data
            }).catch(err => console.error(err))
        },
        restorePlate(id) {
            axios.patch(`${this.endpoint}/trash/${id}/restore`).then((res) => {
                console.log('Plate restored');
                this.fetchTrashedPlates();
                this.successMessage = 'Plate restored successfully'
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
        restoreAllPlates() {
            axios.patch(`${this.endpoint}/trash/restore`).then((res) => {
                console.log('All plates restored');
                this.fetchTrashedPlates();
                this.successMessage = 'All plates restored successfully'
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
        deletePlate(id) {
            axios.delete(`${this.endpoint}/trash/${id}/drop`).then((res) => {
                console.log('Deleted Plate');
                this.fetchTrashedPlates();
                this.successMessage = 'Plate deleted successfully'
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
        deleteAllPlates() {
            axios.delete(`${this.endpoint}/trash/drop`).then((res) => {
                console.log('Deleted All plates');
                this.fetchTrashedPlates();
                this.successMessage = 'All plates deleted successfully'
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
            let hasConfirmed;
            if (id) {

                hasConfirmed = confirm(
                    `Are you sure that you want to DEFINITIVELY delete this plate?`
                );

                if (hasConfirmed) this.deletePlate(id);

            } else {
                hasConfirmed = confirm(
                    `Are you sure that you want to DEFINITIVELY delete all this plates?`
                );

                if (hasConfirmed) this.deleteAllPlates();
            }
        },
    },
    created() {
        this.fetchTrashedPlates()
    }
}
</script>

<template>
    <AppHeader />
    <div class="container">
        <h1 class="text-center mt-5">Trash</h1>
        <AppAlert :isOpen="showAlert" :type="alertType">
            <div v-if="successMessage">{{ successMessage }}</div>
            <ul v-if="hasErrors">
                <li v-for="(error, field) in errors" :key="field">{{ error }}</li>
            </ul>
        </AppAlert>
        <div class="buttons text-end">
            <button @click="confirmDelete(null)" class="btn btn-danger">Delete All</button>
            <button @click="restoreAllPlates()" class="btn btn-success ms-2">Restore All</button>
        </div>
        <ul v-if="trashedPlates.length" class="my-5 px-0">
            <li v-for="plate in trashedPlates" class="list-group-item d-flex align-items-center p-4 border rounded">
                <div class="d-flex align-items-center">
                    <img class="w-25 me-3" :src="plate.image" :alt="plate.name">
                    <div>
                        <h2 class="mb-2">{{ plate.name }}</h2>
                        <p class="mb-0">{{ plate.price }}</p>
                    </div>
                </div>
                <button @click="confirmDelete(plate.id)" class="btn btn-danger">Delete</button>
                <button @click="restorePlate(plate.id)" class="btn btn-success ms-2">Restore</button>
            </li>
        </ul>
        <div v-else class="text-danger my-4 fw-bold fs-4">
            Trash is empty
        </div>
        <button @click="$router.push({ name: 'home' })" class="btn btn-secondary">Go back to home</button>
    </div>
</template>

<style scoped></style>