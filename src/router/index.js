import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    name: 'home',
    path: '/',
    meta: {
      title: '首页'
    },
    component: () => import('../components/Home.vue'),
    redirect: '/welcome',
    children: [
      {
        name: 'welcome',
        path: '/welcome',
        meta: {
          title: '欢迎'
        },
        component: () => import('../views/Welcome.vue')
      }
    ]
  },
  {
    name: 'login',
    path: '/login',
    meta: {
      title: '登录'
    },
    component: () => import('../views/Login.vue')
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
