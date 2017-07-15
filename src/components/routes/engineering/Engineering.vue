<template>
    <section>
        <nav>
            <div class="block-group">
                <div v-for="route in navigation" :key="route.text"
                     class="block nav-item-wrapper" :style="{width: (100 / navigation.length) + '%'}">
                    <router-link tag="a" :to="route.to" class="nav-item">
                        {{ $t('nav.' + route.text) }}
                    </router-link>

                    <div class="status" :class="alertLevelFor(route.text).id"
                         @mouseover.capture="showAlerts(route.text)" @mouseleave.self="hideAlerts(route.text)"
                         @focus.capture="showAlerts(route.text)" @blur.self="hideAlerts(route.text)">

                        <div v-if="activeAlertsFor(route.text).length">
                            {{ $tc('alerts.count', activeAlertsFor(route.text).length, {count: activeAlertsFor(route.text).length})}}
                        </div>
                        <div v-else>
                            &nbsp;
                        </div>

                        <div class="alerts-wrapper">
                            <div class="alerts" :class="{visible: shownAlertsTab === route.text}">
                                <ul v-if="activeAlertsFor(route.text).length">
                                    <li v-for="alert in activeAlertsFor(route.text)">
                                        <i class="icon" :class="[alert.type.id]"></i>
                                        {{
                                        $t('alerts.message', {
                                            type: $t('alerts.type.' + alert.type.id),
                                            alert: $t('alert.' + alert.id)
                                        })
                                        }}
                                    </li>
                                </ul>
                                <span v-else>
                                    <i class="icon check"></i>
                                    {{ $t('alerts.none') }}
                                </span>
                            </div>
                        </div>
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

        <section class="offline-popup" v-if="!websocketOpen()">
            <div class="popup-content">
                <h1>{{ $t('backend.websocket.closed.title') }}</h1>
                <p>
                    <strong>{{ $t('backend.websocket.closed.message') }}</strong>
                </p>
            </div>
        </section>
    </section>
</template>

<style lang="less">
    @import "../../../assets/less/engineering";

    @status-border-size: 2px;
    @status-padding: 4px;
    @alerts-border-color: @nav-item-background;

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
            border: @status-border-size solid @nav-item-active-background;
            padding: @status-padding;

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

    /* If we didn't use this wrapper and instead used margin-top on .alerts, there'd be a gap between
     .status and .alerts, closing the popup if moving the pointer down into it */
    .alerts-wrapper {
        position: absolute;

        z-index: @alerts-z-index;

        padding-top: @status-padding * 2;
        margin-left: -(@status-padding + @status-border-size);
    }

    .alerts {
        border: @status-border-size solid @alerts-border-color;
        padding: 10px;

        border-radius: 6px;

        box-shadow: 0 0 10px 2px fade(@alerts-border-color, 75%);

        background-color: @display-background;

        font-size: 0.9rem;

        display: none;
        &.visible {
            display: block;
        }

        ul {
            margin: 0;
            padding: 0;

            list-style: none;

            li + li {
                margin-top: 0.5em;
            }
        }
    }

    @popup-hide-distance: 3.25em;
    @popup-hide-speed: 0.25s;

    @keyframes offline-popup-glow {
        0% {
            opacity: 0.5;
        }
        90% {
            opacity: 1;
        }
    }

    .offline-popup {
        /* Stick to viewport bottom */
        position: fixed;
        bottom: 0;

        /* Stretch to full page width */
        left: 0;
        right: 0;

        z-index: 100;

        opacity: 1;
        transition: opacity @popup-hide-speed, bottom @popup-hide-speed;

        .popup-content {
            position: relative;

            pointer-events: auto;

            background-color: @signal-red;
            color: @text-color;

            /* Limit to page width and center */
            width: 1024px;
            margin: 0 auto;

            padding: 0.5em;
        }

        /* We're only animating the opacity of this pseudo element because animating box-shadow is slow */
        .popup-content::before {
            position: absolute;

            top: 0;
            left: 0;

            width: 100%;
            height: 100%;

            z-index: 90;

            content: '';

            box-shadow: 0 0 15px 4px fade(@signal-red-highlight, 75%);
            animation: 0.5s infinite alternate offline-popup-glow;
        }

        &:hover {
            opacity: 0.25;
            bottom: -@popup-hide-distance;
            padding-top: @popup-hide-distance;

            .popup-content {
                pointer-events: none;
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

    import BackendWebsocketMixin from '../../../mixins/backend_websocket';

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
                alerts: createAlerts(),
                shownAlertsTab: null,
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
            showAlerts(tab) {
                this.shownAlertsTab = tab;
            },
            hideAlerts(tab) {
                this.shownAlertsTab = null;
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
