<script>
import PlateForm from '../components/PlateForm.vue'; // Import the PlateForm component
import axios from 'axios';

const emptyPlate = {
  name: '',
  image: '',
  price: '',
  ingredients: '',
  description: '',
};

export default {
  components: {
    PlateForm, // Register the PlateForm component
  },
  data() {
    return {
      plate: { ...emptyPlate },
    };
  },
  methods: {
    createPlate(plateData) {
      axios.post('http://127.0.0.1:8000/api/plates', plateData)
        .then((res) => {
          console.log('Success', res.data);
          this.plate = { ...emptyPlate }; // Reset the form
          this.$router.push({ name: 'home' });
        })
        .catch((err) => console.error(err));
    },
  },
};
</script>

<template>
  <div>
    <plate-form :plate="plate" mode="create" @create="createPlate" />
  </div>
</template>
