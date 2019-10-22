<template>
  <v-container>
    <v-list-item two-line>
      <v-list-item-content>
        <v-list-item-title>{{text}}</v-list-item-title>
        <v-list-item-subtitle>Username: {{username}}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
  </v-container>
</template>

<script>
export default {
  props: ["text", "username"]
};
</script>
