<template>
    <section>
        <div class="block-group">
            <div class="block" style="width: 50%;">
                <h2>{{ $t('stateMachine.base.name') }}</h2>

                <power-consumption-display :state="state" stateMachine="base"
                                           :label="$t('stateMachine.base.name')"></power-consumption-display>

                <h2>{{ $t('water.drinking') }}</h2>

                <power-consumption-display :state="state" stateMachine="water-treatment"
                                           requiredProperty="requiredPower"
                                           :label="$t('stateMachine.water-treatment.shortName')"></power-consumption-display>

                <h2>{{ $t('water.industrial') }}</h2>

                <power-consumption-display :state="state" stateMachine="pump-a"
                                           :label="$t('stateMachine.pump-a.name')"></power-consumption-display>

                <power-consumption-display :state="state" stateMachine="pump-b"
                                           :label="$t('stateMachine.pump-b.name')"></power-consumption-display>

                <power-consumption-display :state="state" stateMachine="pump-c"
                                           :label="$t('stateMachine.pump-c.name')"></power-consumption-display>
            </div>

            <div class="block" style="width: 50%;">
                <h2 style="text-align: right;">{{ $t('temperature.pluralName') }}</h2>

                <temperature-display :state="state" stateMachine="power-distributor" property="heat"
                                     :label="$t('stateMachine.power-distributor.name')">
                    <span slot="status" v-if="state['power-distributor'].shutdownRemaining.value">(offline)</span>
                </temperature-display>

                <temperature-display :state="state" stateMachine="power-capacitor" property="heat"
                                     :label="$t('stateMachine.power-capacitor.name1')">
                </temperature-display>

                <temperature-display :state="state" stateMachine="power-capacitor" property="heat" :offset="1"
                                     :label="$t('stateMachine.power-capacitor.name2')">
                </temperature-display>

                <temperature-display :state="state" stateMachine="power-capacitor" property="heat" :offset="-4"
                                     :label="$t('stateMachine.power-capacitor.name3')">
                </temperature-display>

                <temperature-display :state="state" stateMachine="power-capacitor" property="heat" :offset="-19"
                                     :label="$t('stateMachine.power-capacitor.diesel1')">
                </temperature-display>

                <temperature-display :state="state" stateMachine="power-capacitor" property="heat" :offset="-17"
                                     :label="$t('stateMachine.power-capacitor.diesel2')">
                </temperature-display>

                <lazy style="padding-left: 2em;">
                    <power-chart :data="statistics.power.lastHour"
                                 :options="{responsive: false, maintainAspectRatio: false}"
                                 :width="477" :height="300"></power-chart>
                </lazy>
            </div>
        </div>
    </section>
</template>

<script>
    import EngineeringMixin from '../../../mixins/engineering';

    import Lazy from '../../Lazy.vue';
    import TemperatureDisplay from '../../controls/engineering/TemperatureDisplay';
    import PowerConsumptionDisplay from '../../controls/engineering/PowerConsumptionDisplay';
    import PowerChart from './components/PowerChart.vue';

    export default {
        name: 'power',
        mixins: [EngineeringMixin],
        props: ['statistics'],
        components: {
            Lazy,
            TemperatureDisplay,
            PowerConsumptionDisplay,
            PowerChart,
        },
    };
</script>
