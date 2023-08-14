import { createRouter, createWebHistory } from 'vue-router';

// Örnek sayfa bileşenleri
import Home from '../views/Home.vue';
import Search from '../views/Search.vue';
import My from '../views/My.vue';
const routes = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/my',
    component: My,
  },
  {
    path: '/search',
    component: Search,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;