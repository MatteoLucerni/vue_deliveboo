<script>
import axios from 'axios';
export default {
    name: 'HomePage',
    components: {},
    data() {
        return {
            plates: [],
            endpoint: 'http://127.0.0.1:8000/api/plates',
        };
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
            }).catch((err) => console.error(err)).then((res) => { });
        },
        confirmDelete(id) {
            const hasConfirmed = confirm(
                `Are you sure that you want to delete this plate?`
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
    <div>
        <h1 class="display-4">DeliveBoo</h1>
        <RouterLink class="btn btn-success" :to="{ name: 'create-plate' }">
            Create a new plate
        </RouterLink>
        <RouterLink class="btn btn-secondary ms-2" :to="{ name: 'plates-trash' }">
            Go to trash bin
        </RouterLink>
        <ul class="list-group mt-4 py-5">
            <li v-for="plate in plates" class="list-group-item d-flex justify-content-between align-items-center py-2">
                <div class="d-flex align-items-center">
                    <img class="w-25 me-3" :src="plate.image" :alt="plate.name">
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
</template>
