import Vue from 'vue';
import Router from 'vue-router';

import EngineeringLayout from '../components/routes/engineering/Engineering.vue';
import EngineeringDashboard from '../components/routes/engineering/Dashboard.vue';
import EngineeringReactor from '../components/routes/engineering/Reactor.vue';
import EngineeringCooling from '../components/routes/engineering/Cooling.vue';
import EngineeringPower from '../components/routes/engineering/Power.vue';
import EngineeringStorage from '../components/routes/engineering/Storage.vue';

import TestEverything from '../components/routes/test/TestEverything.vue';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/engineering',
            component: EngineeringLayout,
            children: [
                {
                    path: '/',
                    name: 'engineering/dashboard',
                    component: EngineeringDashboard,
                },
                {
                    path: 'reactor',
                    name: 'engineering/reactor',
                    component: EngineeringReactor,
                },
                {
                    path: 'cooling',
                    name: 'engineering/cooling',
                    component: EngineeringCooling,
                },
                {
                    path: 'power',
                    name: 'engineering/power',
                    component: EngineeringPower,
                },
                {
                    path: 'storage',
                    name: 'engineering/storage',
                    component: EngineeringStorage,
                },
            ],
        },
        {
            path: '/test/everything',
            component: TestEverything,
        },
    ],
});
