<template>
  <v-card v-if=live>
    <v-container>
      <v-alert color="success"
        icon="check_circle"
        :value="alert"
        transition="scale-transition">
        {{alertMessage}}
      </v-alert>
      <v-card-title>
        <span class="headline">{{ formTitle }}</span>
      </v-card-title>
      <v-card-text>
        <v-layout>
          <v-flex>
            <v-form>
              <v-text-field label="Nombre"
                v-model="item.name"
                :error-messages="nameErrors"
                @input="$v.item.name.$touch()"
                @blur="$v.item.name.$touch()"
                required></v-text-field>
              <v-text-field label="Abreviatura"
                v-model="item.shortName"
                :error-messages="shortNameErrors"
                @change="$v.item.shortName.$touch()"
                @blur="$v.item.shortName.$touch()"
                required></v-text-field>
              <v-text-field label="Descripcion"
                v-model="item.description"
                multi-line
                :error-messages="descriptionErrors"
                @input="$v.item.description.$touch()"
                @blur="$v.item.description.$touch()"
                required></v-text-field>
              <v-checkbox label="Activo"
                v-model="item.active"
                required></v-checkbox>
              <v-btn @click="submit">{{buttonTitle}}</v-btn>
              <v-btn v-if="index === -1"
                @click="clear">limpiar</v-btn>
              <v-btn @click="close">cancelar</v-btn>
              <slot></slot>
            </v-form>
          </v-flex>
        </v-layout>
      </v-card-text>
    </v-container>
  </v-card>
</template>
<script>
import { validationMixin } from "vuelidate";
import { required, maxLength, email, between } from "vuelidate/lib/validators";
import moment from "moment";
// import { axiosClient } from "./config/axiosConfig";
// import axios from "axios";
import { mapGetters, mapActions } from "vuex";
export default {
  props: {
    index: {
      type: Number,
      default: -1
    },
    item: {
      type: Object,
      default: function() {
        return {
          name:'',
          shortName: '',
          description: '',
          active:false
        };
      }
    }
  },
  mixins: [validationMixin],
  validations: {
    item: {
      name: { required },
      shortName: { required },
      description: { required }
    }
  },
  data: () => ({
    alert: false
  }),
  created() {
    console.log("Im alive");
    this.living = true;
  },
  destroyed() {
    console.log("Im death");
  },
  methods: {
    submit() {
      this.$v.item.$touch();
      if (this.$v.item.$error) {
        console.log("Invalido");
        return;
      }
      this.index > -1
        ? this.editOffice({ index: this.index, item: this.item })
        : this.saveOffice(this.item);
    },
    clear() {
      this.$v.item.$reset();
      this.item.name = null;
      this.item.shortName = null;
      this.item.description = null;
      this.item.active = null;
    },
    close() {
      console.log("close method");
      this.keepAlive(false);
    },
    ...mapActions({
      saveOffice: "offices/saveOffice",
      editOffice: "offices/editOffice",
      keepAlive: "offices/keepAlive"
    })
  },
  computed: {
    formTitle() {
      return this.index === -1 ? "Nueva Oficina" : "Editar Oficina";
    },
    buttonTitle() {
      return this.index === -1 ? "Guardar" : "Editar";
    },
    alertMessage() {
      return !this.edit
        ? "Oficina guardada exitosamente"
        : "Oficina editada exitosamente";
    },
    nameErrors() {
      const errors = [];
      if (!this.$v.item.name.$dirty) return errors;
      !this.$v.item.name.required && errors.push("Nombre requerido.");
      return errors;
    },
    shortNameErrors() {
      const errors = [];
      if (!this.$v.item.shortName.$dirty) return errors;
      !this.$v.item.shortName.required && errors.push("Abreviacion requerida");
      return errors;
    },
    descriptionErrors() {
      const errors = [];
      if (!this.$v.item.description.$dirty) return errors;
      !this.$v.item.description.required &&
        errors.push("Descripcion requerida");
      return errors;
    },
    // activeErrors() {
    //   const errors = [];
    //   if (!this.$v.item.active.$dirty) return errors;
    //   !this.$v.item.active.required && errors.push("E-mail es requerido");
    //   return errors;
    // },
    ...mapGetters({ live: "offices/isAlive" })
  }
};
</script>