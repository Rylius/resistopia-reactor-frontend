import Vue from 'vue';
import Router from 'vue-router';

import EngineeringLayout from '../components/routes/engineering/Engineering.vue';
import EngineeringDashboard from '../components/routes/engineering/Dashboard.vue';
import EngineeringReactor from '../components/routes/engineering/Reactor.vue';
import EngineeringPower from '../components/routes/engineering/Power.vue';
import EngineeringWater from '../components/routes/engineering/Water.vue';
import EngineeringStorage from '../components/routes/engineering/Storage.vue';

import Alien from '../components/routes/alien/Alien.vue';

import TestEverything from '../components/routes/test/TestEverything.vue';
import TestAudio from '../components/routes/test/TestAudio.vue';

import DebugSimulation from '../components/routes/debug/Simulation.vue';

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
                    path: 'power',
                    name: 'engineering/power',
                    component: EngineeringPower,
                },
                {
                    path: 'water',
                    name: 'engineering/water',
                    component: EngineeringWater,
                },
                {
                    path: 'storage',
                    name: 'engineering/storage',
                    component: EngineeringStorage,
                },
            ],
        },
        {
            path: '/alien',
            component: Alien,
        },
        {
            path: '/test/everything',
            component: TestEverything,
        },
        {
            path: '/test/audio',
            component: TestAudio,
        },
        {
            path: '/debug/simulation',
            component: DebugSimulation,
        },
    ],
});
