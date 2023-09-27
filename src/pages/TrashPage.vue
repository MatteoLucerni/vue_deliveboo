<script>
import axios from 'axios';
export default {
    components: {

    },
    data() {
        return {
            trashedPlates: [],
            endpoint: 'http://127.0.0.1:8000/api/plates'
        }
    },
    methods: {
        fetchTrashedPlates() {
            axios.get(this.endpoint + '/trash').then(res => {
                this.trashedPlates = res.data
            }).catch(err => console.error(err))
        },
        deletePlate(id) {
            axios.delete(`${this.endpoint}/trash/${id}/drop`).then((res) => {
                console.log('Deleted Plate');
                this.fetchTrashedPlates();
            }).catch((err) => console.error(err));
        },
        deleteAllPlates() {
            axios.delete(`${this.endpoint}/trash/drop`).then((res) => {
                console.log('Deleted All plates');
                this.fetchTrashedPlates();
            }).catch((err) => console.error(err));
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
    <h1 class="text-center">Trash</h1>
    <button @click="confirmDelete(null)" class="btn btn-danger">Delete All</button>
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
        </li>
    </ul>
    <div v-else class="text-danger my-4 fw-bold fs-4">
        Trash is empty
    </div>
    <button @click="$router.push({ name: 'home' })" class="btn btn-secondary">Go back to home</button>
</template>

<style scoped></style>