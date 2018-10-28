<template lang="pug">
  #create.container
    v-card(hover)
      v-card-title
        span.headline Solicitantes
        v-spacer
        //
          <v-text-field append-icon="search"
          label="Buscar"
          single-line
          v-model="search"></v-text-field>
        v-btn.mx-0(flat icon)
          v-icon add
        v-btn.mx-0(flat icon)
          v-icon print
        v-btn.mx-0(flat icon)
          v-icon search
        v-btn.mx-0(flat icon)
          v-icon clone
      v-dialog(v-if='dialog' v-model='dialog' max-width='1000px')
        claimantform(:index='editedIndex' :item='editedItem')
          // <v-btn @click.native="dialog = false">cancelar</v-btn>
      v-data-table(:no-data-text='noDataText' :no-results-text='noResultText' rows-per-page-text='Registros por pagina' :rows-per-page-items='rowsPerPageItems' :loading='loading' :headers='headers' :items='items' :search='search' :pagination.sync='pagination' :total-items='totalItems')
        template(slot='items' slot-scope='props')
          td {{ props.item.name }}
          td.text-xs-right {{ props.item.doc }}
          td.text-xs-right {{ props.item.nroDoc }}
          td.text-xs-right {{ props.item.email }}
          td.text-xs-right {{ props.item.phone }}
          td.text-xs-right {{ props.item.address }}
          td.justify-center.layout.px-0
            v-btn.mx-0(icon @click.stop='editItem(props.item)')
              v-icon(color='teal') edit
            v-btn.mx-0(icon @click='deleteItem(props.item)')
              v-icon(color='pink') delete
        template(slot='pageText' slot-scope='{ pageStart, pageStop, itemsLength }')
          | {{ pageStart }}-{{ pageStop }} de {{itemsLength}}
    v-btn(fab bottom right color='teal' dark fixed @click.stop='showForm(true)')
      v-icon add
    confirm-dialog(ref='confirm')
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import store from "../store/index";
import claimantform from "./ClaimantForm";
// import quickButton from "./util/QuickButton";
import confirmDialog from "./util/ConfirmDialog";
export default {
  components: {
    claimantform,
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
        this.fetchClaimants();
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
    this.fetchClaimants();
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
      fetchClaimants: "claimants/fetchClaimants",
      deleteClaimant: "claimants/deleteClaimant",
      updatePagination: "claimants/updatePagination",
      setDialog: "claimants/setDialog",
      keepAlive: "claimants/keepAlive"
    })
  },
  computed: {
    ...mapGetters({
      headers: "claimants/getHeaders",
      rowsPerPageItems: "claimants/getRowsPerPageItems",
      items: "claimants/getClaimants",
      loading: "claimants/getLoading",
      totalItems: "claimants/getTotalItems",
      noDataText: "claimants/getNoDataText",
      noResultText: "claimants/getNoResultText",
      live: "claimants/isAlive"
    })
  }
};
</script>
<style lang="scss">

</style>
