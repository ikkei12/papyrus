import Vue from 'vue';
import VueRouter from 'vue-router';
import firebase from 'firebase/app';
Vue.use(VueRouter);

const routes = [
  {
    path: '/login',
    name: 'no_auth/login',
    component: require('@/components/pages/LoginPage').default,
  },
  {
    path: '/',
    name: 'home',
    component: require('@/components/pages/HomePage').default,
  },
  {
    path: '/manageTask',
    name: 'manageTask',
    component: require('@/components/pages/ManageTaskPage').default,
  },
  {
    path: '/matrix',
    name: 'matrix',
    component: require('@/components/pages/MatrixPage').default,
  },
];

const router = new VueRouter({
  routes,
});

router.beforeResolve((to, from, next) => {
  if (to.path === '/login') {
    next();
  } else {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        next();
      } else {
        console.log('未認証');
        next({ path: '/login' });
      }
    });
  }
});

export default router;
