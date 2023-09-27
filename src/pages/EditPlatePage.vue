<script>
import PlateForm from '../components/PlateForm.vue'; // Import the PlateForm component
import axios from 'axios';

export default {
  components: {
    PlateForm, // Register the PlateForm component
  },
  data() {
    return {
      plate: {
        name: '',
        image: '',
        price: '',
        ingredients: '',
        description: '',
      },
    };
  },
  methods: {
    editPlate(plateData) {
      axios.put('http://127.0.0.1:8000/api/plates/' + this.$route.params.id, plateData)
        .then((res) => {
          console.log('Success', res.data);
          this.$router.push({ name: 'home' });
        })
        .catch((err) => console.error(err));
    },
    getPlate() {
      axios.get('http://127.0.0.1:8000/api/plates/' + this.$route.params.id)
        .then((res) => {
          this.plate = res.data;
        })
        .catch((err) => console.error(err));
    },
  },
  created() {
    this.getPlate();
  },
};
</script>

<template>
  <div>
    <plate-form :plate="plate" mode="edit" @edit="editPlate" />
  </div>
</template>
