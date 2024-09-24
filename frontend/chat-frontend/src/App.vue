<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <Chat />
  </div>
</template>

<script>
import Chat from './components/ChatComponent.vue'; // Importa o componente de chat

export default {
  name: 'App',
  components: {
    Chat, // Registra o componente de chat
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
