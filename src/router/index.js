// router/index.js
import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);
export default new Router({
  mode: "history",
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: "*",
      name: "error",
      component: () => import("@/pages/Error")
    },
    {
      path: "/",
      name: "home",
      component: () => import("@/components/DashBoard"),
      meta: "Inicio"
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/pages/Login")
    },
    {
      path: "/office",
      component: () => import("@/components/Office"),
      meta: "Oficinas",
      children: [
        {
          path: "",
          name: "office-list",
          component: () => import("@/components/OfficeList"),
          meta: "Lista de Oficinas"
        }
      ]
    },
    {
      path: "/claimants",
      component: () => import("@/components/Claimant"),
      meta: "Solicitante",
      children: [
        {
          path: "",
          name: "claimant-list",
          component: () => import("@/components/ClaimantList"),
          meta: "Lista de Solicitante"
        },
        {
          path: "test",
          name: "claimant-test",
          component: () => import("@/pages/Error"),
          meta:'Testeano claimant'
        }
      ]
    }
  ]
});
// INSTALAR PLUGIN VUE-NICE-SCROLLBAR
