<template>
    <section>
        <div class="block-group">
            <div class="block" style="width: 40%;">
                <temperature-display :state="state" stateMachine="reactor" property="heat" label="reactor"
                                     style="width: 100%">
                    <span slot="status" v-if="state.reactor.shutdownRemaining.value">(offline)</span>
                </temperature-display>

                <temperature-display :state="state" stateMachine="power-distributor" property="heat" label="distributor"
                                     style="width: 100%">
                    <span slot="status" v-if="state['power-distributor'].shutdownRemaining.value">(offline)</span>
                </temperature-display>
            </div>

            <div class="block" style="width: 20%;">
                <power-consumption-display :state="state" stateMachine="reactor-cooling"
                                           label="cooling" style="width: 100%"></power-consumption-display>

                <!-- TODO Remove -->
                <power-consumption-display :state="state" stateMachine="core" consumptionProperty="energyConsumed"
                                           satisfactionProperty="energySatisfaction"
                                           label="core" style="width: 100%"></power-consumption-display>

                <power-consumption-display :state="state" stateMachine="base"
                                           label="base" style="width: 100%"></power-consumption-display>
            </div>
        </div>

        <div class="block-group">
            <div class="block block-group" style="width: 25%;">
                <div class="block">
                    matter: {{ Math.round(state['storage-matter'].releasedMatterPerTick.value) }}
                    <slider :vertical="false"
                            :value="state['storage-matter']['releasedMatterPerTick'].normalizedValue"
                            @update="value => changeProperty('storage-matter', 'releasedMatterPerTick', value)"></slider>
                </div>
                <div class="block">
                    antimatter: {{ Math.round(state['storage-antimatter'].releasedAntimatterPerTick.value) }}
                    <slider :vertical="false"
                            :value="state['storage-antimatter']['releasedAntimatterPerTick'].normalizedValue"
                            @update="value => changeProperty('storage-antimatter', 'releasedAntimatterPerTick', value)"></slider>
                </div>
            </div>

            <div class="block block-group" style="width: 25%;">
                <div class="block">
                    cooling: {{ Math.round(state['reactor-cooling'].effectiveCooling.value)}}/{{ Math.round(state['reactor-cooling'].cooling.value)}}
                    <slider :vertical="false"
                            :value="state['reactor-cooling']['cooling'].normalizedValue"
                            @update="value => changeProperty('reactor-cooling', 'cooling', value)"></slider>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import EngineeringMixin from '../../../mixins/engineering';

    import SevenSegmentDisplay from '../../controls/SevenSegmentDisplay';
    import Lamp from '../../controls/Lamp';
    import Slider from '../../controls/Slider';
    import TemperatureDisplay from '../../controls/engineering/TemperatureDisplay';
    import PowerConsumptionDisplay from "../../controls/engineering/PowerConsumptionDisplay";

    export default {
        name: 'dashboard',
        mixins: [EngineeringMixin],
        props: {
            state: {
                required: true,
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
