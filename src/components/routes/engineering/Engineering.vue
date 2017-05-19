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
    import {createInitialState, update} from 'resistopia-reactor-simulation';
    import prototype from 'resistopia-reactor-simulation/data/prototype';

    import {startUpdate, stopUpdate} from '../../../util/tween';

    import merge from 'deepmerge';

    export default {
        name: 'dashboard',
        data() {
            const stateMachine = prototype();

            return {
                stateMachine: stateMachine,
                state: createInitialState(stateMachine),
                stateChanges: {},
                simulationIntervalId: null,
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
                        to: {name: 'engineering/cooling'},
                        text: 'cooling',
                    },
                    {
                        to: {name: 'engineering/power'},
                        text: 'power',
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
                this.stateChanges = merge(this.stateChanges, changes);
            },
        },
        mounted() {
            // TODO
            this.simulationIntervalId = setInterval(() => {
                // Copy previous state and apply changes
                const state = merge({}, this.state);
                state.stateMachines = merge(state.stateMachines, this.stateChanges);
                this.stateChanges = {};

                this.state = update(this.stateMachine, state);
            }, 1000);

            startUpdate();
        },
        beforeDestroy() {
            if (this.simulationIntervalId) {
                clearInterval(this.simulationIntervalId);
            }

            stopUpdate();
        },
    };
</script>
