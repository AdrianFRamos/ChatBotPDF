<template>
  <div>
    <h1>Chat</h1>
    <textarea v-model="message" placeholder="Escreva sua mensagem..."></textarea>
    <button @click="sendMessage">Enviar</button>
    <div v-for="msg in messages" :key="msg.id">
      <p>{{ msg.text }}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      message: '',
      messages: [],
    };
  },
  methods: {
    async sendMessage() {
      // Envie a mensagem para o backend
      const response = await axios.post('http://localhost:3000/upload', {
        message: this.message,
      });
      this.messages.push({ text: response.data.response });
      this.message = ''; // Limpa o campo de mensagem
    },
  },
};
</script>

<style>
/* Adicione estilos conforme necessário */
</style>
