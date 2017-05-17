<template>
    <section>
        <div class="block-group">
            <div class="block" style="width: 40%;">
                <div class="block-group">
                    <div class="block" style="width: 30%;">
                        reactor
                        <span v-if="state.reactor.shutdownRemaining">(offline)</span>
                    </div>
                    <div class="block" style="width: 35%;">
                        <seven-segment-display :value="Math.round(values['reactor'].heat.data)"
                                               :color="values['reactor'].heat.color"
                                               :digits="4" :decimals="0"></seven-segment-display>
                    </div>
                    <div class="block" style="width: 15%;">
                        <seven-segment-display value="°C"
                                               :color="values['reactor'].heat.color"
                                               :digits="2" :decimals="0"></seven-segment-display>
                    </div>
                    <div class="block" style="width: 20%;">
                        <lamp :enabled="values['reactor'].heat.type === 'critical'"
                              color="red" :flash="true"></lamp>
                    </div>
                </div>

                <div class="block-group">
                    <div class="block" style="width: 30%;">
                        distributor
                        <span v-if="state.distributor.shutdownRemaining">(offline)</span>
                    </div>
                    <div class="block" style="width: 35%;">
                        <seven-segment-display :value="Math.round(values['distributor'].heat.data)"
                                               :color="values['distributor'].heat.color"
                                               :digits="4" :decimals="0"></seven-segment-display>
                    </div>
                    <div class="block" style="width: 15%;">
                        <seven-segment-display value="°C"
                                               :color="values['distributor'].heat.color"
                                               :digits="2" :decimals="0"></seven-segment-display>
                    </div>
                    <div class="block" style="width: 20%;">
                        <lamp :enabled="values['distributor'].heat.type === 'critical'"
                              color="red" :flash="true"></lamp>
                    </div>
                </div>
            </div>

            <div class="block" style="width: 20%;">
                <div class="block-group">
                    <div class="block" style="width: 30%;">
                        cooling
                    </div>
                    <div class="block" style="width: 60%;">
                        <seven-segment-display
                            :value="values['reactor-cooling'].powerConsumed.data"
                            :color="values['reactor-cooling'].powerSatisfaction.color"
                            :digits="4" :decimals="1"></seven-segment-display>
                    </div>
                    <div class="block" style="width: 10%;">
                        kWh
                    </div>
                </div>

                <div class="block-group">
                    <div class="block" style="width: 30%;">
                        core
                    </div>
                    <div class="block" style="width: 60%;">
                        <seven-segment-display
                            :value="values['core'].powerRequired.data * values['core'].powerSatisfaction.data"
                            :color="values['core'].powerSatisfaction.color"
                            :digits="4" :decimals="1"></seven-segment-display>
                    </div>
                    <div class="block" style="width: 10%;">
                        kWh
                    </div>
                </div>

                <div class="block-group">
                    <div class="block" style="width: 30%;">
                        base
                    </div>
                    <div class="block" style="width: 60%;">
                        <seven-segment-display
                            :value="values['base'].powerRequired.data * values['base'].powerSatisfaction.data"
                            :color="values['base'].powerSatisfaction.color"
                            :digits="4" :decimals="1"></seven-segment-display>
                    </div>
                    <div class="block" style="width: 10%;">
                        kWh
                    </div>
                </div>
            </div>

            <div class="block" style="width: 25%;">
            </div>

            <div class="block" style="width: 25%;">
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

    import {normalizedToRange, rangeToNormalized} from '../../../util/math';

    import limits from '../../../limits';

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
            SevenSegmentDisplay,
            Lamp,
            Slider,
        },
    };
</script>
