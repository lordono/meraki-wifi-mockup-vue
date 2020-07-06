import Vue from "vue";
import VueRouter from "vue-router";
const Login = () =>
  import(/* webpackChunkName: "login" */ "../views/Login.vue");

const TheMenu = () =>
  import(/* webpackChunkName: "menu" */ "../components/TheMenu.vue");
const Map = () => import(/* webpackChunkName: "map" */ "../views/Map.vue");

const Period = () =>
  import(/* webpackChunkName: "period" */ "../views/Period.vue");

const Detail = () =>
  import(/* webpackChunkName: "detail" */ "../views/Detail.vue");

const Table = () =>
  import(/* webpackChunkName: "table" */ "../views/Table.vue");

const Guide = () =>
  import(/* webpackChunkName: "guide" */ "../views/Guide.vue");

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    components: {
      default: Map,
      menu: TheMenu
    },
    meta: { requiresAuth: true }
  },
  {
    path: "/period",
    name: "Period",
    components: {
      default: Period,
      menu: TheMenu
    },
    meta: { requiresAuth: true }
  },
  {
    path: "/detail",
    name: "Detail",
    components: {
      default: Detail,
      menu: TheMenu
    },
    meta: { requiresAuth: true }
  },
  {
    path: "/table",
    name: "Table",
    components: {
      default: Table,
      menu: TheMenu
    },
    meta: { requiresAuth: true }
  },
  {
    path: "/guide",
    name: "Guide",
    components: {
      default: Guide,
      menu: TheMenu
    },
    meta: { requiresAuth: true }
  },
  {
    path: "/login",
    name: "Login",
    components: {
      default: Login,
      menu: null
    },
    meta: { requiresAuth: false }
  },
  {
    path: "*",
    redirect: "/login",
    meta: { requiresAuth: false }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    const auth = sessionStorage.getItem("auth");
    if (auth !== "true") {
      next({
        path: "/login",
        query: { redirect: to.fullPath }
      });
    } else {
      next();
    }
  } else {
    next(); // make sure to always call next()!
  }
});

export default router;
