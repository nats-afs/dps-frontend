<template>
  <v-app id="inspire">
    <v-content>
      <v-container fluid
        fill-height>
        <v-layout align-center
          justify-center>
          <v-flex xs12
            sm8
            md4>
            <v-dialog :value="true"
              persistent>
              <v-card>
                <v-card-title>Login Form</v-card-title>
                <v-card-text>
                  <v-form>
                    <v-text-field prepend-icon="person"
                      name="login"
                      label="Login"
                      type="text"></v-text-field>
                    <v-text-field prepend-icon="lock"
                      name="password"
                      label="Password"
                      id="password"
                      type="password"></v-text-field>
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <v-btn>Login</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    model: {
      username: "admin",
      password: "123456"
    },
    fields: {
      username: { label: "Username" },
      password: { label: "Password", type: "password" }
    },
    show: true
  }),
  methods: {
    onSuccess(data) {
      this.$store.commit("setAuth", data);
      this.$router.replace("/");
    }
  },
  mounted() {}
};
</script>

<style scoped>
body {
  background: #666 !important;
}
</style>