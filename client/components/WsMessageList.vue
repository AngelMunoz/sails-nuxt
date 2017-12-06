<template>
  <v-list two-line>
    <template v-for="(message, $index) in messages">
      <ws-message :username="message.username" :text="message.text" :key="$index"></ws-message>
    </template>
  </v-list>
</template>

<script>
import WsMessage from "./WsMessage.vue";

export default {
  props: ["messages"],
  components: {
    WsMessage
  }
};
</script>

