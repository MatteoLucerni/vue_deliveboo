<script>

import axios from 'axios';
export default {
  name: 'EditPlatePage',
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
    editPlate(id) {

      axios.put('http://127.0.0.1:8000/api/plates/' + id, this.plate).then(res => {
        console.log('Success', res.data)
        this.$router.push({ name: 'home' })
      }).catch(err => console.error(err))

    },
    getPlate() {
      axios.get('http://127.0.0.1:8000/api/plates/' + this.$route.params.id).then(res => {
        this.plate = res.data
      }).catch(err => console.error(err))
    }
  },
  created() {
    this.getPlate()
  }
};
</script>
<template>
  <div class="d-flex align-items-center py-3">
    <form @submit.prevent="editPlate(this.$route.params.id)">
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
        <label for="plateIngredients" class="form-label">Plate Ingredients</label>
        <textarea v-model.trim="plate.ingredients" class="form-control" id="plateIngredients"
          placeholder="Plate Ingredients" required></textarea>
      </div>
      <div class="mb-3">
        <label for="plateDescription" class="form-label">Plate Description</label>
        <textarea v-model.trim="plate.description" class="form-control" id="plateDescription"
          placeholder="Plate Description" required></textarea>
      </div>

      <!-- TODO: Add more details -->

      <button type="submit" class="btn btn-primary">Edit Plate</button>
    </form>
  </div>
  <RouterLink class="btn btn-secondary" :to="{ name: 'home' }">
    Go back to home
  </RouterLink>
</template>
