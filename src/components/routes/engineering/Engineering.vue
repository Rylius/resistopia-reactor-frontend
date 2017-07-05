<template>
    <section>
        <nav>
            <div class="block-group">
                <div v-for="route in navigation" :key="route.text"
                     class="block nav-item-wrapper" :style="{width: (100 / navigation.length) + '%'}">
                    <router-link tag="a" :to="route.to" class="nav-item">
                        {{ $t('nav.' + route.text) }}
                    </router-link>

                    <div class="status" :class="alertLevelFor(route.text).id">
                        <!-- TODO -->
                        {{ activeAlertsFor(route.text).length }}
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

<style lang="less">
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
    import createAlerts, {AlertTab, AlertType} from '../../../alerts';

    import {normalizedToRange} from '../../../util/math';

    function mapNormalizedProperty(state, stateMachine, property, value) {
        const config = state.stateMachines[stateMachine][property];
        return normalizedToRange(value, config.min, config.max);
    }

    function alertLevel(a, b) {
        if (a.order === b.order) {
            return 0;
        }
        return a.order > b.order ? -1 : 1;
    }

    function tabAlertLevel(alerts, state) {
        const activeAlerts = alerts.sort(alertLevel);
        return activeAlerts.length > 0 ? activeAlerts[0].type : AlertType.None;
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
                alerts: createAlerts(),
                navigation: [
                    {
                        to: {name: 'engineering/dashboard'},
                        text: 'dashboard',
                    },
                    {
                        to: {name: 'engineering/reactor'},
                        text: AlertTab.Reactor,
                    },
                    {
                        to: {name: 'engineering/power'},
                        text: AlertTab.Power,
                    },
                    {
                        to: {name: 'engineering/water'},
                        text: AlertTab.Water,
                    },
                    {
                        to: {name: 'engineering/storage'},
                        text: AlertTab.Storage,
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
            activeAlertsFor(tab) {
                switch (tab) {
                    case 'dashboard':
                        return [...this.reactorAlerts, ...this.powerAlerts, ...this.waterAlerts, ...this.storageAlerts];
                    case AlertTab.Reactor:
                        return this.reactorAlerts;
                    case AlertTab.Power:
                        return this.powerAlerts;
                    case AlertTab.Water:
                        return this.waterAlerts;
                    case AlertTab.Storage:
                        return this.storageAlerts;
                    default:
                        return [];
                }
            },
            alertLevelFor(tab) {
                switch (tab) {
                    case 'dashboard':
                        return this.highestAlertLevel;
                    case AlertTab.Reactor:
                        return this.reactorAlertLevel;
                    case AlertTab.Power:
                        return this.powerAlertLevel;
                    case AlertTab.Water:
                        return this.waterAlertLevel;
                    case AlertTab.Storage:
                        return this.storageAlertLevel;
                    default:
                        return null;
                }
            },
        },
        computed: {
            state() {
                return createFrontendState(this.simulation.state);
            },
            highestAlertLevel() {
                return [this.reactorAlertLevel, this.powerAlertLevel, this.waterAlertLevel, this.storageAlertLevel, AlertType.None].sort(alertLevel)[0];
            },
            activeAlerts() {
                return this.alerts.filter(alert => alert.active(this.state.stateMachines));
            },
            reactorAlerts() {
                return this.activeAlerts.filter(alert => alert.tab === AlertTab.Reactor);
            },
            reactorAlertLevel() {
                return tabAlertLevel(this.reactorAlerts, this.state);
            },
            powerAlerts() {
                return this.activeAlerts.filter(alert => alert.tab === AlertTab.Power);
            },
            powerAlertLevel() {
                return tabAlertLevel(this.powerAlerts, this.state);
            },
            waterAlerts() {
                return this.activeAlerts.filter(alert => alert.tab === AlertTab.Water);
            },
            waterAlertLevel() {
                return tabAlertLevel(this.waterAlerts, this.state);
            },
            storageAlerts() {
                return this.activeAlerts.filter(alert => alert.tab === AlertTab.Storage);
            },
            storageAlertLevel() {
                return tabAlertLevel(this.storageAlerts, this.state);
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
