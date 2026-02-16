import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createI18n } from 'vue-i18n'
import { ca, es } from './locales/diccionario.js'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

const i18n = createI18n({
    legacy: false,      // Necesario para Composition API
    locale: localStorage.getItem('idioma') || 'ca', // Recordar idioma al recargar
    fallbackLocale: 'es',
    messages: { ca, es }
})

const app = createApp(App)
app.use(i18n)
app.use(router)
app.mount('#app')