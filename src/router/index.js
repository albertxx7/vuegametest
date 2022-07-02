import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";

import { getAuth } from "firebase/auth";

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("../views/AboutUs.vue"),
  },
  {
    path: "/productpage",
    name: "productpage",
    component: () => import("../views/Productpage.vue"),
  },
  {
    path: "/admin",
    name: "admin",
    component: () => import("../views/adminCenter/Admin.vue"),
    meta: { requiresAuth: true },
    children: [
      {
        path: "overview",
        name: "overview",
        component: () => import("../views/adminCenter/Overview.vue"),
      },
      {
        path: "products",
        name: "products",
        component: () => import("../views/adminCenter/Products.vue"),
        
      },
      {
        path: "orders",
        name: "orders",
        component: () => import("../views/adminCenter/Orders.vue"),
      },
      {
        path: "profiles",
        name: "profiles",
        component: () => import("../views/adminCenter/Profiles.vue"),
      },
    ],
  },
  {
    path: "/checkoutPage",
    name: "checkoutPage",
    component: () => import("../components/frontend/checkoutPage.vue"),
  },
];
// children 路由不得加上/~~~

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((x) => x.meta.requiresAuth);
  const auth = getAuth();
  const user = auth.currentUser;
  if (requiresAuth && !user) {
    next("/");
  } 
  else if (to.path ==="/admin/products") {
    return next('/admin');
  }
  else {
    next();
  }
});




// router.beforeEach((to, from, next) => {
//   const requiresAuth = to.matched.some((x) => x.meta.requiresAuth);
//   const auth = getAuth();
//   const user = auth.currentUser;

//   if (requiresAuth && !user) {
//     next("/");
//   } else if (to.path ==="/admin/products") {
//     return next('/admin');
//   } 
// else if (requiresAuth && user) {
//     next();
//   } else {
//     next();
//   }
// });

export default router;
