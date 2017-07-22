<template>
  <v-layout column>
    <v-subheader v-text="subtitle"></v-subheader>
    <v-flex xs12 sm6 offset-sm4>
      <v-card>
        <v-card-media v-bind:src="user.image" contain height="400" width="400"></v-card-media>
        <v-card-title primary-title>
          <div>
            <div class="headline">{{user.name}}</div>
            <span class="grey--text">{{user.username}}</span>
          </div>
        </v-card-title>
        <v-card-actions>
          <v-btn flat>Edit</v-btn>
          <v-btn flat class="red--text">Delete</v-btn>
          <v-spacer></v-spacer>
          <v-btn icon @click.native="show = !show">
            <v-icon>{{ show ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
          </v-btn>
        </v-card-actions>
        <v-slide-y-transition>
          <v-card-text v-show="show">
            I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to escape.
          </v-card-text>
        </v-slide-y-transition>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
export default {
  async asyncData({ params, store, app }) {
    let user;
    let subtitle = 'Select an user from the list on the left';
    try {
      user = await app.$axios.get(`/users/${params.id}`).then(res => res.data);
    } catch (error) {
      return console.error(error);
    }
    if (user) {
      subtitle = user.name
      user.image = `https://randomuser.me/api/portraits/men/${user.id}.jpg`
    }
    return { subtitle, user }
  },
  data() {
    return {
      subtitle: 'Select from the list on the left',
      user: undefined,
      show: false
    }
  }
}
</script>
