<template>
  <v-layout row
    justify-center>
    <v-dialog v-model="dialog"
      max-width="290">
      <v-card>
        <v-card-title class="headline">{{title}}</v-card-title>
        <v-card-text>{{message}}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1"
            flat
            @click.native="cancel()">No</v-btn>
          <v-btn color="green darken-1"
            flat
            @click.native="ok()">Si</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: 'Mensaje de confirmacion?'
    },
    message:{
      type:String,
      default:'Esta seguro de realizar la accion'
    }
  },
  data: () => ({}),
  watch: {
    dialog(val) {
      val || this.close()
    }
  },
  // data () {
  //   return {
  //     dialog: false
  //   }
  // }
};
</script>