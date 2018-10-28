<template>
  <div>
    <v-snackbar :timeout="timeout"
      :color="color"
      :top="true"
      :right="true"
      :multi-line="mode === 'multi-line'"
      :vertical="mode === 'vertical'"
      :value="visible">
      {{ message }}
    </v-snackbar>
    <router-view></router-view>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data: () => ({
    // breadumb
    items: [
      {
        text: "Dashboard",
        disabled: false
      },
      {
        text: "Link 1",
        disabled: false
      },
      {
        text: "Link 2",
        disabled: true
      }
    ],
    // end breadcumb
    color: "success",
    mode: "",
    timeout: 6000,
  }),
  computed:{
    ...mapGetters({visible:"claimants/isVisible",message:'claimants/getMessage'})
  }
};
</script>
<style>
/* This is for documentation purposes and will not be needed in your application */
/* #create .speed-dial {
    position: absolute;
  }

  #create .btn--floating {
    position: relative;
  } */
.card--flex-toolbar {
  margin-top: -64px;
}
</style>