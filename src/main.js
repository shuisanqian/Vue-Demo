import Vue from 'vue'
import router from './router/index'
import Alert from './util/alert'

Vue.use(Alert)

new Vue({
    router,
}).$mount('#app')
