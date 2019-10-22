<template>
  <form v-on:submit.prevent="onSubmit">
    <v-card>
      <v-subheader v-text="'Let\'s Fill that User Data'"></v-subheader>
      <v-card-text>
        <v-container fluid>
          <v-layout row-sm column-xs>
            <v-flex xs12 sm4>
              <v-subheader class="grey--text text--lighten-1">Username</v-subheader>
            </v-flex>
            <v-flex xs12 sm8>
              <v-text-field
                v-model="formUsername"
                name="input-1-3"
                label="In-site name"
                required
                class="input-group"
                single-line
                dark
                prepend-icon="account"
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row-sm column-xs>
            <v-flex xs12 sm4>
              <v-subheader class="grey--text text--lighten-1">Name</v-subheader>
            </v-flex>
            <v-flex xs12 sm8>
              <v-text-field
                v-model="formName"
                name="input-2-3"
                label="Real name"
                required
                class="input-group"
                prepend-icon="account"
                single-line
                dark
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row-sm column-xs>
            <v-flex xs12 sm4>
              <v-subheader class="grey--text text--lighten-1">Last Name</v-subheader>
            </v-flex>
            <v-flex xs12 sm8>
              <v-text-field
                v-model="formLastName"
                name="input-3-3"
                label="your last name"
                required
                prepend-icon="account"
                single-line
                dark
              ></v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
        <v-snackbar
          :timeout="timeout"
          :success="context === 'success'"
          :error="context === 'error'"
          v-model="snackbar"
        >{{message}}</v-snackbar>
      </v-card-text>
      <v-card-actions>
        <v-btn v-if="!id" type="reset" text ripple dark class="orange--text">Reset</v-btn>
        <v-btn type="submit" text ripple dark class="green--text">Save User</v-btn>
      </v-card-actions>
    </v-card>
  </form>
</template>
<script>
export default {
  props: ["name", "username", "lastName", "id"],
  data() {
    return {
      timeout: 4000,
      context: "success",
      snackbar: false,
      message: "",
      formName: this.name,
      formUsername: this.username,
      formLastName: this.lastName
    };
  },
  methods: {
    async onSubmit() {
      let result;
      try {
        if (this.id) {
          result = this.$axios
            .patch(`/users/${this.id}`, {
              name: this.formName,
              lastName: this.formLastName,
              username: this.formUsername
            })
            .then(res => res.data);
        } else {
          result = this.$axios
            .post("/users", {
              name: this.formName,
              lastName: this.formLastName,
              username: this.formUsername
            })
            .then(res => res.data);
          this.$router.push({ name: "users" });
        }
      } catch (error) {
        this.context = "error";
        this.snackbar = true;
        this.message = "Something went wrong :/";
        return console.error(error);
      }
      this.context = "success";
      this.snackbar = true;
      this.message = "User Saved!";
      this.$emit("updateduser", {
        username: this.username,
        name: this.name,
        lastName: this.lastName
      });
    }
  }
};
</script>
