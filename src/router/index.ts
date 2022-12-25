import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LogoutView from "../views/LogoutView.vue";
import EditListView from "../views/EditListView.vue";
import LearnView from "../views/LearnView.vue";
import EditView from "../views/EditView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/logout",
      name: "logout",
      component: LogoutView,
    },
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/",
      name: "learnToHome",
      component: HomeView,
      meta: { transition: "slide-left" },
    },
    {
      path: "/select-edit",
      name: "select-edit",
      component: EditListView,
    },
    {
      path: "/learn/:id",
      name: "learn",
      component: LearnView,
    },
    {
      path: "/edit/:index",
      name: "edit",
      component: EditView,
      props: true,
    },
  ],
});

export default router;
