<template>
    <section>
        <nav>
            <div class="block-group">
                <div v-for="route in navigation" :key="route.text"
                     class="block nav-item-wrapper" :style="{width: (100 / navigation.length) + '%'}">
                    <router-link tag="a" :to="route.to" class="nav-item">
                        {{ route.text }}
                    </router-link>
                </div>
            </div>
        </nav>

        <section class="content">
            <router-view :state="state.stateMachines" @changeState="changeState"></router-view>
        </section>

        <div class="warning-strip">&nbsp;</div>
    </section>
</template>

<style lang="less">
    @import "../../../assets/less/engineering";
</style>

<script>
    import Simulation from 'resistopia-reactor-simulation';

    import {startUpdate, stopUpdate} from '../../../util/tween';

    import merge from 'deepmerge';

    import {createFrontendState} from '../../../simulation';

    export default {
        name: 'dashboard',
        data() {
            const program = Simulation.Program.BE13;

            return {
                simulation: {
                    program: program,
                    state: Simulation.createInitialState(program),
                    stateChanges: {},
                    intervalId: null,
                },
                navigation: [
                    {
                        to: {name: 'engineering/dashboard'},
                        text: 'dashboard',
                    },
                    {
                        to: {name: 'engineering/reactor'},
                        text: 'reactor',
                    },
                    {
                        to: {name: 'engineering/power'},
                        text: 'power',
                    },
                    {
                        to: {name: 'engineering/water'},
                        text: 'water',
                    },
                    {
                        to: {name: 'engineering/storage'},
                        text: 'storage',
                    },
                ],
            };
        },
        methods: {
            changeState(changes) {
                console.log(changes);
                this.simulation.stateChanges = merge(this.simulation.stateChanges, changes);
            },
        },
        computed: {
            state() {
                return createFrontendState(this.simulation.state);
            },
        },
        mounted() {
            // TODO
            this.simulation.intervalId = setInterval(() => {
                // Copy previous state and apply changes
                const state = merge({}, this.simulation.state);
                state.stateMachines = merge(state.stateMachines, this.simulation.stateChanges);
                this.simulation.stateChanges = {};

                this.simulation.state = Simulation.update(this.simulation.program, state);
            }, 1000);

            startUpdate();
        },
        beforeDestroy() {
            if (this.simulation.intervalId) {
                clearInterval(this.simulation.intervalId);
            }

            stopUpdate();
        },
    };
</script>
