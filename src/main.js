// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// import Vue from 'vue'
// import App from './App'
// import router from './router'

// new Vue({
//   el: '#app',
//   router,
//   template: '<App/>',
//   components: { App }
// })

import Vue from 'vue'
import router from './router/index'
import Alert from './util/alert'
Vue.use(Alert)

// const router = new VueRouter({
//   routes:[
//         {path: '/',component: App},
//         {path:'/foo',component:{ template: '<div>foo<br/><router-link to="/childen">childen</router-link><router-view></router-view></div>' },
//             children:[{
//                 path:':childen',component:{template:'<div>childen</div>'}
//             }]
//         },
//         {path:'/bar',component:{ template: '<div>bar</div>' }}
//   ]
// })
new Vue({
    router,
}).$mount('#app')
