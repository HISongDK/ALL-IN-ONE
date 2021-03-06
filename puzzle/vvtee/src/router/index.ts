import { RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'

export const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'home',
        component: HomeView,
    },
    {
        path: '/about',
        name: 'about',
        component: () => import('../views/AboutView.vue'),
    },
]
