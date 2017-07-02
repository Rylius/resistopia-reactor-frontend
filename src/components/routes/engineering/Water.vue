<template>
    <section>
        <div class="graph-container">
            <svg class="water-graph" markup-inline src="../../../assets/svg/engineering/water.svg"></svg>

            <div class="graph-overlay" v-for="pump in pumps" :data-target="pump + '-text'">
                {{ $t('stateMachine.' + pump + '.name') }}
                <br>
                <button v-if="!state[pump].enabled.value" @click="() => changeProperty(pump, 'enabled', 1)">
                    enable
                </button>
                <button v-else @click="() => changeProperty(pump, 'enabled', 0)">disable</button>
                <br>
                filter: {{ Math.round((state[pump].filterHealth.value / state[pump].filterMaxHealth.value) * 100) }}%
            </div>

            <div class="graph-overlay" data-target="water-tank">
                {{ Math.round(state['water-tank'].water.value / 100) / 10 }}m³
                /
                {{ Math.round(state['water-tank'].capacity.value / 100) / 10 }}m³
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

    .water-graph {
        position: absolute;

        text {
            fill: @text-color;
        }

        .pump-connection {
            transition: 0.5s stroke;

            stroke: @signal-blue-disabled;
            &.active {
                stroke: @signal-blue;
            }
        }
    }

    .graph-overlay {
        padding: 8px 10px;

        position: absolute;

        background-color: @label-background;
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
            });
        },
        components: {
            SevenSegmentDisplay
        },
    };
</script>
