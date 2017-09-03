<template>
    <section>
        <div class="graph-container">
            <svg class="water-graph" markup-inline src="../../../assets/svg/engineering/water.svg"></svg>

            <div class="graph-overlay" data-target="reactor-cooling-text">
                <h3>
                    {{ $t('stateMachine.reactor-cooling.name') }}
                    <span class="status-indicator"
                          :class="[state['reactor-cooling'].cooling.value > 0 ? 'active' : 'disabled']"></span>
                </h3>
                {{ $t('water.litersPerHour', {amount: Math.round(state['reactor-cooling'].waterRequired.value * 3600)})}}
            </div>

            <div class="graph-overlay wide" data-target="water-treatment-text">
                <h3>
                    {{ $t('stateMachine.water-treatment.name') }}
                    <span class="status-indicator"
                          :class="[(state['water-treatment'].requiredPower.value > 0 && state['water-treatment'].powerSatisfaction.value > 0) ? 'active' : 'disabled']"></span>
                </h3>
                <div class="block-group">
                    <div class="block" style="width: 80%;">
                        <p>
                            {{ $t('power.kilowattHours', {power: Math.round((state['water-treatment'].requiredPower.value * state['water-treatment'].powerSatisfaction.value) * 10) / 10})}}
                            /
                            {{ $t('power.kilowattHours', {power: Math.round(state['water-treatment'].requiredPower.value * 10) / 10})}}
                            <br>
                            {{ $t('water.litersPerHour', {amount: Math.round(state['water-treatment'].requiredWater.value * 3600)})}}
                            <br>
                            {{ $t('water.drinking') }}: {{ Math.round(state['water-treatment'].drinkingWater.value) }} L
                        </p>
                        <p>
                            {{ $t('water.treatment.cleaner') }}:
                            {{ $t('water.treatment.resource.' + state['water-treatment'].resourceCleaner.status.id) }}
                            <br>
                            {{ $t('water.treatment.chlorine') }}:
                            {{ $t('water.treatment.resource.' + state['water-treatment'].resourceChlorine.status.id) }}
                            <br>
                            {{ $t('water.treatment.minerals') }}:
                            {{ $t('water.treatment.resource.' + state['water-treatment'].resourceMinerals.status.id) }}
                        </p>
                    </div>

                    <div class="block" style="width: 20%;">
                        <gauge type="linear" :options="waterTankGaugeOptions"
                               :value="state['water-treatment'].drinkingWater.value / 1000"></gauge>
                    </div>
                </div>
            </div>

            <div class="graph-overlay" data-target="base-text">
                <h3>{{ $t('stateMachine.base.name') }}</h3>
                {{ $t('power.name') }}:
                {{ Math.round(state['base'].powerSatisfaction.value * 100) }}%
                ({{ $t('power.kilowattHours', {power: Math.round(state['base'].powerRequired.value * state['base'].powerSatisfaction.value)})}})
                <br>
                {{ $t('water.drinking') }}:
                {{ Math.round(state['base'].drinkingWaterSatisfaction.value * 100) }}%
                ({{ $t('water.litersPerHour', {amount: Math.round((state['base'].drinkingWaterRequired.value * state['base'].drinkingWaterSatisfaction.value) * 3600)})}})
            </div>

            <div class="graph-overlay wide" data-target="water-tank-text">
                <h3>{{ $t('stateMachine.water-tank.name') }} <span class="small">{{ $t('water.industrial') }}</span>
                </h3>
                <div class="block-group">
                    <div class="block" style="width: 80%;">
                        <p>
                            {{ $t('water.cubicMeters', {amount: Math.round(state['water-tank'].water.value / 100) / 10})}}
                            /
                            {{ $t('water.cubicMeters', {amount: Math.round(state['water-tank'].capacity.value / 100) / 10})}}
                        </p>
                        <p>
                            {{ $t('water.tank.input', {amount: Math.round(totalWaterProduction * 3600)}) }}
                            <br>
                            {{ $t('water.tank.output', {amount: Math.round(totalWaterConsumption * 3600)}) }}
                        </p>
                        <p>
                            {{ $t('water.tank.difference', {amount: ((totalWaterProduction - totalWaterConsumption) > 0 ? '+' : '') + Math.round((totalWaterProduction - totalWaterConsumption) * 3600)})}}
                        </p>
                    </div>

                    <div class="block" style="width: 20%;">
                        <gauge type="linear" :options="waterTankGaugeOptions"
                               :value="state['water-tank'].water.value / state['water-tank'].capacity.value"></gauge>
                    </div>
                </div>
            </div>

            <div class="graph-overlay" v-for="pump in pumps" :data-target="pump + '-text'">
                <h3>
                    {{ $t('stateMachine.' + pump + '.name') }}
                    <span class="status-indicator"
                          :class="[state[pump].water.value > 0 ? 'active' : 'disabled']"></span>
                </h3>
                <p>
                    <button v-if="!state[pump].enabled.value" @click="() => changeProperty(pump, 'enabled', 1)">
                        {{ $t('water.pump.enable') }}
                    </button>
                    <button v-else @click="() => changeProperty(pump, 'enabled', 0)">
                        {{ $t('water.pump.disable') }}
                    </button>
                </p>
                <p>
                    {{ $t('water.pump.production', {amount: Math.round(state[pump].water.value * 3600)}) }}
                    <br>
                    {{ $t('water.pump.filterHealth', {health: Math.round((state[pump].filterHealth.value / state[pump].filterMaxHealth.value) * 100)})}}
                </p>
                <p v-if="!state[pump].enabled.value">
                    <button :disabled="state[pump].filterHealth.value > state[pump].filterMaxHealth.value * 0.8"
                            @click="swapPumpFilter(pump)">
                        {{ $t('water.pump.swapFilter') }}
                    </button>
                </p>
            </div>
        </div>
    </section>
</template>

<style lang="less" scoped>
    @import "../../../assets/less/engineering_variables";

    .graph-container {
        position: relative;

        width: 944px;
        height: 768px;
    }

    @keyframes connection-flow {
        to {
            stroke-dashoffset: -30;
        }
    }

    @keyframes connection-flow-reverse {
        to {
            stroke-dashoffset: 30;
        }
    }

    .water-graph {
        position: absolute;

        text {
            fill: @text-color;
        }

        .pump-connection, .tank-connection {
            stroke: @signal-blue-disabled;
            transition: stroke 0.5s;

            &.active {
                stroke: @signal-blue;
            }
        }

        .connection-flow {
            /* Animate dashes */
            stroke-dasharray: 15;
            animation: connection-flow 1s linear;
            animation-iteration-count: infinite;
            &.reverse {
                animation: connection-flow-reverse 1s linear;
                animation-iteration-count: infinite;
            }

            stroke: @signal-blue-disabled;
            transition: stroke 0.5s;

            &.visible {
                stroke: @signal-blue-highlight;
                transition: stroke 1s;
            }
        }
    }

    .graph-overlay {
        padding: 8px 10px;

        position: absolute;

        width: 200px;
        overflow: hidden;

        background-color: @label-background;

        &.wide {
            width: 250px;
        }

        p {
            margin: 0;
        }
        p + p {
            margin-top: 0.75em;
        }

        h1, h2, h3, h4, h5, h6 {
            margin: 0 0 0.5em;

            .small {
                font-size: 0.75em;
                color: @text-unused-color;
            }
        }
    }

    .status-indicator {
        display: inline-block;
        float: right;

        margin-top: 0.15em;

        width: 1.5em;
        height: 0.75em;

        border-radius: 0.25em;

        background-color: @label-background;
        transition: 0.5s background-color;

        &.active {
            background-color: @signal-green;
        }
        &.disabled {
            background-color: @signal-red;
        }
    }
</style>

<script>
    import EngineeringMixin from '../../../mixins/engineering';

    import SevenSegmentDisplay from '../../controls/SevenSegmentDisplay';
    import Gauge from '../../controls/Gauge';

    export default {
        name: 'water',
        mixins: [EngineeringMixin],
        data() {
            return {
                pumps: ['pump-a', 'pump-b', 'pump-c'],
                waterTankGaugeOptions: {
                    minValue: 0,
                    maxValue: 1,
                    majorTicks: [0, 0.25, 0.5, 0.75, 1],
                    minorTicks: 1,
                    strokeTicks: true,
                    numbersMargin: 0,
                    barWidth: 50,
                    height: 100,
                    animation: false,
                    units: false,
                    title: false,
                    animationRule: 'linear',
                    colorPlate: 'transparent',
                    colorMajorTicks: '#ebebeb', // @text-color
                    colorNeedle: '#ff4629', // @signal-red-highlight
                    colorNeedleEnd: false,
                    colorBar: '#6f6f6f', // @signal-blue-disabled
                    colorBarProgress: '#8ea7ff', // @signal-blue-highlight
                    colorNumbers: 'transparent',
                    needle: false,
                    borders: false,
                    valueBox: false,
                    tickSide: 'left',
                    ticksWidth: 15,
                    ticksPadding: 15,
                    numberSide: 'left',
                    barBeginCircle: false,
                    barLength: 100,
                },
            };
        },
        methods: {
            swapPumpFilter(pump) {
                if (!!this.state[pump].enabled.value) {
                    return;
                }

                // TODO Use a proper confirm dialog
                if (confirm(this.$t('water.pump.swapFilterConfirm'))) {
                    this.changeProperty(pump, 'filterHealth', state[pump].filterMaxHealth.value);
                }
            },
        },
        mounted() {
            document.querySelectorAll('.graph-container .graph-overlay').forEach(element => {
                const targetId = element.getAttribute('data-target');
                if (!targetId) {
                    throw new Error('No target set on element');
                }
                const target = document.getElementById(targetId);
                if (!target) {
                    throw new Error(`Target element ${targetId} does not exist`);
                }

                const box = target.getBBox();

                element.style.left = box.x + 'px';
                element.style.top = box.y + 'px';

                target.textContent = '';
            });
        },
        computed: {
            totalWaterConsumption() {
                return this.state['reactor-cooling'].waterRequired.value + this.state['water-treatment'].requiredWater.value;
            },
            totalWaterProduction() {
                return this.pumps.map(pump => this.state[pump].water.value).reduce((total, value) => total + value, 0);
            },
        },
        components: {
            SevenSegmentDisplay,
            Gauge,
        },
    };
</script>
