<template lang="pug">
  v-toolbar(fixed prominent extended app :clipped-left='isClipped')
    v-toolbar-side-icon(@click.stop='toogleSidebar')
    v-btn(icon @click.stop='toogleMinify')
      v-icon(v-html="isMinify ? 'chevron_right' : 'chevron_left'")
    //
      <v-btn icon
      @click.stop="toogleClipped">
      <v-icon>web</v-icon>
      </v-btn>
    v-toolbar-title(v-text='title')
    v-spacer
    .d-flex.align-center(style='margin-left: auto')
      v-btn(icon @click.stop='rightDrawer = !rightDrawer')
        v-icon menu
      v-btn(icon)
        v-icon apps
      v-btn(icon)
        v-icon notifications
      v-btn(icon large)
        v-avatar(size='32px' tile)
          img(src='https://vuetifyjs.com/static/doc-images/logo.svg' alt='Vuetify')
    v-breadcrumbs(divider='/' slot='extension')
      v-breadcrumbs-item(v-for='item in breadCrumbs' :key='item.text' :disabled='item.disabled')
        | {{ item.text }}
</template>


<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data: () => ({
    breadCrumbs: [
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
    ]
  }),
  computed: {
    ...mapGetters({
      title: "getTitle",
      isVisible: "isVisible",
      isMinify: "isMinify",
      isClipped: "isClipped"
      // getBreadcrumbs: 'getBreadcrumbs'
    })
  },
  methods: {
    ...mapActions(["toogleMinify", "toogleSidebar", "toogleClipped"])
  }
};
</script>

<style scoped>
</style>