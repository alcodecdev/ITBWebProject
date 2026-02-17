import { createRouter, createWebHistory } from 'vue-router'
import Cookies from 'js-cookie'
import LoginView from '@/views/LoginView.vue'
import HomeView from "@/views/HomeView.vue"
import FormView from "@/views/FormView.vue"
import ListView from "@/views/ListView.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/list',
            component: ListView,
            meta: {requiresAuth: true}
        },
        {
            path: '/login',
            name: 'login',
            component: LoginView,
            meta: { requiresAuth: false }
        },
        {
            path: '/home',
            name: 'home',
            component: HomeView,
            meta: { requiresAuth: true }
        },
        {
            path: '/form/:numAnimals?',
            name: 'form',
            component: FormView,
            meta: { requiresAuth: true }
        }
    ]

})

router.beforeEach((to, from, next) => {
    const sesionActiva = Cookies.get('usuario_logeado');

    // Si la ruta requiere autenticacion y NO hay cookie al Login
    if (to.meta.requiresAuth && !sesionActiva) {
        next('/login');
    }
    //Si ya está logeado e intenta ir al Login al Home
    else if (to.name === 'login' && sesionActiva) {
        next('/home');
    }
    //En cualquier otro caso adelante
    else {
        next();
    }
});

export default router;