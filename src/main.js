import { createApp } from 'vue';
import './assets/scss/main.scss';
import { router } from './router';
import App from './App.vue';

createApp(App).use(router).mount('#app');
