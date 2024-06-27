import { createRouter, createWebHistory } from 'vue-router';
import Login from '../components/TheLogin.vue';
import Register from '../components/TheRegister.vue';
import UserProfile from '../components/UserProfile.vue';


const routes = [
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/profile', component: UserProfile },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;