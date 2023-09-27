<script>
import AppHeader from '../components/AppHeader.vue'
export default {
  components: {
    AppHeader
  },
  props: {
    plate: Object, // Plate data
    mode: String, // 'create' or 'edit'
  },
  methods: {
    submitForm() {
      // Emit the appropriate event based on the mode (create or edit)
      if (this.mode === 'create') {
        this.$emit('create', this.plate);
      } else {
        this.$emit('edit', this.plate);
      }
    },

    // Check if the provided URL is a valid image URL
    isValidImageUrl(url) {
      // TODO check for valid image URLs
      return /^(http|https):\/\/[^\s/$.?#].[^\s]*$/.test(url);
    },
  },
};
</script>

<template>
  <AppHeader />
  <div class="container mt-5">
    <form @submit.prevent="submitForm" class="needs-validation" novalidate>
      <!-- Plate Name -->
      <div class="mb-3">
        <label for="plateName" class="form-label">Plate Name</label>
        <input v-model.trim="plate.name" type="text" class="form-control" id="plateName" placeholder="Enter Plate Name"
          required>
      </div>

      <!-- Plate Image -->
      <div class="mb-3">
        <label for="plateImage" class="form-label">Plate Image URL</label>
        <input v-model.trim="plate.image" type="url" class="form-control" id="plateImage"
          placeholder="Enter Plate Image URL" required>
      </div>

      <!-- Plate Price -->
      <div class="mb-3">
        <label for="platePrice" class="form-label">Plate Price</label>
        <input v-model.trim="plate.price" type="number" class="form-control" id="platePrice"
          placeholder="Enter Plate Price" required>
      </div>

      <!-- Plate Ingredients -->
      <div class="mb-3">
        <label for="plateIngredients" class="form-label">Plate Ingredients</label>
        <textarea v-model.trim="plate.ingredients" class="form-control" id="plateIngredients"
          placeholder="Enter Plate Ingredients" required></textarea>
      </div>

      <!-- Plate Description -->
      <div class="mb-3">
        <label for="plateDescription" class="form-label">Plate Description</label>
        <textarea v-model.trim="plate.description" class="form-control" id="plateDescription"
          placeholder="Enter Plate Description" required></textarea>
      </div>

      <!-- Submit Button -->
      <button type="submit" class="btn btn-success">{{ mode === 'create' ? 'Create Plate' : 'Edit Plate' }}</button>
    </form>

    <!-- Go back to home button -->
    <RouterLink class="btn btn-secondary mt-3" :to="{ name: 'home' }">Go back to home</RouterLink>
  </div>
</template>
