<template>
    <section>
        <div class="block-group">
            <div class="block" style="width: 50%;">
                <power-consumption-display :state="state" stateMachine="base"
                                           label="base" style="width: 100%"></power-consumption-display>

                <temperature-display :state="state" stateMachine="power-distributor" property="heat" label="distributor"
                                     style="width: 100%">
                    <span slot="status" v-if="state['power-distributor'].shutdownRemaining.value">(offline)</span>
                </temperature-display>
            </div>
        </div>
    </section>
</template>

<script>
    import EngineeringMixin from '../../../mixins/engineering';

    import TemperatureDisplay from '../../controls/engineering/TemperatureDisplay';
    import PowerConsumptionDisplay from '../../controls/engineering/PowerConsumptionDisplay';

    export default {
        name: 'power',
        mixins: [EngineeringMixin],
        components: {
            TemperatureDisplay,
            PowerConsumptionDisplay,
        },
    };
</script>
