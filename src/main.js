// src/main.js
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './firebase'; // Importujemy konfigurację Firebase

createApp(App)
  .use(router)
  .mount('#app');
