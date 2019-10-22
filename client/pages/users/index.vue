<template>
  <v-layout row>
    <div style="position: relative;">
      <v-subheader v-text="subtitle" dark></v-subheader>
      <v-btn absolute dark fab v-on:click="showAddUser">
        <v-icon>add</v-icon>
      </v-btn>
    </div>
    <v-dialog v-model="dialog" persistent>
      <user-form v-if="dialog" v-on:updateduser="updateList" />
      <v-btn text @click.native="dialog = false">Cancel</v-btn>
    </v-dialog>
    <v-flex xs12 sm6 style="height: 600px; overflow: auto;">
      <v-list v-if="$store.state.users.list.length > 0" three-line>
        <template v-for="(user, index) in $store.state.users.list">
          <v-divider :key="index"></v-divider>
          <v-list-item :key="index" :to="{ name: 'users-id', params: { id: user.id } }">
            <v-list-item-avatar>
              <v-img :src="urlImg(user.id)"></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title v-html="user.username"></v-list-item-title>
              <v-list-item-subtitle v-html="user.lastName"></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
      <user-form v-else-if="!dialog" v-on:updateduser="updateList" />
    </v-flex>
    <v-flex xs12 sm6>
      <nuxt-child />
    </v-flex>
  </v-layout>
</template>
<script>
import UserForm from "../../components/UserForm.vue";
export default {
  async fetch({ store, params, app }) {
    let users = [];
    try {
      users = await app.$axios.get("/users").then(res => res.data);
    } catch (error) {
      return console.error(error);
    }
    store.commit("users/setUsers", users);
  },
  data() {
    return {
      subtitle: "Users",
      dialog: false,
      urlImg(id) {
        return `https://randomuser.me/api/portraits/men/${id}.jpg`;
      }
    };
  },
  components: {
    UserForm
  },
  methods: {
    showAddUser() {
      this.dialog = true;
    },
    async updateList() {
      let users;
      try {
        users = await this.$axios.get("/users").then(res => res.data);
      } catch (error) {
        return console.error(error);
      }
      this.$store.commit("users/setUsers", users);
      this.dialog = false;
    }
  }
};
</script>
