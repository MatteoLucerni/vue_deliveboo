<script>
export default {
    props: { isOpen: Boolean, type: String, dismissable: Boolean },
    emits: ['close'],
};
</script>

<template>
    <div v-if="isOpen" :class="[`alert-${type || 'info'}`, { 'alert-dismissible': dismissable }]"
        class="alert fade show my-3 d-flex align-items-center justify-content-between " role="alert">
        <slot></slot>
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" @click="$emit('close')"></button>
    </div>
</template>

<style scoped></style>