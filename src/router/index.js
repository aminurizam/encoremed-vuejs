import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import Appointment from '@/views/Appointment.vue'
import CreateAppointment from '@/views/CreateAppointment.vue'
import Auth from '@/auth'

const routes = [
    { path: '/', name: 'Home', component: Home },
    { path: '/login', name: 'Login', component: Login, beforeEnter: (to, from, next) => {
        // ...
        if (Auth.isAuthenticated()) {
            next('/appointments');
        } else {
            next();
        }
    } },
    {
        // only auth users can access
        path: '/appointments', name: 'Appointment', component: Appointment, meta: {
            requiresAuth: true,
        },
    },
    {
        path: '/appointment/create', name: 'CreateAppointment', component: CreateAppointment, meta: {
            requiresAuth: true,
        },
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth && !localStorage.getItem('access_token')) {
        next({ path: '/login' });
    } else {
        next();
    }
})

export default router;