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
              <v-text-field label="Nombre/Razon Social"
                v-model="item.name"
                :error-messages="nameErrors"
                @input="$v.item.name.$touch()"
                @blur="$v.item.name.$touch()"
                required></v-text-field>
              <v-select label="Documento"
                v-model="item.doc"
                :items="items"
                :error-messages="documentErrors"
                @change="$v.item.doc.$touch()"
                @blur="$v.item.doc.$touch()"
                required></v-select>
              <v-text-field label="Numero de documento"
                v-model="item.nroDoc"
                :error-messages="documentNumberErrors"
                @input="$v.item.nroDoc.$touch()"
                @blur="$v.item.nroDoc.$touch()"
                required></v-text-field>
              <v-text-field label="E-mail"
                v-model="item.email"
                :error-messages="emailErrors"
                @input="$v.item.email.$touch()"
                @blur="$v.item.email.$touch()"
                required></v-text-field>
              <v-text-field label="Telefono"
                v-model="item.phone"
                :error-messages="phoneNumberErrors"
                @input="$v.item.phone.$touch()"
                @blur="$v.item.phone.$touch()"
                required></v-text-field>
              <v-text-field label="Direccion"
                v-model="item.address"
                :error-messages="addressErrors"
                @input="$v.item.address.$touch()"
                @blur="$v.item.address.$touch()"
                required></v-text-field>
              <!-- <v-checkbox label="Do you agree?"
                  v-model="checkbox"
                  :error-messages="checkboxErrors"
                  @change="$v.checkbox.$touch()"
                  @blur="$v.checkbox.$touch()"
                  required></v-checkbox> -->
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
        return {};
      }
    }
  },
  mixins: [validationMixin],
  validations: {
    item: {
      name: { required },
      doc: { required },
      nroDoc: { required },
      phone: { required, maxLength: maxLength(9) },
      email: { required, email },
      address: { required }
      // checkbox: { required }
    }
  },
  data: () => ({
    alert: false,
    items: ["DNI", "RUC"]
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
        ? this.editClaimant({ index: this.index, item: this.item })
        : this.saveClaimant(this.item);
    },
    clear() {
      this.$v.item.$reset();
      this.item.name = null;
      this.item.doc = null;
      this.item.nroDoc = null;
      this.item.phone = null;
      this.item.email = null;
      this.item.address = null;
    },
    close() {
      console.log("close method");
      this.keepAlive(false);
    },
    ...mapActions({
      saveClaimant: "claimants/saveClaimant",
      editClaimant: "claimants/editClaimant",
      keepAlive: "claimants/keepAlive"
    })
  },
  computed: {
    formTitle() {
      return this.index === -1 ? "Nuevo Solicitannte" : "Editar Noticia";
    },
    buttonTitle() {
      return this.index === -1 ? "Guardar" : "Editar";
    },
    alertMessage() {
      return !this.edit
        ? "Noticia guardada exitosamente"
        : "Noticia editada exitosamente";
    },
    documentErrors() {
      const errors = [];
      if (!this.$v.item.doc.$dirty) return errors;
      !this.$v.item.doc.required && errors.push("Item is required");
      return errors;
    },
    documentNumberErrors() {
      const errors = [];
      if (!this.$v.item.nroDoc.$dirty) return errors;
      !this.$v.item.nroDoc.required &&
        errors.push("Numero de documento es necesario");
      // !this.$v.item.nroDoc.between &&
      //   errors.push("Numero de documento debe tener entre 9 y 11 digitos");
      return errors;
    },
    nameErrors() {
      const errors = [];
      if (!this.$v.item.name.$dirty) return errors;
      !this.$v.item.name.required &&
        errors.push("Nombre/Razon social es requerido.");
      return errors;
    },
    phoneNumberErrors() {
      const errors = [];
      if (!this.$v.item.phone.$dirty) return errors;
      !this.$v.item.phone.required && errors.push("Numero es requerido.");
      !this.$v.item.phone.maxLength &&
        errors.push("Longitud maxima de numero es 9.");
      return errors;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.item.email.$dirty) return errors;
      !this.$v.item.email.email && errors.push("Ingrese un e-mail valido");
      !this.$v.item.email.required && errors.push("E-mail es requerido");
      return errors;
    },
    addressErrors() {
      const errors = [];
      if (!this.$v.item.address.$dirty) return errors;
      !this.$v.item.address.required && errors.push("Direcccion es requerido.");
      return errors;
    },
    ...mapGetters({ live: "claimants/isAlive" })
  }
};
</script>