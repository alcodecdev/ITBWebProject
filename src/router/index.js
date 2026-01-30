import { createRouter, createWebHistory } from 'vue-router'
import Cookies from 'js-cookie'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
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
            meta: {requiresAuth: false}
        },
        {
            path: '/login',
            name: 'login',
            component: LoginView,
            meta: { requiereAuth: false }
        },
        {
            path: '/register',
            name: 'register',
            component: RegisterView,
            meta: { requiereAuth: false }
        },
        {
            path: '/home',
            name: 'home',
            component: HomeView,
            meta: { requiereAuth: true }
        },
        {
            path: '/form/:nifURL?',
            name: 'form',
            component: FormView,
            meta: { requiereAuth: true }
        }
    ]
})

// --- GUARDIA DE SEGURIDAD ---
router.beforeEach((to, from, next) => {
    const sesionActiva = Cookies.get('usuario_logeado');

    // Si la ruta es privada y NO hay cookie, bloqueado
    if (to.meta.requiereAuth && !sesionActiva) {
        return next('/login');
    }

    next(); // En cualquier otro caso, adelante
});

export default router;