<template>
    <section>
        <div class="block-group">
            <div class="block" style="width: 30%;">
                <div class="block-group">
                    <div class="block" style="width: 30%;">
                        reactor
                        <span v-if="state.reactor.shutdownRemaining">offline</span>
                    </div>
                    <div class="block" style="width: 50%;">
                        <seven-segment-display :value="Math.round(values['reactor'].heat.data) + '°C'"
                                               :color="values['reactor'].heat.color"
                                               :digits="6" :decimals="0"></seven-segment-display>
                    </div>
                    <div class="block" style="width: 20%;">
                        <lamp :enabled="values['reactor'].heat.type === 'critical'"
                              color="red" :flash="true"></lamp>
                    </div>
                </div>

                <div class="block-group">
                    <div class="block" style="width: 30%;">
                        distributor
                        <span v-if="state.distributor.shutdownRemaining">offline</span>
                    </div>
                    <div class="block" style="width: 50%;">
                        <seven-segment-display :value="Math.round(values['distributor'].heat.data) + '°C'"
                                               :color="values['distributor'].heat.color"
                                               :digits="6" :decimals="0"></seven-segment-display>
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
                    matter: {{ state['storage-matter'].releasedMatterPerTick }}
                    <slider :vertical="false"
                            :value="state['storage-matter'].releasedMatterPerTick"
                            @update="value => state['storage-matter'].releasedMatterPerTick = value"></slider>
                </div>
                <div class="block">
                    antimatter: {{ state['storage-antimatter'].releasedAntimatterPerTick }}
                    <slider :vertical="false"
                            :value="state['storage-antimatter'].releasedAntimatterPerTick"
                            @update="value => state['storage-antimatter'].releasedAntimatterPerTick = value"></slider>
                </div>
            </div>

            <div class="block block-group" style="width: 25%;">
                <div class="block">
                    cooling: {{ state['reactor-cooling'].cooling }}
                    <slider :vertical="false"
                            :value="state['reactor-cooling'].cooling"
                            @update="value => state['reactor-cooling'].cooling = value"></slider>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import SevenSegmentDisplay from '../../controls/SevenSegmentDisplay';
    import Lamp from '../../controls/Lamp';
    import Slider from '../../controls/Slider';

    import limits from '../../../limits';

    export default {
        name: 'dashboard',
        props: {
            state: {
                required: true,
            },
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
        },
        components: {
            SevenSegmentDisplay,
            Lamp,
            Slider,
        },
    };
</script>
