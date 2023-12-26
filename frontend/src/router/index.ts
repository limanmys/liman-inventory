import { createRouter, createWebHashHistory } from "vue-router"

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/assets",
      name: "assets",
      component: () => import("@/views/pages/Assets.vue"),
    },
    {
      path: "/error",
      name: "error",
      component: () => import("@/views/layouts/Errors.vue"),
    },
    {
      path: "/:pathMatch(.*)*",
      redirect: "/assets",
    },
  ],
})

export default router
