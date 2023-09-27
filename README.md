# Deliveboo Project
Hey there! 🍔

This project is our spin on the popular app Deliveroo. It's the brainchild of Matteo Lucerni, Andrea Creazzi, Matteo Nesti, Giacomo Arcangeli, and Guglielmo Piasenti, aka Team #1 from Boolean's class #100. 🚀

This project is the grand finale of our course, where we get to showcase all the cool stuff we've learned along the way. 🎉


## Explanation section

### Reusable form 

Script:
- This section contains the JavaScript code for the Vue.js component.

- The export default statement defines the Vue component. It accepts two props: plate (which represents plate data) and mode (which specifies whether the form is in "create" or "edit" mode).

- The submitForm method is called when the form is submitted. It performs frontend validation by checking if all required fields (name, image, price, ingredients, description) are filled. If any field is empty, it displays an alert and prevents form submission.

- If all fields are filled, it emits an event (create or edit) based on the mode prop, allowing the parent component to handle the form submission.

- The isValidImageUrl method checks if the provided URL is a valid image URL. It uses a simple regular expression to perform this check.

Template:

- This section defines the template for the Vue component, which contains the HTML structure of the form.

- The form element (<form>) has the @submit.prevent directive to prevent the default form submission behavior and instead call the submitForm method defined in the script section.

- Each form field (Plate Name, Plate Image, Plate Price, Plate Ingredients, Plate Description) is enclosed in a <div> with the class mb-3, which provides spacing.

- Labels and inputs are used for each field, with Bootstrap classes applied for styling. The v-model directive binds form inputs to the corresponding data properties in the plate object.

- Error messages are displayed using the <div> element with the class invalid-feedback and are conditionally shown using v-if directives. These error messages are displayed when a field is empty or if it doesn't meet specific criteria (e.g., invalid URL or non-numeric price).

- The submit button is styled as a Bootstrap primary button, and its label ("Create Plate" or "Edit Plate") is determined based on the mode prop.

- The "Go back to home" button is styled as a Bootstrap secondary button with some top margin (mt-3) for spacing.