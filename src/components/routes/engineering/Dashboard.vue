<template>
    <section class="dashboard">
        <div class="block-group alerts-area">
            <div class="block" style="width: 33%;" v-if="criticalAlerts.length">
                <h2 class="critical">{{ $t('alerts.title.critical') }}</h2>

                <ul class="alert-list">
                    <li v-for="alert in criticalAlerts">
                        <i class="icon" :class="[alert.type.id]"></i>
                        {{ $t('alert.' + alert.id) }}
                    </li>
                </ul>
            </div>

            <div class="block" style="width: 33%;" v-if="warningAlerts.length">
                <h2 class="warning">{{ $t('alerts.title.warning') }}</h2>

                <ul class="alert-list">
                    <li v-for="alert in warningAlerts">
                        <i class="icon" :class="[alert.type.id]"></i>
                        {{ $t('alert.' + alert.id) }}
                    </li>
                </ul>
            </div>

            <div class="block" style="width: 33%;" v-if="normalAlerts.length">
                <h2 class="normal">{{ $t('alerts.title.normal') }}</h2>

                <ul class="alert-list">
                    <li v-for="alert in normalAlerts">
                        <i class="icon" :class="[alert.type.id]"></i>
                        {{ $t('alert.' + alert.id) }}
                    </li>
                </ul>
            </div>
        </div>

        <div class="block-group">
            <div class="block" style="width: 25%;">
                <h2>{{ $t('power.name') }}</h2>

                charge diff: {{ Math.round(state['power-capacitor'].difference.value) }}
                <br>
                generator: {{ globalState.generatorRunning }}
            </div>

            <div class="block" style="width: 25%;">
                <h2>{{ $t('stateMachine.base.name') }}</h2>
            </div>

            <div class="block" style="width: 25%;">
                <h2>{{ $t('reactor.name') }}</h2>

                <span v-if="state.reactor.shutdownRemaining.value">{{ $t('reactor.state.offline') }}</span>
                <span v-else>{{ $t('reactor.state.online') }}
                ({{ $t('temperature.c', {temp: Math.round(state.reactor.heat.value)}) }})</span>
            </div>

            <div class="block" style="width: 25%;">
            </div>
        </div>

        <div class="block-group">
            <div class="block" style="width: 25%;">
            </div>

            <div class="block" style="width: 25%;">
            </div>

            <div class="block" style="width: 25%;">
                <h2>{{ $t('water.drinking') }}</h2>
            </div>

            <div class="block" style="width: 25%;">
                <h2>{{ $t('water.industrial') }}</h2>
            </div>
        </div>

        <p>
            ai core:
            <span v-if="state.core.energySatisfaction.status.id === 'normal'">active</span>
            <span v-else-if="state.core.energySatisfaction.status.id === 'warning'">active, not enough energy</span>
            <span v-else>offline</span>
            <br>
            capacitor: {{ Math.round((state['energy-capacitor'].energy.value / state['energy-capacitor'].capacity.value) * 100)}}%
        </p>
    </section>
</template>

<style lang="less" scoped>
    @import "../../../assets/less/engineering_variables";

    .dashboard {
        .alerts-area {
            min-height: 10em;

            h2.critical {
                color: @signal-red-highlight;
            }
            h2.warning {
                color: @signal-orange-highlight;
            }
            h2.normal {
                color: @signal-green-highlight;
            }
        }

        .alert-list {
            margin: 0;
            padding: 0;

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
