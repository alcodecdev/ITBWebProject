import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import HomeView from "@/views/HomeView.vue";
import ScannerView from "@/views/ScannerView.vue";
import FormView from "@/views/FormView.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/login',
            name: 'login',
            component: LoginView
        },
        {
            path: '/register',
            name: 'register',
            component: RegisterView
        },
        {
            path: '/home',
            name: 'home',
            component: HomeView
        },
        {
            path: '/scanner',
            name: 'scanner',
            component: ScannerView
        },
        {
            path: '/form',
            name: 'form',
            component: FormView
        }
    ]
})


export default router