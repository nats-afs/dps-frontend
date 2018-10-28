<template>
  <div id="create"
    class="container">
    <v-card hover>
      <v-card-title>
        <span class="headline">Oficina</span>
        <v-spacer></v-spacer>
        <!-- <v-text-field append-icon="search"
          label="Buscar"
          single-line
          v-model="search"></v-text-field> -->
        <v-btn flat
          icon
          class="mx-0">
          <v-icon>add</v-icon>
        </v-btn>
        <v-btn flat
          icon
          class="mx-0">
          <v-icon>print</v-icon>
        </v-btn>
        <v-btn flat
          icon
          class="mx-0">
          <v-icon>search</v-icon>
        </v-btn>
        <v-btn flat
          icon
          class="mx-0">
          <v-icon>clone</v-icon>
        </v-btn>
      </v-card-title>
      <v-dialog v-if="dialog"
        v-model="dialog"
        max-width="1000px">
        <office-form :index=editedIndex
          :item=editedItem>
          <!-- <v-btn @click.native="dialog = false">cancelar</v-btn> -->
        </office-form>
      </v-dialog>
      <v-data-table :no-data-text=noDataText
        :no-results-text=noResultText
        rows-per-page-text="Registros por pagina"
        :rows-per-page-items=rowsPerPageItems
        :loading="loading"
        :headers="headers"
        :items="items"
        :search="search"
        :pagination.sync="pagination"
        :total-items="totalItems">
        <template slot="items"
          slot-scope="props">
          <td>{{ props.item.name }}</td>
          <td class="text-xs-right">{{ props.item.shortName }}</td>
          <td class="text-xs-right">{{ props.item.description }}</td>
          <td class="text-xs-right">
            <v-btn icon>
              <v-icon>{{ props.item.active? 'check':'close' }}</v-icon>
            </v-btn>
          </td>
          <td class="justify-center layout px-0">
            <v-btn icon
              class="mx-0"
              @click.stop="editItem(props.item)">
              <v-icon color="teal">edit</v-icon>
            </v-btn>
            <v-btn icon
              class="mx-0"
              @click="deleteItem(props.item)">
              <v-icon color="pink">delete</v-icon>
            </v-btn>
          </td>
        </template>
        <template slot="pageText"
          slot-scope="{ pageStart, pageStop, itemsLength }">
          {{ pageStart }}-{{ pageStop }} de {{itemsLength}}
        </template>
      </v-data-table>
    </v-card>
    <v-btn fab
      bottom
      right
      color="teal"
      dark
      fixed
      @click.stop="showForm(true)">
      <v-icon>add</v-icon>
    </v-btn>
    <confirm-dialog ref="confirm"></confirm-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
// import store from "../store/index";
import officeForm from "./OfficeForm";
// import quickButton from "./util/QuickButton";
import confirmDialog from "./util/ConfirmDialog";
export default {
  components: {
    officeForm,
    // quickButton
    confirmDialog
  },
  data: () => ({
    search: "",
    pagination: {
      descending: false,
      page: 1,
      rowsPerPage: 10,
      sortBy: "name",
      totalItems: 0
    },
    // items: [],
    editedItem: {},
    editedIndex: -1,
    dialog: false
    // editedItem: {},
    // editedIndex: -1
  }),
  watch: {
    pagination: {
      handler() {
        // this.search.length
        //   ? this.fetchDataFromApiByName()
        //   : this.fetchDataFromApi();
        this.updatePagination(this.pagination);
        this.fetchOffices();
      },
      deep: true
    },
    dialog(val) {
      val || this.close();
    },
    live(val) {
      val || this.close();
    }
  },
  created() {
    this.fetchOffices();
  },
  methods: {
    showForm(value) {
      this.dialog = value;
      this.keepAlive(value);
    },
    editItem(item) {
      this.editedIndex = this.items.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.showForm(true);
    },
    deleteItem(item) {
      const index = this.items.indexOf(item);
      this.$refs.confirm
        .open("Eliminar solicitante", "Esta seguro?")
        .then(confirm => {
          if (confirm) {
            this.deleteClaimant(item);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    close() {
      console.log("Closing");
      this.showForm(false);
      setTimeout(() => {
        this.editedItem = Object.assign({}, {});
        this.editedIndex = -1;
      }, 300);
    },
    ...mapActions({
      fetchOffices: "offices/fetchOffices",
      deleteOffice: "offices/deleteOffice",
      updatePagination: "offices/updatePagination",
      setDialog: "offices/setDialog",
      keepAlive: "offices/keepAlive"
    })
  },
  computed: {
    ...mapGetters({
      headers: "offices/getHeaders",
      rowsPerPageItems: "offices/getRowsPerPageItems",
      items: "offices/getOffices",
      loading: "offices/getLoading",
      totalItems: "offices/getTotalItems",
      noDataText: "offices/getNoDataText",
      noResultText: "offices/getNoResultText",
      live: "offices/isAlive"
    })
  }
};
</script>
<style lang="scss">

</style>
