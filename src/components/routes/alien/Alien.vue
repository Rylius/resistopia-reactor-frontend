<template>
    <section class="alien">
        <section class="content">
            <!-- TODO -->
        </section>

        <section class="offline-popup" v-if="!websocketOpen()">
            <!-- TODO -->
        </section>
    </section>
</template>

<style lang="less">
    @alien-color: #e5ffef;

    .alien {
        width: 1440px;
        height: 900px;
        margin: 0 auto;

        background-color: @alien-color;

        /* Disable text selection ('cause it looks bad) */
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }
</style>

<script>
    import Simulation from 'resistopia-reactor-simulation';

    import {startUpdate, stopUpdate} from '../../../util/tween';

    import merge from 'deepmerge';

    import {createFrontendState} from '../../../simulation';
    import createAlerts, {AlertTab, AlertType} from '../../../alerts';

    import {normalizedToRange} from '../../../util/math';

    import BackendWebsocketMixin from '../../../mixins/backend_websocket';

    function mapNormalizedProperty(state, stateMachine, property, value) {
        const config = state.stateMachines[stateMachine][property];
        if (typeof config.min === 'number' && typeof config.max === 'number') {
            return normalizedToRange(value, config.min, config.max);
        } else {
            return value;
        }
    }

    export default {
        name: 'alien',
        mixins: [
            BackendWebsocketMixin,
        ],
        data() {
            const program = Simulation.Program.BE13;

            return {
                simulation: {
                    program: program,
                    state: Simulation.createInitialState(program),
                    stateChanges: {},
                    intervalId: null,
                },
            };
        },
        methods: {
            changeProperty(stateMachine, property, value) {
                this.changeState({
                    [stateMachine]: {
                        [property]: mapNormalizedProperty(this.state, stateMachine, property, value),
                    },
                });
            },
            changeState(changes) {
                this.simulation.stateChanges = merge(this.simulation.stateChanges, changes);

                // Instantly apply changes to local simulation
                this.simulation.state.stateMachines = merge(this.simulation.state.stateMachines, changes);

                if (!this.websocketOpen()) {
                    // Save changes for when connection has been restored
                    return;
                }

                // TODO Debounce

                this.websocket.send(JSON.stringify({
                    type: 'change-state',
                    data: this.simulation.stateChanges,
                }));

                this.simulation.stateChanges = {};
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

            this.registerBackendWebsocketListener('state', data => this.simulation.state.stateMachines = data);

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
