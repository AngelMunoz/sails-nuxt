<template>
  <v-layout>
    <v-flex xs12 sm6 offset-sm3>
      <v-toolbar>
        <v-toolbar-title>WebSockets on Practice</v-toolbar-title>
      </v-toolbar>
      <v-card>
        <v-card-text>
          <div ref="scrollable" class="scrollable">
            <ws-message-list :messages="messageList"> </ws-message-list>
          </div>
          <v-text-field
              name="txtMessage"
              label="Message"
              v-model="text"
              multi-line
              @keypress.ctrl.enter="sendMessage()"
            ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn flat @click="sendMessage()">Send</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import WsMessageList from "../components/WsMessageList.vue";
export default {
  components: {
    WsMessageList
  },
  data() {
    return {
      text: "",
      username: `User:${Math.floor(Math.random() * 1000000) + 1}`,
      messageList: []
    };
  },
  methods: {
    sendMessage() {
      const payload = {
        username: this.username,
        text: this.text
      };
      this.$socket.post("/api/messages", payload, (record, jwtResponse) => {
        this.messageList.push(record);
        this.text = "";
        this.scrollDown();
      });
    },
    dispatchCreated(msg) {
      this.messageList.push(msg);
    },
    dispatchUpdated(msg) {
      const $index = this.messageList.findIndex(ms => ms.id == msg.id);
      this.messageList[$index] = msg;
    },
    dispatchDestroyed(msg) {
      const $index = this.messageList.findIndex(ms => ms.id == msg.id);
      this.messageList.splice($index, 1);
    },
    scrollDown() {
      this.$refs.scrollable.scrollTop =
        this.$refs.scrollable.scrollHeight - this.$refs.scrollable.clientHeight;
    }
  },
  mounted() {
    this.$socket.get("/api/messages", (body, response) => {
      this.messageList = this.messageList.concat(body);
      this.scrollDown();
    });
    this.$socket.on("message", res => {
      switch (res.verb) {
        case "created":
          this.dispatchCreated(res.data);
          this.scrollDown();
          break;
        case "updated":
          this.dispatchUpdated(res.data);
          break;
        case "destroyed":
          this.dispatchDestroyed(res.data);
          break;
      }
    });
  }
};
</script>

<style lang="stylus" scoped>
div.scrollable {
  max-height: 300px;
  overflow-y: auto;
}
</style>
