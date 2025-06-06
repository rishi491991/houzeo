import { createRouter, createWebHistory } from "vue-router";
import SignupLogin from "@/views/SignupLogin/SignupLogin.vue";
import FormsHome from "@/views/FormsHome/FormsHome.vue";
const routes = [
  { path: "/", redirect: "/login" },
  { path: "/login", component: SignupLogin },
  { path: "/signup", component: SignupLogin },
  { path: "/form", component: FormsHome, meta: { requiresAuth: true } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// checking authentication to protect routes
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("jwt");

  if (to.meta.requiresAuth && !token) {
    next("/login");
  } else if (to.path === "/login" && token) {
    next("/form");
  } else if (to.path === "/signup" && token) {
    next("/form");
  } else {
    next();
  }
});

export default router;
