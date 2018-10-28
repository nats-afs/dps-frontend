<template lang='pug'>
  v-app(dark)
    sidebar
    appbar
    v-content
      v-container(fluid)
        router-view
    v-navigation-drawer(temporary :right='right' v-model='rightDrawer' fixed)
      v-list
        v-list-tile(@click.native='right = !right')
          v-list-tile-action
            v-icon compare_arrows
          v-list-tile-title Switch drawer (click me)
    v-footer(:fixed='fixed' app)
      span &copy; 2018 
</template>

<script>
import sidebar from './components/layout/Sidebar'
import appbar from './components/layout/Appbar'
import { mapGetters } from "vuex";
export default {
  components: {
    sidebar,
    appbar
  },
  data: () => ({
    fixed: true,
    right: true,
    rightDrawer: false,
  }),
  computed: {
    ...mapGetters({
      title: 'getTitle',
    })
  },
  methods: {
    dd() {
      console.log("click");
    },
  }
};
</script>