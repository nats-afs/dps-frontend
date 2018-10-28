<template>
  <v-btn fab
    bottom
    right
    color="teal"
    dark
    fixed
    @click.stop="dialog = true">
    <v-icon>add</v-icon>
    <v-dialog v-model="dialog"
      width="800px">
      <claimantform :isAlive=dialog>
        <v-btn @click.native="dialog = false">cancelar</v-btn>
      </claimantform>
    </v-dialog>
    </v-btn>
</template>
<script>
import claimantform from "../ClaimantForm";
export default {
  components: {
    claimantform
  },
  data: () => ({
    dialog: false 
  }),
};
</script>

