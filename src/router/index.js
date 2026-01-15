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

// --- SISTEMA DE PROTECCIÓN DE RUTAS ---
router.beforeEach((to, from, next) => {
    // 1. Miramos si el usuario está en localStorage (lo que usas en el Home)
    const usuarioLogeado = localStorage.getItem('usuario_logeado')

    // 2. Definimos qué páginas son públicas
    const paginasPublicas = ['/login', '/register']
    const esPaginaPublica = paginasPublicas.includes(to.path)

    // 3. Lógica de redirección
    if (!esPaginaPublica && !usuarioLogeado) {
        // Si intenta ir a una privada sin estar logueado -> Al Login
        return next('/login')
    }

    if (esPaginaPublica && usuarioLogeado) {
        // Si ya está logueado e intenta ir al Login -> Al Home
        return next('/home')
    }

    // En cualquier otro caso, dejamos pasar
    next()
})

export default router