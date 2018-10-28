<template>
  <div class="container">
    <v-speed-dial class="fab-button"
      v-model="fab"
      :bottom="bottom"
      :right="right"
      :direction="direction"
      :transition="transition"
      :fixed="fixed"
    >
      <v-btn
        slot="activator"
        color="blue darken-2"
        dark
        fab
        hover
        v-model="fab"
      >
        <v-icon>keyboard_arrow_up</v-icon>
        <v-icon>keyboard_arrow_down</v-icon>
      </v-btn>
      <v-btn
        fab
        dark
        small
        color="green"
      >
        <v-icon>edit</v-icon>
      </v-btn>
      <v-btn
        fab
        dark
        small
        color="indigo"
      >
        <v-icon>add</v-icon>
      </v-btn>
      <v-btn
        fab
        dark
        small
        color="red"
      >
        <v-icon>delete</v-icon>
      </v-btn>
    </v-speed-dial>
  </div>
</template>
<script>
export default {
  data: () => ({
    direction: "top",
    fab: false,
    fling: false,
    tabs: null,
    right: true,
    bottom: true,
    transition: "slide-y-reverse-transition",
    fixed: true
  })
};
</script>
<style lang="scss" scoped >
  .fab-button {
    bottom: 45px !important;
    right: 35px !important;
  }
</style>