<template>
    <section>
        <nav>
            <div class="block-group">
                <div v-for="route in navigation" :key="route.text"
                     class="block nav-item-wrapper" :style="{width: (100 / navigation.length) + '%'}">
                    <router-link tag="a" :to="route.to" class="nav-item">
                        {{ $t('nav.' + route.text) }}
                    </router-link>

                    <div class="status warning">
                        &nbsp;
                    </div>
                </div>
            </div>
        </nav>

        <section class="content">
            <router-view :state="state.stateMachines"
                         @changeProperty="changeProperty" @changeState="changeState">
            </router-view>
        </section>

        <div class="warning-strip">&nbsp;</div>
    </section>
</template>

<style lang="less" scoped>
    @import "../../../assets/less/engineering";

    nav {
        padding: 5px;

        .warning-strip;

        .nav-item-wrapper {
            padding: 2px;

            &, &:focus {
                outline: none;
            }
        }

        .nav-item, .status {
            display: block;

            border-radius: 6px;

            color: @nav-item-color;
            background-color: @nav-item-background;

            text-decoration: none;

            &, &:focus {
                outline: none;
            }
        }

        .nav-item {
            padding: 10px;

            text-align: center;

            &.router-link-exact-active {
                color: @nav-item-active-color;
                background-color: @nav-item-active-background;
            }
        }

        .status {
            margin-top: 4px;
            border: 2px solid @nav-item-active-background;
            padding: 4px;

            font-size: 0.8em;

            &.critical {
                border-color: @signal-red-disabled;
                background-color: @signal-red-highlight;
            }
            &.warning {
                border-color: @signal-orange-disabled;
                background-color: @signal-orange;
            }
            &.normal {
                border-color: @signal-green-disabled;
                background-color: @signal-green;
            }
        }
    }
</style>

<script>
    import Simulation from 'resistopia-reactor-simulation';

    import {startUpdate, stopUpdate} from '../../../util/tween';

    import merge from 'deepmerge';

    import {createFrontendState} from '../../../simulation';

    import {normalizedToRange} from '../../../util/math';

    function mapNormalizedProperty(state, stateMachine, property, value) {
        const config = state.stateMachines[stateMachine][property];
        return normalizedToRange(value, config.min, config.max);
    }

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
            changeProperty(stateMachine, property, value) {
                this.changeState({
                    [stateMachine]: {
                        [property]: mapNormalizedProperty(this.state, stateMachine, property, value),
                    },
                });
            },
            changeState(changes) {
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
