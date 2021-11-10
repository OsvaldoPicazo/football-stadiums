import { createRouter, createWebHistory } from "vue-router";
import About from '../views/About.vue'
import Home from '../views/Home.vue'

// array of route objects
const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/About',
        name: 'About',
        component: About,
    }
]

// createRouter takes an object with a history property
const router = createRouter({
    // history takes a base URL
    history: createWebHistory(process.env.BASE_URL),
    routes,
})

export default router