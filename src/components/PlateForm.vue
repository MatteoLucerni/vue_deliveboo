<script>
export default {
  props: {
    plate: Object, // Plate data
    mode: String, // 'create' or 'edit'
  },
  methods: {
    submitForm() {
      // Frontend validation: Ensure all required fields are filled
      if (!this.plate.name || !this.plate.image || !this.plate.price || !this.plate.ingredients || !this.plate.description) {
        //  alert('Please fill in all required fields.');
        return;
      }

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
  <div class="container">
    <form @submit.prevent="submitForm" class="needs-validation" novalidate>
      <!-- Plate Name -->
      <div class="mb-3">
        <label for="plateName" class="form-label">Plate Name</label>
        <input v-model.trim="plate.name" type="text" class="form-control" id="plateName" placeholder="Enter Plate Name" required>
        <!-- Display a validation error message if the plate name is empty -->
        <div :class="{'invalid-feedback':!plate.name}">Plate Name is required.</div>
      </div>

      <!-- Plate Image -->
      <div class="mb-3">
        <label for="plateImage" class="form-label">Plate Image URL</label>
        <input v-model.trim="plate.image" type="url" class="form-control" id="plateImage" placeholder="Enter Plate Image URL" required>
        <!-- Display a validation error message if the image URL is empty or invalid -->
        <div class="invalid-feedback" v-if="!plate.image">Image URL is required.</div>
        <div class="invalid-feedback" v-else-if="!isValidImageUrl(plate.image)">Invalid Image URL.</div>
      </div>

      <!-- Plate Price -->
      <div class="mb-3">
        <label for="platePrice" class="form-label">Plate Price</label>
        <input v-model.trim="plate.price" type="number" class="form-control" id="platePrice" placeholder="Enter Plate Price" required>
        <!-- Display a validation error message if the price is empty or not a number -->
        <div class="invalid-feedback" v-if="!plate.price">Price is required.</div>
        <div class="invalid-feedback" v-else-if="isNaN(parseFloat(plate.price))">Invalid Price.</div>
      </div>

      <!-- Plate Ingredients -->
      <div class="mb-3">
        <label for="plateIngredients" class="form-label">Plate Ingredients</label>
        <textarea v-model.trim="plate.ingredients" class="form-control" id="plateIngredients" placeholder="Enter Plate Ingredients" required></textarea>
        <!-- Display a validation error message if ingredients are empty -->
        <div class="invalid-feedback" v-if="!plate.ingredients">Ingredients are required.</div>
      </div>

      <!-- Plate Description -->
      <div class="mb-3">
        <label for="plateDescription" class="form-label">Plate Description</label>
        <textarea v-model.trim="plate.description" class="form-control" id="plateDescription" placeholder="Enter Plate Description" required></textarea>
        <!-- Display a validation error message if the description is empty -->
        <div class="invalid-feedback" v-if="!plate.description">Description is required.</div>
      </div>

      <!-- Submit Button -->
      <button type="submit" class="btn btn-primary">{{ mode === 'create' ? 'Create Plate' : 'Edit Plate' }}</button>
    </form>

    <!-- Go back to home button -->
    <RouterLink class="btn btn-secondary mt-3" :to="{ name: 'home' }">Go back to home</RouterLink>
  </div>
</template>
