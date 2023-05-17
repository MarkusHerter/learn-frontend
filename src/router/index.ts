import { createRouter, createWebHistory } from "vue-router";
import { isAuthenticated } from "@/store";
import { checkToken } from "@/apicalls";
import HomeView from "../views/HomeView.vue";
import LogoutView from "../views/LogoutView.vue";
import EditListView from "../views/EditListView.vue";
import LearnView from "../views/LearnView.vue";
import EditView from "../views/EditView.vue";
import LoginView from "../views/LoginView.vue";
import SignupView from "../views/SignupView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    {
      path: "/logout",
      name: "logout",
      component: LogoutView,
    },
    {
      path: "/signup",
      name: "signup",
      component: SignupView,
    },
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: { requiresAuth: true },
    },

    {
      path: "/select-edit",
      name: "select-edit",
      component: EditListView,
      meta: { requiresAuth: true },
    },
    {
      path: "/learn",
      name: "learn",
      component: LearnView,
      meta: { requiresAuth: true },
    },
    {
      path: "/edit",
      name: "edit",
      component: EditView,
      meta: { requiresAuth: true },
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  if (requiresAuth) {
    await checkToken();
    if (!isAuthenticated.value) {
      // Leite den Benutzer zur Anmeldeseite oder einer anderen Seite um
      next({ name: "login" });
      return;
    }
  }
  next();
});

export default router;
