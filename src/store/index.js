import Vue from "vue";
import Vuex from "vuex";

// modules
import claimants from "./modules/claimants";
import offices from "./modules/offices";
import util from "../services/util";
Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    title: "Document Processing System",
    items: [
      {
        icon: "dashboard",
        text: "Dashboard",
        pathname: "home"
      },
      {
        icon: "fas fa-cube",
        text: "Oficinas",
        pathname: "office-list"
      },
      {
        icon: "account_circle",
        text: "Usuarios"
      },
      {
        icon: "transfer_within_a_station",
        "icon-alt": "transfer_within_a_station",
        text: "Solicitantes",
        model: true,
        children: [
          // {
          //   icon: "add",
          //   text: "Agregar Solicitante",
          //   pathname: "claimant-form"
          // },
          {
            icon: "list",
            text: "Listar Solicitantes",
            pathname: "claimant-list"
          }
        ]
      },
      {
        icon: "keyboard_arrow_up",
        "icon-alt": "keyboard_arrow_down",
        text: "More",
        model: false,
        children: [
          {
            text: "Import"
          },
          {
            text: "Export"
          },
          {
            text: "Print"
          },
          {
            text: "Undo changes"
          },
          {
            text: "Other contacts"
          }
        ]
      },
      {
        icon: "settings",
        text: "Settings"
      },
      {
        icon: "chat_bubble",
        text: "Send feedback"
      },
      {
        icon: "help",
        text: "Help"
      },
      {
        icon: "phonelink",
        text: "App downloads"
      },
      {
        icon: "keyboard",
        text: "Go to the old version"
      }
    ],
    visible: true,
    clipped: false,
    minify: false
  },
  getters: {
    getSidebarItems: state => state.items,
    getTitle: state => state.title,
    isVisible: state => state.visible,
    isClipped: state => state.clipped,
    isMinify: state => state.minify,
    // getBreadCrumbs: state => {
    //   return keyword => util.findInNestedByName(state.items, keyword);
    // },
    // getRoute: state => {
    //   let breadcrumbs = []
    //   for (let key in state.route.from) {
    //     if (object.hasOwnProperty(key)) {
    //       const element = object[key];
          
    //     }
    //   }
    //   return breadcrumbs
    // },
    setSidebar: state => (state.visible = !state.visible),
    setClipped: state => (state.Clipped = !state.clipped),
    setMinify: state => (state.minify = !state.minify)
  },
  mutations: {},
  actions: {
    toogleMinify: context => context.commit("setMinify"),
    toogleSidebar: context => context.commit("setSidebar"),
    toogleClipped: context => context.commit("setClipped")
  },
  modules: {
    claimants,
    offices
  }
});
