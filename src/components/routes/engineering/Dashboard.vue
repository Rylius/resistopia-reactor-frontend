<template>
    <section class="dashboard">
        <div class="block-group alerts-area">
            <div class="block" style="width: 33%;">
                <h2 :class="{critical: criticalAlerts.length}">{{ $t('alerts.title.critical') }}</h2>

                <ul class="alert-list">
                    <li v-for="alert in criticalAlerts">
                        <i class="icon" :class="[alert.type.id]"></i>
                        {{ $t('alert.' + alert.id) }}
                    </li>
                    <li v-if="!criticalAlerts.length">
                        <i class="icon normal"></i>
                        {{ $t('alerts.none') }}
                    </li>
                </ul>
            </div>

            <div class="block" style="width: 33%;">
                <h2 :class="{warning: warningAlerts.length}">{{ $t('alerts.title.warning') }}</h2>

                <ul class="alert-list">
                    <li v-for="alert in warningAlerts">
                        <i class="icon" :class="[alert.type.id]"></i>
                        {{ $t('alert.' + alert.id) }}
                    </li>
                    <li v-if="!warningAlerts.length">
                        <i class="icon normal"></i>
                        {{ $t('alerts.none') }}
                    </li>
                </ul>
            </div>

            <div class="block" style="width: 33%;">
                <h2 :class="{normal: normalAlerts.length}">{{ $t('alerts.title.normal') }}</h2>

                <ul class="alert-list">
                    <li v-for="alert in normalAlerts">
                        <i class="icon" :class="[alert.type.id]"></i>
                        {{ $t('alert.' + alert.id) }}
                    </li>
                    <li v-if="!normalAlerts.length">
                        <i class="icon normal"></i>
                        {{ $t('alerts.none') }}
                    </li>
                </ul>
            </div>
        </div>

        <div class="warning-strip">&nbsp;</div>

        <div class="block-group">
            <div class="block" style="width: 25%;">
                <h2>{{ $t('power.name') }}</h2>

                charge: {{ Math.round((state['power-capacitor'].power.value / state['power-capacitor'].capacity.value) * 100)}}%
                <br>
                charge diff: {{ Math.round(state['power-capacitor'].difference.value) }} kWh
                <br>
                generator: {{ globalState.generatorRunning }}
            </div>

            <div class="block" style="width: 25%;">
                <h2>{{ $t('stateMachine.base.name') }}</h2>

                required: {{ Math.round(state['base'].powerRequired.value) }} kWh
                <br>
                power: {{ Math.round(state['base'].powerSatisfaction.value * 100) }}%
                <br>
                water: {{ Math.round(state['base'].drinkingWaterSatisfaction.value * 100) }}%
            </div>

            <div class="block" style="width: 25%;">
                <h2>{{ $t('reactor.name') }}</h2>

                {{ $t('temperature.c', {temp: Math.round(state.reactor.heat.value)}) }}
            </div>

            <div class="block" style="width: 25%;">
                <h2>{{ $t('water.industrial') }}</h2>

                water: {{ Math.round(state['water-tank'].water.value) }} L
                ({{ Math.round((state['water-tank'].water.value / state['water-tank'].capacity.value) * 100) }}%)
            </div>
        </div>

        <div class="warning-strip">&nbsp;</div>

        <div class="block-group">
            <div class="block" style="width: 33%;">
                <h2 class="critical">{{ $t('base.mode.lockdown') }}</h2>

                active: {{ globalState.lockdown }}
            </div>

            <div class="block" style="width: 33%;">
                <h2 class="warning">{{ $t('base.mode.silentRunning') }}</h2>

                active: {{ globalState.silentRunning }}
            </div>

            <div class="block" style="width: 33%;">
                <h2 class="critical">{{ $t('stateMachine.core.name') }}</h2>

                <span v-if="state.core.energySatisfaction.status.id === 'normal'">active</span>
                <span v-else-if="state.core.energySatisfaction.status.id === 'warning'">active, not enough energy</span>
                <span v-else>offline</span>
                <br>
                capacitor: {{ Math.round((state['energy-capacitor'].energy.value / state['energy-capacitor'].capacity.value) * 100)}}%
            </div>
        </div>
    </section>
</template>

<style lang="less" scoped>
    @import "../../../assets/less/engineering_variables";

    .dashboard {
        h2.critical {
            color: @signal-red-highlight;
        }
        h2.warning {
            color: @signal-orange-highlight;
        }
        h2.normal {
            color: @signal-green-highlight;
        }

        .warning-strip {
            margin-left: -15px;
            margin-top: 2em;
            width: 1024px;
        }

        .alerts-area {
            min-height: 9em;
        }

        .alert-list {
            margin: 0;
            padding: 0 1em 0 0;

            list-style: none;

            li + li {
                margin-top: 0.5em;
            }
        }
    }
</style>

<script>
    import EngineeringMixin from '../../../mixins/engineering';

    import SevenSegmentDisplay from '../../controls/SevenSegmentDisplay';
    import Lamp from '../../controls/Lamp';
    import Slider from '../../controls/Slider';
    import TemperatureDisplay from '../../controls/engineering/TemperatureDisplay';
    import PowerConsumptionDisplay from '../../controls/engineering/PowerConsumptionDisplay';

    import {AlertType} from '../../../alerts';

    export default {
        name: 'dashboard',
        mixins: [EngineeringMixin],
        props: ['alerts'],
        computed: {
            criticalAlerts() {
                return this.alerts.filter(alert => alert.type === AlertType.Critical);
            },
            warningAlerts() {
                return this.alerts.filter(alert => alert.type === AlertType.Warning);
            },
            normalAlerts() {
                return this.alerts.filter(alert => alert.type === AlertType.None);
            },
        },
        components: {
            PowerConsumptionDisplay,
            SevenSegmentDisplay,
            Lamp,
            Slider,
            TemperatureDisplay,
        },
    };
</script>
