import { createRouter, createWebHistory } from 'vue-router'
import Cookies from 'js-cookie' // ¡Importante importar esto aquí también!
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import HomeView from "@/views/HomeView.vue"
import ScannerView from "@/views/ScannerView.vue"
import FormView from "@/views/FormView.vue"

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
            component: HomeView,
            meta: { requiresAuth: true } // Añadimos metadatos para proteger la ruta
        },
        {
            path: '/scanner',
            name: 'scanner',
            component: ScannerView,
            meta: { requiresAuth: true }
        },
        {
            path: '/form',
            name: 'form',
            component: FormView,
            meta: { requiresAuth: true }
        }
    ]
})

// GUARDIA DE NAVEGACIÓN
router.beforeEach((to, from, next) => {
    const usuarioLogueado = Cookies.get('usuario_logeado')

    // Si la ruta requiere autenticación y NO hay cookie, mandamos al login
    if (to.meta.requiresAuth && !usuarioLogueado) {
        next('/login')
    }
    // Si el usuario ya está logueado e intenta ir al login o register, lo mandamos al home
    else if ((to.name === 'login' || to.name === 'register') && usuarioLogueado) {
        next('/home')
    }
    // En cualquier otro caso, dejamos pasar
    else {
        next()
    }
})

export default router