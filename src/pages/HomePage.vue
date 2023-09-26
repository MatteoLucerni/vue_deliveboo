<script>
import axios from 'axios';
export default {
    name: 'HomePage',
    components: {

    },
    data() {
        return {
            plates: [],
            endpoint: 'http://127.0.0.1:8000/api/plates'
        }
    },
    methods: {
        fetchPlates() {
            axios.get(this.endpoint).then(res => {
                this.plates = res.data.plates
                console.log('done')
            }).catch(err => console.error(err)).then(res => {

            })
        }
    },
    created() {
        this.fetchPlates()
    }
}
</script>

<template>
    <h1>DeliveBoo</h1>
    <RouterLink class="btn btn-success" :to="{ name: 'create-plate' }">
        Create a new plate
    </RouterLink>
    <ul>
        <li v-for="plate in plates" class="card p-5  my-5">
            <img class="w-25" :src="plate.image" :alt="plate.name">
            <h1>{{ plate.name }}</h1>
            <small>{{ plate.price }}</small>
            <h6>{{ plate.ingredients }}</h6>
            <p>{{ plate.description }}</p>

            <div class="buttons">
                <RouterLink class="btn btn-primary" :to="{ name: 'plate-detail', params: { id: plate.id } }">
                    Details
                </RouterLink>
            </div>
        </li>
    </ul>
</template>

<style scoped></style>