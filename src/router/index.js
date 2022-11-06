import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/RegisterView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/LoginView.vue')
  },
  {
    path: '/addfinding',
    name: 'addFinding',
    component: () => import('@/views/AddFindingView.vue')
  },
  {
    path: '/finding/:id',
    name: 'finding',
    component: () => import('@/views/FindingView.vue'),
    props: true
  },
  {
    path: '/freespace',
    name: 'freespace',
    component: () => import('@/views/FreespaceView.vue')
  },
  {
    path: '/profile/:id',
    name: 'profile',
    component: () => import('@/views/ProfileView.vue'),
    props: true
  },
  {
    path: '/profile/update',
    name: 'updateprofile',
    component: () => import('@/views/UpdateProfileView.vue')
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/SearchView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
