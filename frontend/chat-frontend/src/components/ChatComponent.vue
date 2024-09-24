<template>
  <div class="chat-container">
    <div class="chat-window">
      <div class="messages">
        <div v-for="(msg, index) in messages" :key="index" class="message">
          <p>{{ msg.text }}</p>
        </div>
      </div>
    </div>

    <div class="input-area">
      <input type="file" @change="handleFileUpload" class="file-input" accept=".pdf, .docx"/>
      <textarea v-model="message" class="message-input" placeholder="Escreva sua mensagem..."></textarea>
      <button @click="sendMessage" class="send-button">Enviar</button>
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
      file: null, // Variável para armazenar o arquivo anexado
    };
  },
  methods: {
    async sendMessage() {
      if (!this.message && !this.file) {
        alert("Digite uma mensagem ou anexe um arquivo.");
        return;
      }

      let formData = new FormData();
      if (this.file) {
        formData.append('file', this.file);
      }
      formData.append('message', this.message);

      try {
        // Envia a mensagem e/ou arquivo para o backend
        const response = await axios.post('http://localhost:3000/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        // Adiciona a resposta ao array de mensagens
        this.messages.push({ text: response.data.response || 'Arquivo enviado com sucesso!' });
        this.message = ''; // Limpa o campo de mensagem
        this.file = null; // Reseta o arquivo após o envio
      } catch (error) {
        console.error(error);
        this.messages.push({ text: 'Erro ao enviar a mensagem ou arquivo.' });
      }
    },
    handleFileUpload(event) {
      this.file = event.target.files[0];
    }
  }
};
</script>

<style scoped>
.chat-container {
  display: flex;
  flex-direction: column;
  max-width: 600px;
  margin: 0 auto;
  border: 1px solid #ccc;
  border-radius: 8px;
  height: 80vh;
}

.chat-window {
  flex: 1;
  padding: 16px;
  background-color: #f9f9f9;
  overflow-y: auto;
  border-bottom: 1px solid #ccc;
}

.messages {
  display: flex;
  flex-direction: column;
}

.message {
  background-color: #e1ffc7;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 8px;
  max-width: 70%;
  align-self: flex-start;
}

.input-area {
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: #fff;
}

.file-input {
  margin-right: 10px;
}

.message-input {
  flex: 1;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
  margin-right: 10px;
}

.send-button {
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.send-button:hover {
  background-color: #45a049;
}

</style>
