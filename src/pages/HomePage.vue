<script>
import axios from 'axios';
export default {
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
    <ul>
        <li v-for="plate in plates">
            {{ plate.name }}
        </li>
    </ul>
</template>

<style scoped></style>