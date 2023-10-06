import { createRouter, createWebHistory } from "vue-router";

// import pages
import HomePage from "../pages/HomePage.vue";
import RestaurantDetailPage from "../pages/RestaurantDetailPage.vue";
import NotFoundPage from "../pages/NotFoundPage.vue";
import CartPage from "../pages/CartPage.vue";
import OrderFormPage from "../pages/OrderFormPage.vue";
import OrderConfirmPage from "../pages/OrderConfirmPage.vue";

// router
const router = createRouter({
  history: createWebHistory(),
  linkExactActiveClass: "active",
  // array of objects, every object is a route
  routes: [
    { path: "/", name: "home", component: HomePage },
    {
      path: "/restaurants/:id",
      name: "restaurant-detail",
      component: RestaurantDetailPage,
    },
    { path: "/cart", name: "cart", component: CartPage },
    { path: "/order-form", name: "order-form", component: OrderFormPage },
    {
      path: "/order-confirm",
      name: "order-confirm",
      component: OrderConfirmPage,
    },
    { path: "/not-found", name: "not-found", component: NotFoundPage },
    { path: "/:pathMatch(.*)*", redirect: "/not-found" },
  ],
});

export { router };
