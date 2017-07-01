import Vue from 'vue';

import VueI18n from 'vue-i18n';
import translations from './assets/i18n.json';

Vue.use(VueI18n);

const i18n = new VueI18n({
    messages: translations,
    locale: 'de',
});

import App from './App.vue';

import router from './router';

Vue.config.productionTip = false;

new Vue({
    el: '#app',
    router,
    i18n,
    render: h => h(App),
});
