<script>
import PlateForm from '../components/PlateForm.vue'; // Import the PlateForm component
import AppAlert from '../components/AppAlert.vue';
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
    PlateForm,
    AppAlert// Register the PlateForm component
  },
  data() {
    return {
      plate: { ...emptyPlate },
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
    createPlate(plateData) {
      this.errors = {};
      this.successMessage = null;
      axios.post('http://127.0.0.1:8000/api/plates', plateData)
        .then((res) => {
          console.log('Success', res.data);
          this.plate = { ...emptyPlate }; // Reset the form
          this.successMessage = 'Plate created successfully'
          const paramId = res.data.id
          console.log(paramId)
          this.$router.push({ path: `/plates/${paramId}` })
        })
        .catch(err => {
          if (err.response.status === 400) {
            const { errors } = err.response.data;
            const errorMessage = {};
            for (let field in errors) errorMessage[field] = errors[field][0];
            this.errors = errorMessage;
          } else {
            console.error(err);
            this.errors = { network: 'Error' }
          }
        });
    },
  },
};
</script>

<template>
  <div>
    <plate-form :plate="plate" mode="create" @create="createPlate" />
    <div class="container">
      <AppAlert :isOpen="showAlert" :type="alertType">
        <div v-if="successMessage">{{ successMessage }}</div>
        <ul v-if="hasErrors">
          <li v-for="(error, field) in errors" :key="field">{{ error }}</li>
        </ul>
      </AppAlert>
    </div>
  </div>
</template>
