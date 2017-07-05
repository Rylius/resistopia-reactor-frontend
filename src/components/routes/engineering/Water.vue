<template>
    <section>
        <div class="graph-container">
            <svg class="water-graph" markup-inline src="../../../assets/svg/engineering/water.svg"></svg>

            <div class="graph-overlay" data-target="reactor-cooling-text">
                <h3>{{ $t('stateMachine.reactor-cooling.name') }}</h3>
                {{ $t('water.litersPerSecond', {amount: Math.round(state['reactor-cooling'].waterRequired.value * 10) / 10})}}
                ({{ $t('water.litersPerHour', {amount: Math.round(state['reactor-cooling'].waterRequired.value * 3600)})}})
            </div>

            <div class="graph-overlay" data-target="water-tank-text">
                <h3>{{ $t('stateMachine.water-tank.name') }} <span class="small">{{ $t('water.industrial') }}</span>
                </h3>
                <div class="block-group">
                    <div class="block" style="width: 80%;">
                        {{ Math.round(state['water-tank'].water.value / 100) / 10 }} m³
                        /
                        {{ Math.round(state['water-tank'].capacity.value / 100) / 10 }} m³
                        <br>
                        {{ $t('water.litersPerHour', {amount: Math.round((totalWaterProduction - totalWaterConsumption) * 3600)})}}
                    </div>

                    <div class="block" style="width: 20%;">
                    </div>
                </div>
            </div>

            <div class="graph-overlay" v-for="pump in pumps" :data-target="pump + '-text'">
                <h3>{{ $t('stateMachine.' + pump + '.name') }}</h3>
                <button v-if="!state[pump].enabled.value" @click="() => changeProperty(pump, 'enabled', 1)">
                    enable
                </button>
                <button v-else @click="() => changeProperty(pump, 'enabled', 0)">disable</button>
                <br>
                filter: {{ Math.round((state[pump].filterHealth.value / state[pump].filterMaxHealth.value) * 100) }}%
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

        h1, h2, h3, h4, h5, h6 {
            margin: 0 0 0.5em;

            .small {
                font-size: 0.75em;
                color: @text-unused-color;
            }
        }
    }
</style>

<script>
    import EngineeringMixin from '../../../mixins/engineering';

    import SevenSegmentDisplay from '../../controls/SevenSegmentDisplay';

    export default {
        name: 'water',
        mixins: [EngineeringMixin],
        data() {
            return {
                pumps: ['pump-a', 'pump-b', 'pump-c'],
            };
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
            SevenSegmentDisplay
        },
    };
</script>
