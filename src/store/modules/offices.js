export const SET_RESULT = "SET_RESULT";
export const SET_LINKS = "SET_LINKS";
export const SET_TOTAL_ELEMENTS = "SET_TOTAL_ELEMENTS";
export const SET_PAGE = "SET_PAGE";
export const SET_PAGINATION = "SET_PAGINATION";
export const SET_LOADING = "SET_LOADING";
export const SET_ALIVE = "SET_ALIVE";
export const SET_VISIBLE = "SET_VISIBLE";

export const SET_OFFICES = "SET_OFFICES";
export const ADD_OFFICE = "ADD_OFFICE";
export const UPDATE_OFFICE = "UPDATE_OFFICE";
export const DELETE_OFFICE = "DELETE_OFFICE";
export const CLEAR_OFFICE = "CLEAR_OFFICE";
export const SUCCESS_NOTIFICATION = "SUCCESS_NOTIFICATION";
export const REFRESH_NOTIFICATION = "REFRESH_NOTIFICATION";

import axios from "axios";

const state = {
  headers: [
    {
      text: "Nombres",
      align: "left",
      sortable: true,
      value: "name"
    },
    {
      text: "Abreviatura",
      value: "shortName"
    },
    {
      text: "Descripcion",
      align: "left",
      value: "description"
    },
    {
      text: "Estado",
      value: "active"
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
  offices: [],
  office: {},
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
  getOffices: state => state.offices,
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
  [SET_OFFICES]: (state, offices) => (state.offices = offices),
  [ADD_OFFICE]: (state, office) => state.offices.unshift(office),
  [UPDATE_OFFICE]: (state, payload) => {
    let editedIndex = payload.index;
    Object.assign(state.offices[editedIndex], payload.item);
  },
  [DELETE_OFFICE]: (state, office) => {
    let index = state.offices.indexOf(office);
    state.offices.splice(index, 1);
  },
  [CLEAR_OFFICE]: state => (state.office = {}),
  [SET_TOTAL_ELEMENTS]: (state, value) => value == '+'? state.page.totalElements++ : state.page.totalElements--,
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
  saveOffice: (context, office) => {
    console.log("...Saving data");
    return axios
      .post("http://localhost:8080/api/offices", {
        name: office.name,
        shortName: office.shortName,
        description: office.description,
        active: office.active
      })
      .then(response => {
        console.log("Succes saving");
        context.commit(ADD_OFFICE, response.data);
        context.commit(SUCCESS_NOTIFICATION, "Oficina guardada");
      })
      .then(() =>{
        context.commit(SET_ALIVE, false)
        context.commit(SET_TOTAL_ELEMENTS,'+')
      } 
    )
      .catch(error => console.log(error))
      .finally(() => {
        console.log("End of transaction");
        setTimeout(() => {
          context.commit(REFRESH_NOTIFICATION);
        }, 6000);
      });
  },
  editOffice: (context, payload) => {
    console.log("...Editing data");
    return axios
      .put(payload.item._links.self.href, {
        name: payload.item.name,
        shortName: payload.item.shortName,
        description: payload.item.description,
        active: payload.item.active
      })
      .then(response => {
        console.log("Succes editing");
        context.commit(UPDATE_OFFICE, {
          index: payload.index,
          item: response.data
        });
        context.commit(SUCCESS_NOTIFICATION, "Oficina editada");
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
  deleteOffice: (context, office) => {
    console.log("...Deleting data");
    console.log(office._links.self.href);
    return axios
      .delete(office._links.self.href)
      .then(() => {
        console.log("Succes deleting");
        context.commit(DELETE_OFFICE, office);
        context.commit(SUCCESS_NOTIFICATION, "Oficina eliminada");
        context.commit(SET_TOTAL_ELEMENTS,'-')
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
  fetchOffices: context => {
    console.log("Fetching data");
    context.commit(SET_LOADING, true);
    return axios
      .get("http://localhost:8080/api/offices", {
        params: {
          page: context.getters.getPage.number,
          size: context.getters.getPage.size,
          sort: context.getters.getPage.sort
        }
      })
      .then(result => {
        context.commit(SET_RESULT, result);
        context.commit(
          SET_OFFICES,
          context.getters.getResult.data._embedded.offices
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
  updateTotalElements: (context,page) => context.commit(SET_TOTAL_ELEMENTS, value),
  updatePage: (context, page) => context.commit(SET_PAGE, page),
  updatePagination: (context, pagination) =>
    context.commit(SET_PAGINATION, pagination),
  clearOffice: context => commit(CLEAR_OFFICE),
  setDialog: (context, visible) => context.commit(SET_VISIBLE, visible)
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
