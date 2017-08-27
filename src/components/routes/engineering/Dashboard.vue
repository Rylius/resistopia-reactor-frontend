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

                {{ $t('power.totalProduction') }}:
                {{ $t('power.kilowattHours', {power: Math.round(state['power-distributor'].power.value)}) }}
                <br>
                {{ $t('stateMachine.power-capacitor.name') }}:
                {{ Math.round((state['power-capacitor'].power.value / state['power-capacitor'].capacity.value) * 100)}}%
                <span v-if="state['power-capacitor'].difference.value > 0">
                    <br>
                    {{ $t('stateMachine.power-capacitor.charging', {amount: $t('power.kilowattHours', {power: Math.round(state['power-capacitor'].difference.value)})})}}
                </span>
                <span v-if="globalState.generatorRunning">
                    <br>
                    <br>
                    <strong>{{ $t('base.generator.running') }}</strong>
                </span>
            </div>

            <div class="block" style="width: 25%;">
                <h2>{{ $t('stateMachine.base.name') }}</h2>

                {{ $t('base.currentPowerRequired') }}:
                {{ $t('power.kilowattHours', {power: Math.round(state['base'].totalPowerRequired.value)})}}
                <!--<br>-->
                <!--{{ $t('base.powerSatisfaction') }}:-->
                <!--{{ Math.round(state['base'].powerSatisfaction.value * 100) }}%-->
                <br>
                {{ $t('base.currentDrinkingWaterRequired') }}:
                {{ $t('water.litersPerHour', {amount: Math.round(state['base'].drinkingWaterRequired.value * 3600)}) }}
                <!--<br>-->
                <!--{{ $t('base.drinkingWaterSatisfaction') }}:-->
                <!--{{ Math.round(state['base'].drinkingWaterSatisfaction.value * 100) }}%-->
            </div>

            <div class="block" style="width: 25%;">
                <h2>{{ $t('reactor.name') }}</h2>

                {{ $t('reactor.temperature.average') }}:
                {{ $t('temperature.c', {temp: Math.round(state.reactor.heat.value)}) }}
                <br>
                {{ $t('cooling.name') }}:
                {{ Math.round((state['reactor-cooling'].effectiveCooling.value / 1.25) * 100) }}%
            </div>

            <div class="block" style="width: 25%;">
                <h2>{{ $t('water.industrial') }}</h2>

                {{ $t('stateMachine.water-tank.name') }}:
                {{ $t('water.cubicMeters', {amount: Math.round(state['water-tank'].water.value / 100) / 10}) }}
                ({{ Math.round((state['water-tank'].water.value / state['water-tank'].capacity.value) * 100) }}%)
                <br>
                <span v-for="pump in ['pump-a', 'pump-b', 'pump-c']">
                    {{ $t('stateMachine.' + pump + '.name') }}:
                    <span v-if="state[pump].enabled.value >0 && state[pump].powerSatisfaction.value > 0">
                        {{ $t('water.pump.active') }}
                    </span>
                    <span v-else>
                        {{ $t('water.pump.inactive') }}
                    </span>
                    <br>
                </span>
            </div>
        </div>

        <div class="block-group" style="min-height: 16em;">
            <div class="block" style="width: 25%;">
                <lazy>
                    <battery-chart :data="statistics.batteries.lastHour"></battery-chart>
                </lazy>
            </div>

            <div class="block" style="width: 25%;">
                <lazy>
                    <power-chart :production="statistics.power.lastHour"
                                 :required="statistics.totalPowerRequired.lastHour"></power-chart>
                </lazy>
            </div>

            <div class="block" style="width: 25%;">
                <lazy>
                    <reactor-temperature-chart :data="statistics.reactorTemperature.lastHour">
                    </reactor-temperature-chart>
                </lazy>
            </div>

            <div class="block" style="width: 25%;">
                <lazy>
                    <water-tank-chart :data="statistics.waterTank.lastHour"></water-tank-chart>
                </lazy>
            </div>
        </div>

        <div class="warning-strip">&nbsp;</div>

        <div class="block-group">
            <div class="block" style="width: 33%;">
                <h2 class="critical">{{ $t('base.mode.lockdown') }}</h2>

                <div v-if="globalState.lockdown">
                    <p>
                        {{ $t('lockdown.enabled') }}
                    </p>
                    <p v-if="globalState.camouflage">
                        {{ $t('lockdown.camouflageActive') }}
                    </p>
                    <button :disabled="!globalState.silentRunning && !globalState.camouflage" @click="disableLockdown">
                        {{ $t('lockdown.disable') }}
                    </button>
                </div>
                <div v-else>
                    <p>
                        {{ $t('lockdown.disabled') }}
                    </p>
                    <p v-if="globalState.silentRunning">
                        {{ $t('lockdown.silentRunningActive') }}
                    </p>
                    <button @click="enableLockdown">
                        {{ $t('lockdown.enable') }}
                    </button>
                </div>
            </div>

            <div class="block" style="width: 33%;">
                <h2 class="warning">{{ $t('base.mode.silentRunning') }}</h2>

                <div v-if="globalState.silentRunning">
                    <p>
                        {{ $t('silentRunning.enabled') }}
                    </p>
                    <p v-if="globalState.camouflage">
                        {{ $t('silentRunning.camouflageActive') }}
                    </p>
                    <button :disabled="!globalState.lockdown && !globalState.camouflage" @click="disableSilentRunning">
                        {{ $t('silentRunning.disable') }}
                    </button>
                </div>
                <div v-else>
                    <p>
                        {{ $t('silentRunning.disabled') }}
                    </p>
                    <p v-if="globalState.lockdown">
                        {{ $t('silentRunning.lockdownActive') }}
                    </p>
                    <button @click="enableSilentRunning">
                        {{ $t('silentRunning.enable') }}
                    </button>
                </div>
            </div>

            <div class="block" style="width: 33%;">
                <h2 class="critical">{{ $t('stateMachine.core.name') }}</h2>

                <div v-if="globalState.camouflage">
                    <p>
                        {{ $t('camouflage.enabled') }}
                    </p>
                    <p v-if="!globalState.lockdown && !globalState.silentRunning">
                        {{ $t('camouflage.reducedSignatureRequired') }}
                    </p>
                    <button :disabled="!globalState.lockdown && !globalState.silentRunning"
                            @click="disableCamouflage">
                        {{ $t('camouflage.disable') }}
                    </button>
                </div>
                <div v-else>
                    <p>
                        {{ $t('camouflage.disabled') }}
                    </p>
                    <button @click="enableCamouflage">
                        {{ $t('camouflage.enable') }}
                    </button>
                </div>

                <p v-if="false">
                    <span v-if="state.core.energySatisfaction.status.id === 'normal'">active</span>
                    <span
                        v-else-if="state.core.energySatisfaction.status.id === 'warning'">active, not enough energy</span>
                    <span v-else>offline</span>
                    <br>
                    capacitor: {{ Math.round((state['energy-capacitor'].energy.value / state['energy-capacitor'].capacity.value) * 100)}}%
                </p>
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

    import Lazy from '../../Lazy.vue';

    import SevenSegmentDisplay from '../../controls/SevenSegmentDisplay';
    import Lamp from '../../controls/Lamp';
    import Slider from '../../controls/Slider';
    import TemperatureDisplay from '../../controls/engineering/TemperatureDisplay';
    import PowerConsumptionDisplay from '../../controls/engineering/PowerConsumptionDisplay';
    import BatteryChart from './components/BatteryChart.vue';
    import PowerChart from './components/PowerChart.vue';
    import ReactorTemperatureChart from './components/ReactorTemperatureChart.vue';
    import WaterTankChart from './components/WaterTankChart.vue';

    import {AlertType} from '../../../alerts';

    export default {
        name: 'dashboard',
        mixins: [EngineeringMixin],
        props: ['statistics', 'alerts'],
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
        methods: {
            enableLockdown() {
                this.$emit('changeGlobal', {lockdown: 1, silentRunning: 0});
            },
            disableLockdown() {
                this.$emit('changeGlobal', {lockdown: 0});
            },
            enableSilentRunning() {
                this.$emit('changeGlobal', {silentRunning: 1, lockdown: 0});
            },
            disableSilentRunning() {
                this.$emit('changeGlobal', {silentRunning: 0});
            },
            enableCamouflage() {
                this.$emit('changeGlobal', {camouflage: 1});
            },
            disableCamouflage() {
                this.$emit('changeGlobal', {camouflage: 0});
            },
        },
        components: {
            Lazy,
            PowerConsumptionDisplay,
            SevenSegmentDisplay,
            Lamp,
            Slider,
            TemperatureDisplay,
            BatteryChart,
            PowerChart,
            ReactorTemperatureChart,
            WaterTankChart,
        },
    };
</script>
