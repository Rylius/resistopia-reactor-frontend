<template>
    <section class="alien" :class="{'hide-cursor': production}">
        <bokeh-lights style="position: absolute; top: 0; left: 0;" :enabled="effects.lights"></bokeh-lights>

        <section class="energy-distributor">
            <h1 v-if="!production">energy-distributor</h1>
        </section>

        <section class="energy-converter">
            <h1 v-if="!production">energy-converter</h1>
        </section>

        <section class="energy-capacitor">
            <energy-bar :elements="17"
                        :value="stateMachines['energy-capacitor'].energy.value / stateMachines['energy-capacitor'].capacity.value">
            </energy-bar>
        </section>

        <section class="core">
            <svg markup-inline src="../../../assets/svg/alien/core.svg"></svg>
        </section>

        <section class="offline-popup" v-if="!websocketOpen()">
            <!-- TODO -->
        </section>

        <white-noise style="position: absolute; top: 0; left: 0;" :enabled="effects.whiteNoise"></white-noise>
    </section>
</template>

<style lang="less" scoped>
    @alien-background: #cdeeb8;
    @alien-background2: #c9dec4;

    @keyframes core-animation {
        0% {
            transform: rotate(0deg);
            opacity: 1;
        }
        50% {
            opacity: 0.5;
        }
        100% {
            transform: rotate(360deg);
            opacity: 1;
        }
    }

    .alien {
        width: 1440px;
        height: 900px;
        margin: auto;

        overflow: hidden;

        position: relative;

        /*background: @alien-background2 linear-gradient(to bottom, @alien-background2, @alien-background, @alien-background2);*/
        background-image: url("../../../../static/img/alien_background.png");

        /* Disable text selection ('cause it looks bad) */
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;

        h1 {
            margin: 0;
        }

        .energy-capacitor {
            position: absolute;

            right: 60px;
            top: 60px;
        }

        @core-size: 256px;
        .core {
            position: absolute;

            width: @core-size;
            height: @core-size;

            right: 140px;
            bottom: 135px;

            transform-origin: 50% 50%;
            opacity: 1;

            animation: 2s linear core-animation infinite;
            transition: 10s opacity;
            &.online {
                animation-play-state: running;
            }
            &.offline {
                animation-play-state: paused;
                opacity: 0.25;
            }
        }
    }

    .hide-cursor {
        cursor: none;
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

    import EnergyBar from './components/EnergyBar.vue';
    import WhiteNoise from './components/WhiteNoise.vue';
    import BokehLights from './components/BokehLights.vue';

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
                effects: {
                    whiteNoise: false,
                    lights: true,
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
            stateMachines() {
                return this.state.stateMachines;
            },
            production() {
                return process.env.NODE_ENV !== 'development';
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
        components: {
            EnergyBar,
            WhiteNoise,
            BokehLights,
        },
    };
</script>
