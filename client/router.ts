import Vue from 'vue';
import VueRouter from 'vue-router';
import FeedPage from './components/Feed/FeedPage.vue';
import AccountPage from './components/Account/AccountPage.vue';
import LoginPage from './components/Login/LoginPage.vue';
import RegisterPage from './components/Login/RegisterPage.vue';
import ProfilePage from './components/Profile/ProfilePage.vue';
import FindFriendsPage from './components/FindFriends/FindFriendsPage.vue';
import NotFound from './NotFound.vue';

Vue.use(VueRouter);

const routes = [
  {path: '/', name: 'Home', component: FeedPage},
  {path: '/account', name: 'Settings', component: AccountPage},
  {path: '/login', name: 'Login', component: LoginPage},
  {path: '/register', name: 'Register', component: RegisterPage},
  {path: '/profile', name: 'Profile', component: ProfilePage},
  {path: '/findFriends', name: 'Find Friends', component: FindFriendsPage},
  {path: '*', name: 'Not Found', component: NotFound}
];

const router = new VueRouter({routes});

/**
 * Navigation guards to prevent user from accessing wrong pages.
 */
router.beforeEach((to, from, next) => {
  if (router.app.$store) {
    if (to.name === 'Login' && router.app.$store.state.username) {
      next({name: 'Account'}); // Go to Account page if user navigates to Login and are signed in
      return;
    }

    if (
      to.name !== 'Login' &&
      to.name !== 'Register' &&
      !router.app.$store.state.username
    ) {
      next({name: 'Login'}); // Go to Login page if user navigates to any page and are not signed in
      return;
    }
  }

  next();
});

export default router;
