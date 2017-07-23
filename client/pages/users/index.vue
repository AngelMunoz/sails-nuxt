<template>
  <v-layout row>
    <v-flex xs12 sm6>
      <v-subheader v-text="subtitle" dark></v-subheader>
      <v-list v-if="$store.state.users.list.length > 0" two-line>
        <template v-for="user in $store.state.users.list">
          <v-list-tile avatar v-bind:key="user.name" router :to="{ name: 'users-id', params: { id: user.id } }" v-ripple>
            <v-list-tile-avatar>
              <img v-bind:src="urlImg(user.id)">
            </v-list-tile-avatar>
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title v-html="user.username"></v-list-tile-title>
              <v-list-tile-sub-title v-html="user.lastName"></v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-divider inset></v-divider>
        </template>
      </v-list>
      <user-form v-else/>
    </v-flex>
    <v-flex xs12 sm6>
      <nuxt-child/>
    </v-flex>
  </v-layout>
</template>
<script>
import UserForm from '~components/UserForm.vue';
export default {
  async fetch({ store, params, app }) {
    let users = [];
    try {
      users = await app.$axios.get('/users').then(res => res.data);
    } catch (error) {
      return console.error(error);
    }
    store.commit('users/setUsers', users);
  },
  data() {
    return {
      subtitle: 'Users',
      urlImg(id) {
        return `https://randomuser.me/api/portraits/men/${id}.jpg`
      }
    }
  },
  components: {
    UserForm
  }
}
</script>