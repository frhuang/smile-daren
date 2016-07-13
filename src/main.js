import Vue          from 'vue'
import VueRouter    from 'vue-router'
import VueResource  from 'vue-resource'
import RouterMap    from './routers'
import AppVue          from './App.vue'

const App = Vue.extend(AppVue);

Vue.use(VueRouter);
Vue.use(VueResource);
Vue.config.devtools = true;

let router = new VueRouter({
    hashbang: true,
    history: false,
    saveScrollPosition: true,
    transitionOnLoad: true,
    linkActiveClass: 'active'
});

RouterMap(router);

router.start(App, '#app');