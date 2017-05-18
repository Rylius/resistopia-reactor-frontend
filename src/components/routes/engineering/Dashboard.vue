<template>
    <section>
        <div class="block-group">
            <div class="block" style="width: 40%;">
                <temperature-display :values="values" stateMachine="reactor" property="heat" label="reactor"
                                     style="width: 100%">
                    <span slot="status" v-if="state.reactor.shutdownRemaining">(offline)</span>
                </temperature-display>

                <temperature-display :values="values" stateMachine="distributor" property="heat" label="distributor"
                                     style="width: 100%">
                    <span slot="status" v-if="state.distributor.shutdownRemaining">(offline)</span>
                </temperature-display>
            </div>

            <div class="block" style="width: 20%;">
                <power-consumption-display :values="values" stateMachine="reactor-cooling"
                                           consumptionProperty="powerConsumed" satisfactionProperty="powerSatisfaction"
                                           label="cooling" style="width: 100%">
                </power-consumption-display>

                <power-consumption-display :values="values" stateMachine="core"
                                           consumptionProperty="powerConsumed" satisfactionProperty="powerSatisfaction"
                                           label="core" style="width: 100%">
                </power-consumption-display>

                <power-consumption-display :values="values" stateMachine="base"
                                           consumptionProperty="powerConsumed" satisfactionProperty="powerSatisfaction"
                                           label="base" style="width: 100%">
                </power-consumption-display>
            </div>
        </div>

        <div class="block-group">
            <div class="block block-group" style="width: 25%;">
                <div class="block">
                    matter: {{ Math.round(state['storage-matter'].releasedMatterPerTick) }}
                    <slider :vertical="false"
                            :value="normalizedProperty('storage-matter', 'releasedMatterPerTick')"
                            @update="value => changeState('storage-matter', 'releasedMatterPerTick', value)"></slider>
                </div>
                <div class="block">
                    antimatter: {{ Math.round(state['storage-antimatter'].releasedAntimatterPerTick) }}
                    <slider :vertical="false"
                            :value="normalizedProperty('storage-antimatter', 'releasedAntimatterPerTick')"
                            @update="value => changeState('storage-antimatter', 'releasedAntimatterPerTick', value)"></slider>
                </div>
            </div>

            <div class="block block-group" style="width: 25%;">
                <div class="block">
                    cooling: {{ Math.round(state['reactor-cooling'].effectiveCooling)
                    }}/{{ Math.round(state['reactor-cooling'].cooling) }}
                    <slider :vertical="false"
                            :value="normalizedProperty('reactor-cooling', 'cooling')"
                            @update="value => changeState('reactor-cooling', 'cooling', value)"></slider>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import SevenSegmentDisplay from '../../controls/SevenSegmentDisplay';
    import Lamp from '../../controls/Lamp';
    import Slider from '../../controls/Slider';

    import TemperatureDisplay from '../../controls/engineering/TemperatureDisplay';

    import {normalizedToRange, rangeToNormalized} from '../../../util/math';

    import limits from '../../../limits';
    import PowerConsumptionDisplay from "../../controls/engineering/PowerConsumptionDisplay";

    export default {
        name: 'dashboard',
        props: {
            state: {
                required: true,
            },
        },
        data() {
            return {
                limits,
            };
        },
        computed: {
            values() {
                const values = {};

                Object.keys(this.state).forEach(stateMachineId => {
                    const stateMachine = this.state[stateMachineId];
                    values[stateMachineId] = {};
                    Object.keys(stateMachine).forEach(property => {
                        const value = stateMachine[property];
                        const range = this.rangeForValue(stateMachineId, property, value);
                        values[stateMachineId][property] = {
                            data: value,
                            type: range.id,
                            color: range.color,
                        };
                    });
                });

                return values;
            },
        },
        methods: {
            rangeForValue(stateMachine, property, value) {
                if (!limits.ranges[stateMachine] || !limits.ranges[stateMachine][property]) {
                    return {id: 'default', color: 'default'};
                }

                const range = limits.ranges[stateMachine][property].find(range => {
                    return value >= range.from && value <= range.to;
                });

                if (!range) {
                    return {id: 'default', color: 'default'};
                }

                return range;
            },
            rangeToNormalized,
            normalizedToRange,
            mapNormalized(value, limit) {
                return this.rangeToNormalized(value, limit.min, limit.max);
            },
            mapRange(value, limit) {
                return this.normalizedToRange(value, limit.min, limit.max);
            },
            normalizedProperty(stateMachine, property) {
                return this.mapNormalized(this.state[stateMachine][property], limits.input[stateMachine][property]);
            },
            changeState(stateMachine, property, value) {
                const changes = {
                    [stateMachine]: {
                        [property]: this.mapRange(value, limits.input[stateMachine][property]),
                    },
                };
                this.$emit('changeState', changes);
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
