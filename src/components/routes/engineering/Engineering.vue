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
            <router-view :state="state" @changeState="changeState"></router-view>
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
                state: createInitialState(stateMachine).stateMachines,
                stateChanges: {},
                intervalId: null,
                websocket: null,
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

                // TODO Debounce

                if (!this.websocket || this.websocket.readyState !== WebSocket.OPEN) {
                    return;
                }

                this.websocket.send(JSON.stringify({
                    type: 'change-state',
                    data: this.stateChanges,
                }));

                this.stateChanges = {};
            },
            onServerError() {
                console.log('websocket connection error:', arguments);
            },
            onServerMessage(message) {
                // TODO
                const data = JSON.parse(message.data);
                console.log(data);

                switch (data.type) {
                    case 'state':
                        this.state = data.data;
                        break;
                    default:
                        console.error(`Unknown websocket message type "${data.type}"`);
                        return;
                }
            },
        },
        mounted() {
            this.intervalId = setInterval(() => {
                // Copy previous state and apply changes
//                const state = merge({}, this.state);
//                state.stateMachines = merge(state.stateMachines, this.stateChanges);
//                this.stateChanges = {};

//                this.state = update(this.stateMachine, state);
            }, 1000);

            startUpdate();

            // TODO Read URL from config/env variable
            this.websocket = new WebSocket('ws://localhost:8081/ws/frontend', 'json');
            this.websocket.onerror = this.onServerError;
            this.websocket.onmessage = this.onServerMessage;
            // TODO
            this.websocket.onclose = () => this.websocket = null;
        },
        beforeDestroy() {
            if (this.intervalId) {
                clearInterval(this.intervalId);
            }

            stopUpdate();

            if (this.websocket) {
                this.websocket.close();
                this.websocket = null;
            }
        },
    };
</script>
