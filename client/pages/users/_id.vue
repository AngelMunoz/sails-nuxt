<template>
  <v-layout column align-center justify-center>
    <v-subheader xs12 v-text="subtitle"></v-subheader>
    <v-card>
      <v-img v-bind:src="user.image" contain height="400" width="400"></v-img>
      <v-card-title primary-title>
        <div>
          <div class="headline">{{user.name}}</div>
          <span class="grey--text">{{user.username}}</span>
        </div>
      </v-card-title>
      <v-card-actions>
        <v-btn v-on:click="deleteUser(user.id)" text class="red--text">Delete</v-btn>
        <v-spacer></v-spacer>
        <v-btn icon @click.native="show = !show">
          <v-icon>{{ show ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
        </v-btn>
      </v-card-actions>
      <v-slide-y-transition>
        <v-card-text v-show="show">
          <user-form
            v-bind:id="user.id"
            v-bind:name="user.name"
            v-bind:lastName="user.lastName"
            v-bind:username="user.username"
            v-on:updateduser="updateUser"
          />
        </v-card-text>
      </v-slide-y-transition>
    </v-card>
  </v-layout>
</template>
<script>
import UserForm from "../../components/UserForm.vue";
export default {
  async asyncData({ params, store, app }) {
    let user;
    let subtitle = "Select an user from the list on the left";
    try {
      user = await app.$axios.get(`/users/${params.id}`).then(res => res.data);
    } catch (error) {
      return console.error(error);
    }
    if (user) {
      subtitle = user.name;
      user.image = `https://randomuser.me/api/portraits/men/${user.id}.jpg`;
    }
    return { subtitle, user, editing: true };
  },
  data() {
    return {
      subtitle: "Select from the list on the left",
      user: {},
      show: false,
      editing: false
    };
  },
  components: {
    UserForm
  },
  methods: {
    async updateUser({ username, name, lastName }) {
      this.user = await this.$axios.get(`/users/${this.user.id}`).then(res => ({
        ...res.data,
        image: `https://randomuser.me/api/portraits/men/${this.user.id}.jpg`
      }));
    },
    async deleteUser(id) {
      let result;
      try {
        result = await this.$axios.delete(`/users/${id}`).then(res => res.data);
      } catch (error) {
        return console.error(error);
      }
      this.$router.push({ name: "users" });
    }
  }
};
</script>
