<template lang="pug">
  v-navigation-drawer(fixed='' :mini-variant='isMinify' :clipped='isClipped' app='' :value='isVisible')
    v-list(dense='')
      template(v-for='item in items')
        v-layout(row='' v-if='item.heading' align-center='' :key='item.heading')
          v-flex(xs6='')
            v-subheader(v-if='item.heading')
              | {{ item.heading }}
          v-flex.text-xs-center(xs6='')
            a.body-2.black--text(href='#!') EDIT
        v-list-group(v-else-if='item.children' v-model='item.model' :key='item.text' :prepend-icon="item.model ? item.icon : item['icon-alt']" append-icon='keyboard_arrow_down')
          v-list-tile(slot='activator')
            v-list-tile-content
              v-list-tile-title
                | {{ item.text }}
          v-list-tile(v-for='(child, i) in item.children' :key='i' @click='action' :to='{name: child.pathname}')
            v-list-tile-action(v-if='child.icon')
              v-icon {{ child.icon }}
            v-list-tile-content
              v-list-tile-title
                | {{ child.text }}
        v-list-tile(v-else='' @click='action' :key='item.text' :to='{name: item.pathname}')
          v-list-tile-action
            v-icon {{ item.icon }}
          v-list-tile-content
            v-list-tile-title
              | {{ item.text }}
  
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data: () => ({}),
  computed: {
    ...mapGetters({
      items: "getSidebarItems",
      isVisible: "isVisible",
      isMinify: "isMinify",
      isClipped: "isClipped"
    })
  },
  methods: {
    action() {
      console.log("click on this button ");
    },
    ...mapActions(["toogleSidebar", "toogleClipped"])
  }
};
</script>

<style scoped>
</style>