export const SET_RESULT = "SET_RESULT";
export const SET_LINKS = "SET_LINKS";
export const SET_PAGE = "SET_PAGE";
export const SET_PAGINATION = "SET_PAGINATION";
export const SET_LOADING = "SET_LOADING";
export const SET_ALIVE = "SET_ALIVE";
export const SET_VISIBLE = "SET_VISIBLE";

export const SET_CLAIMANTS = "SET_CLAIMANTS";
export const ADD_CLAIMANT = "ADD_CLAIMANT";
export const UPDATE_CLAIMANT = "UPDATE_CLAIMANT";
export const DELETE_CLAIMANT = "DELETE_CLAIMANT";
export const CLEAR_CLAIMANT = "CLEAR_CLAIMANT";
export const SUCCESS_NOTIFICATION = "SUCCESS_NOTIFICATION";
export const REFRESH_NOTIFICATION = "REFRESH_NOTIFICATION";

import axios from 'axios'

const state = {
  headers: [
    {
      text: "Nombres",
      align: "left",
      sortable: true,
      value: "name"
    },
    {
      text: "Tipo Doc",
      align: "left",
      value: "doc"
    },
    {
      text: "Nro Documento",
      value: "nroDoc"
    },
    {
      text: "Email",
      value: "email"
    },
    {
      text: "Telefono",
      value: "phone"
    },
    {
      text: "Direccion",
      value: "address"
    },
    {
      text: "Acciones",
      value: "name",
      sortable: false
    }
  ],
  noDataText: "Informacion no disponible",
  noResultext: "No se encontraron registros con los criterios de busqueda",
  rowsPerPageItems: [
    10,
    25,
    50,
    100,
    {
      text: "Todo",
      value: -1
    }
  ],
  alive: false,
  visible: false,
  result: {},
  claimants: [],
  claimant: {},
  // links: [],
  page: {
    number: 0,
    sort: "name",
    size: 5,
    totalElements: 0,
    totalPages: 0
  },
  loading: false,
  message: ""
};
const getters = {
  getHeaders: state => state.headers,
  getRowsPerPageItems: state => state.rowsPerPageItems,
  getResult: state => state.result,
  getPage: state => state.page,
  getClaimants: state => state.claimants,
  getLoading: state => state.loading,
  getTotalItems: (state, getters) => getters.getPage.totalElements,
  isAlive: state => state.alive,
  isVisible: state => state.visible,
  getMessage: state => state.message,
  getNoDataText: state => state.noDataText,
  getNoResultText: state => state.noResultext
};
const mutations = {
  [SET_RESULT]: (state, result) => (state.result = result),
  [SET_CLAIMANTS]: (state, claimants) => (state.claimants = claimants),
  [ADD_CLAIMANT]: (state, claimant) => state.claimants.unshift(claimant),
  [UPDATE_CLAIMANT]: (state, payload) => {
    let editedIndex = payload.index;
    Object.assign(state.claimants[editedIndex], payload.item);
  },
  [DELETE_CLAIMANT]: (state, claimant) => {
    let index = state.claimants.indexOf(claimant);
    state.claimants.splice(index, 1);
  },
  [CLEAR_CLAIMANT]: state => (state.claimant = {}),
  [SET_PAGE]: (state, page) => (state.page = page),
  [SET_PAGINATION]: (state, pagination) => {
    state.page.number = pagination.page - 1;
    state.page.size = pagination.rowsPerPage;
    state.page.sort = pagination.sortBy;
  },
  [SET_LOADING]: (state, loading) => (state.loading = loading),
  // [SET_VISIBLE]: (state, dialog) => (state.dialog = dialog),
  [SET_ALIVE]: (state, alive) => (state.alive = alive),
  [SUCCESS_NOTIFICATION]: (state, message) => {
    state.visible = true;
    state.message = message;
  },
  [REFRESH_NOTIFICATION]: state => {
    state.visible = false;
    state.message = "";
  }
};
const actions = {
  keepAlive: (context, alive) => {
    console.log("State of live is " + alive);
    context.commit(SET_ALIVE, alive);
  },
  saveClaimant: (context, claimant) => {
    console.log("...Saving data");
    return axios
      .post("http://localhost:8080/api/claimants", {
        name: claimant.name,
        phone: claimant.phone,
        email: claimant.email,
        doc: claimant.doc,
        nroDoc: claimant.nroDoc,
        address: claimant.address
      })
      .then(response => {
        console.log("Succes saving");
        context.commit(ADD_CLAIMANT, response.data);
        context.commit(SUCCESS_NOTIFICATION, "Solicitante guardado");
        context.commit(SET_TOTAL_ELEMENTS, '+')
      })
      .then(() => context.commit(SET_ALIVE, false))
      .catch(error => console.log(error))
      .finally(() => {
        console.log("End of transaction");
        setTimeout(() => {
          context.commit(REFRESH_NOTIFICATION);
        }, 6000);
      });
  },
  editClaimant: (context, payload) => {
    console.log("...Editing data");
    return axios
      .put(payload.item._links.self.href, {
        name: payload.item.name,
        phone: payload.item.phone,
        email: payload.item.email,
        doc: payload.item.doc,
        nroDoc: payload.item.nroDoc,
        address: payload.item.address
      })
      .then(response => {
        console.log("Succes editing");
        context.commit(UPDATE_CLAIMANT, {
          index: payload.index,
          item: response.data
        });
        context.commit(SUCCESS_NOTIFICATION, "Solicitante editado");
        // setTimeout(() => {
        //   context.commit(SET_VISIBLE, false);
        // }, 300);
      })
      .then(() => context.commit(SET_ALIVE, false))
      .catch(error => console.log(error))
      .finally(() => {
        console.log("End of transaction");
        setTimeout(() => {
          context.commit(REFRESH_NOTIFICATION);
        }, 6000);
      });
  },
  deleteClaimant: (context, claimant) => {
    console.log("...Deleting data");
    console.log(claimant._links.self.href);
    return axios
      .delete(claimant._links.self.href)
      .then(() => {
        console.log("Succes deleting");
        context.commit(DELETE_CLAIMANT, claimant);
        context.commit(SUCCESS_NOTIFICATION, "Solicitante eliminado");
        context.commit(SET_TOTAL_ELEMENTS, '-')
        // setTimeout(() => {
        //   context.commit(SET_VISIBLE, false);
        // }, 300);
      })
      .catch(error => console.log(error))
      .finally(() => {
        console.log("End of transaction");
        setTimeout(() => {
          context.commit(REFRESH_NOTIFICATION);
        }, 6000);
      });
  },
  fetchClaimants: context => {
    console.log("Fetching data");
    context.commit(SET_LOADING, true);
    return axios
      .get("http://localhost:8080/api/claimants", {
        params: {
          page: context.getters.getPage.number,
          size: context.getters.getPage.size,
          sort: context.getters.getPage.sort
        }
      })
      .then(result => {
        context.commit(SET_RESULT, result);
        context.commit(
          SET_CLAIMANTS,
          context.getters.getResult.data._embedded.claimants
        );
        context.commit(SET_PAGE, context.getters.getResult.data.page);
        // context.commit(SET_PAGINATION, context.getters.getPage)
        context.commit(SET_LOADING, false);
        // context.commit(SET_LINKS, result.data._links)
      })
      .catch(error => {
        console.log(error.statusText);
      })
      .finally(() => context.commit(SET_LOADING, false));
  },
  updatePage: (context, page) => context.commit(SET_PAGE, page),
  updatePagination: (context, pagination) =>
    context.commit(SET_PAGINATION, pagination),
  clearClaimant: context => commit(CLEAR_CLAIMANT),
  setDialog: (context, visible) => context.commit(SET_VISIBLE, visible)
};

export default {
  namespaced:true,
  state,
  getters,
  actions,
  mutations
};
