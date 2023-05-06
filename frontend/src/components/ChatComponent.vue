<template>
  <div class="container">
    <div class="box" id="chat">
      <div class="container-messages" ref="container_messages">
        <div class="messages">
          <div v-bind:class="message.username === this.username ? 'box-message right' : 'box-message left'"
            v-for="message in messages" :key="message.username">
            <MyMessageComponent v-if="message.username === this.username" :text="message.text" :hora="message.time" />
            <OtherMessageComponent v-if="message.username !== this.username" :text="message.text" :hora="message.time"
              :username="message.username" />
          </div>
        </div>
      </div>
      <input id="campo_message" type="text" v-model="message" @keyup.enter="digitou">
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import io from 'socket.io-client';
import axios from 'axios';
import MyMessageComponent from './MyMessageComponent.vue';
import OtherMessageComponent from './OtherMessageComponent.vue';

export default {
  name: 'ChatComponent',
  components: {
    MyMessageComponent,
    OtherMessageComponent
  },
  data() {
    return {
      message: null,
      username: null,
      users: [],
      messages: [],
    }
  },
  created() {

    this.getAllMessages();

    // Cria uma nova instância do cliente WebSocket
    this.socket = io('http://10.4.3.105:3000');

    const urlSearch = new URLSearchParams(window.location.search);
    this.username = urlSearch.get("username");

    // Estabelece a conexão com o servidor WebSocket
    this.socket.connect();

    this.socket.emit("username", {
      username: this.username
    });

    this.socket.on("message", (data) => {
      console.log(this.messages)

      const date = new Date(data.datetime); // Multiplica por 1000 para obter milissegundos
      const hours = date.getHours().toString().padStart(2, '0'); // Garante que a hora tenha dois dígitos
      const minutes = date.getMinutes().toString().padStart(2, '0'); // Garante que os minutos tenham dois dígitos
      const secondsFormatted = date.getSeconds().toString().padStart(2, '0'); // Garante que os segundos tenham dois dígitos

      this.messages.push({
        username: data.username,
        text: data.text,
        time: `${hours}:${minutes}`
      })
    })

  },
  methods: {
    async getAllMessages() {
      axios.get('http://10.4.3.105:3000/findAllMessages')
        .then((response) => {
          response.data.forEach(v => {
            var date = new Date(v.datetime); // Multiplica por 1000 para obter milissegundos
            var hours = date.getHours().toString().padStart(2, '0'); // Garante que a hora tenha dois dígitos
            var minutes = date.getMinutes().toString().padStart(2, '0'); // Garante que os minutos tenham dois dígitos
            var secondsFormatted = date.getSeconds().toString().padStart(2, '0'); // Garante que os segundos tenham dois dígitos

            this.messages.push({
              username: v.username,
              text: v.text,
              time: `${hours}:${minutes}`
            })
          });

        })
    },
    digitou(e) {

      this.socket.emit("message", {
        message: this.message,
        username: this.username
      })

      this.$refs.container_messages.scrollTop = this.$refs.container_messages.scrollHeight

      this.message = ''
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  width: 60vw;
  min-width: 700px;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: stretch;
  padding: 30px;
  margin: 0 auto;
  border: 1px solid black;
}

.box {
  border: 1px solid blue;
  margin: 0 10px;
  overflow-y: auto;
  position: relative;
}

#chat {
  flex: 3;
  position: relative;
}

#campo_message {
  position: absolute;
  bottom: 10px;
  width: 80%;
  left: 50%;
  transform: translate(-50%, 0);
  padding: 10px;
  border-radius: 5px;
}

.container-messages {
  max-height: 100%;
  position: absolute;
  bottom: 50px;
  width: 100%;
  overflow-y: auto;
}

.messages {
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: end;
}

.box-message {
  margin: 10px 0;
  padding: 0 30px;
  display: flex;
}

.box-message.right {
  justify-content: end;
}

.box-message.left {
  justify-content: start;
}
</style>
