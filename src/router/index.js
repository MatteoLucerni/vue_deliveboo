import { createRouter, createWebHistory } from 'vue-router';

// import pages
import HomePage from '../pages/HomePage.vue';
import PlateDetailPage from '../pages/PlateDetailPage.vue';
import CreatePlatePage from '../pages/CreatePlatePage.vue';
import NotFoundPage from '../pages/NotFoundPage.vue';

// router
const router = createRouter({
  history: createWebHistory(),
  linkExactActiveClass: 'active',
  // array of objects, every object is a route
  routes: [
    { path: '/', name: 'home', component: HomePage },
    { path: '/plates/:id', name: 'plate-detail', component: PlateDetailPage },
    { path: '/plates/create', name:'create-plate', component:CreatePlatePage},
    { path: '/not-found', name: 'not-found', component: NotFoundPage },
    { path: '/:pathMatch(.*)*', redirect: '/not-found' },
  ],
});

export { router };
