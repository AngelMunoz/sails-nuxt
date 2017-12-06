<template>
  <v-container>
    <v-subheader>Username: {{username}}</v-subheader>
    <v-divider inset></v-divider>
    <v-list-tile-content>
      <v-list-tile-title>{{text}}</v-list-tile-title>
    </v-list-tile-content>
    <v-divider></v-divider>
  </v-container>
</template>

<script>
export default {
  props: ["text", "username"]
};
</script>
