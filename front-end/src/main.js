import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Vuelidate from 'vuelidate'

// import './assets/main.css'
import './assets/tailwind.css'

const app = createApp(App)

app.use(router)
Vue.use(Vuelidate)
Vue.config.productionTip = false

app.mount('#app')
