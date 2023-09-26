<script>

const emptyForm = {
  name: '',
  image: '',
  price: '',
  ingredients: '',
  description: '',
}

import axios from 'axios';
export default {
  name: 'CreatePlatePage',
  data() {
    return {
      plate: {
        name: '',
        image: '',
        price: '',
        ingredients: '',
        description: '',
      }
    };
  },
  methods: {
    createPlate() {

      axios.post('http://127.0.0.1:8000/api/plates', this.plate).then(res => {
        console.log('Success', res.data)
      }).catch(err => console.error(err))

    },
  },
};
</script>
<template>
  <div class="d-flex align-items-center py-3">
    <form @submit.prevent="createPlate">
      <div class="mb-3">
        <label for="plateName" class="form-label">Plate Name</label>
        <input v-model.trim="plate.name" type="text" class="form-control" id="plateName" placeholder="Plate Name"
          required>
      </div>
      <div class="mb-3">
        <label for="plateImage" class="form-label">Plate Image</label>
        <input v-model.trim="plate.image" type="url" class="form-control" id="plateImage" placeholder="Plate Image"
          required>
      </div>
      <div class="mb-3">
        <label for="platePrice" class="form-label">Plate Price</label>
        <input v-model.trim="plate.price" type="text" class="form-control" id="platePrice" placeholder="Plate Price"
          required>
      </div>
      <div class="mb-3">
        <label for="plateDescription" class="form-label">Plate Description</label>
        <textarea v-model.trim="plate.description" class="form-control" id="plateDescription"
          placeholder="Plate Description" required></textarea>
      </div>

      <!-- TODO: Add more details -->

      <button type="submit" class="btn btn-primary">Create Plate</button>
    </form>
  </div>
</template>
