import { createRouter, createWebHistory } from 'vue-router';
import Menu from '../views/Menu.vue';
import productAdd from '../components/addproduct.vue';
import productList from '../views/productList.vue';
import purchasedList from '../components/purchasedList';
import User from '../components/signUp.vue';
import Login from '../views/login.vue';

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/addingUser',
    name: 'adduser',
    component: User,
  },
  {
    path: '/purchaseList',
    name: 'purchasedList',
    component: purchasedList,
  },
  {
    path: '/add',
    name: 'adding',
    component: productAdd,
  },
  {
    path: '/list',
    name: 'listing',
    component: productList,
  },
  {
    path: '/menu',
    name: 'menu',
    component: Menu,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
