import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* wepackChunkName: "Home" */ '../views/Home/Home.vue'),
  },
  {
    path: '/sign-up',
    name: 'SignUp',
    component: () => import(/* webpackChunkName: "blogs" */ '../views/SignUp/SignUp.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "blogs" */ '../views/Login/Login.vue')
  },
  {
    path: '/blogs',
    name: 'Blogs',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "blogs" */ '../views/Blogs/Blogs.vue')
  },
  {
    path: '/blogs/:id',
    name: 'BlogDetails',
    props: true,
    component: () => import(/* webpackChunkName: "blogs" */ '../views/BlogDetails/BlogDetails.vue'),
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About/About.vue'),
  },
  {
    path: '/account',
    name: 'Account',
    component: () => import(/* webpackChunkName: "account" */ '../views/Account/Account.vue'),
  },
  {
    path: '*',
    component: () => import(/* wepackChunkName: "Home" */ '../views/Home/Home.vue'),
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes,
})

export default router
