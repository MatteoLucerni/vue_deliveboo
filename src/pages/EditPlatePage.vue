<script>
import PlateForm from '../components/PlateForm.vue'; // Import the PlateForm component
import AppAlert from '../components/AppAlert.vue';
import axios from 'axios';

export default {
  components: {
    PlateForm,
    AppAlert // Register the PlateForm component
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
    editPlate(plateData) {
      this.errors = {};
      this.successMessage = null;
      axios.put('http://127.0.0.1:8000/api/plates/' + this.$route.params.id, plateData)
        .then((res) => {
          console.log('Success', res.data);
          this.successMessage = 'Plate edited successfully'
        })
        .catch(err => {
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
    <AppAlert :isOpen="showAlert" :type="alertType">
      <div v-if="successMessage">{{ successMessage }}</div>
      <ul v-if="hasErrors">
        <li v-for="(error, field) in errors" :key="field">{{ error }}</li>
      </ul>
    </AppAlert>
    <plate-form :plate="plate" mode="edit" @edit="editPlate" />
  </div>
</template>
