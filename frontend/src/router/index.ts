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
      path: "/packages",
      name: "packages",
      component: () => import("@/views/pages/Packages.vue"),
    },
    {
      path: "/discoveries",
      name: "discoveries",
      component: () => import("@/views/pages/Discoveries.vue"),
    },
    {
      path: "/profiles",
      name: "profiles",
      component: () => import("@/views/pages/Profiles.vue"),
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
