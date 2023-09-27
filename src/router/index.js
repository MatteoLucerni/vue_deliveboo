import { createRouter, createWebHistory } from 'vue-router';

// import pages
import HomePage from '../pages/HomePage.vue';
import PlateDetailPage from '../pages/PlateDetailPage.vue';
import CreatePlatePage from '../pages/CreatePlatePage.vue';
import EditPlatePage from '../pages/EditPlatePage.vue';
import NotFoundPage from '../pages/NotFoundPage.vue';
import TrashPage from '../pages/TrashPage.vue';

// router
const router = createRouter({
  history: createWebHistory(),
  linkExactActiveClass: 'active',
  // array of objects, every object is a route
  routes: [
    { path: '/', name: 'home', component: HomePage },
    { path: '/plates/:id', name: 'plate-detail', component: PlateDetailPage },
    {
      path: '/plates/create',
      name: 'create-plate',
      component: CreatePlatePage,
    },
    { path: '/plates/:id/edit', name: 'edit-plate', component: EditPlatePage },
    { path: '/plates/trash', name: 'plates-trash', component: TrashPage },
    { path: '/not-found', name: 'not-found', component: NotFoundPage },
    { path: '/:pathMatch(.*)*', redirect: '/not-found' },
  ],
});

export { router };
