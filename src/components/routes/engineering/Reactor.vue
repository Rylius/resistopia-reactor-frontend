<template>
    <section>
        <div class="block-group">
            <div class="block" style="width: 50%;">
                <div class="block-group">
                    <div class="block" style="width: 100%;">
                        <h1>
                            {{ $t('reactor.name') }}
                            <span class="secondary critical" v-if="state.reactor.shutdownRemaining.value">
                                {{ $t('reactor.state.offline')}}
                            </span>
                        </h1>
                    </div>

                    <div class="block block-group" style="width: 100%;">
                        <div class="block" style="width: 50%;">
                            <!-- FIXME Read max from config -->
                            {{ $t('reactor.input.matter', {amount: Math.round(state['storage-matter'].releasedMatterPerTick.value / 3)})}}
                            <slider :vertical="false" v-if="!production"
                                    :value="state['storage-matter']['releasedMatterPerTick'].normalizedValue"
                                    @update="value => changeProperty('storage-matter', 'releasedMatterPerTick', value)"></slider>
                        </div>
                        <div class="block" style="width: 50%;">
                            <!-- FIXME Read max from config -->
                            {{ $t('reactor.input.antimatter', {amount: Math.round(state['storage-antimatter'].releasedAntimatterPerTick.value / 3)})}}
                            <slider :vertical="false" v-if="!production"
                                    :value="state['storage-antimatter']['releasedAntimatterPerTick'].normalizedValue"
                                    @update="value => changeProperty('storage-antimatter', 'releasedAntimatterPerTick', value)"></slider>
                        </div>
                    </div>

                    <div class="block" style="width: 80%;">
                        <temperature-display :state="state" stateMachine="reactor" property="heat"
                                             :label="$t('reactor.temperature.core1')" :offset="9 + Math.random() * 2"
                                             style="width: 100%"></temperature-display>
                        <temperature-display :state="state" stateMachine="reactor" property="heat"
                                             :label="$t('reactor.temperature.core2')" :offset="Math.random()"
                                             style="width: 100%"></temperature-display>
                        <temperature-display :state="state" stateMachine="reactor" property="heat"
                                             :label="$t('reactor.temperature.core3')"
                                             :offset="-10 - (Math.random() * -3)"
                                             style="width: 100%"></temperature-display>
                    </div>

                    <div class="block" style="width: 20%;">
                    </div>
                </div>

                <div class="block-group" style="height: 300px;">
                    <div class="block" style="width: 50%;">
                        <lazy>
                            <reactor-temperature-chart :data="statistics.reactorTemperature.lastTenMinutes"
                                                       :options="{responsive: false, maintainAspectRatio: false}"
                                                       :width="497" :height="300">
                            </reactor-temperature-chart>
                        </lazy>
                    </div>
                </div>
            </div>


            <div class="block" style="width: 50%;">
                <div class="block-group">
                    <div class="block" style="width: 100%;">
                        <h1>{{ $t('cooling.name') }}</h1>
                    </div>

                    <div class="block block-group" style="width: 100%;">
                        <div class="block" style="width: 75%;">
                            <slider :vertical="false"
                                    :value="state['reactor-cooling']['cooling'].normalizedValue"
                                    @update="value => changeProperty('reactor-cooling', 'cooling', value)"></slider>
                        </div>
                        <div class="block" style="width: 25%; text-align: right;">
                            {{ $t('cooling.provided', {amount: Math.round((state['reactor-cooling'].effectiveCooling.value / 1.25) * 100)})}}<br>
                            {{ $t('cooling.requested', {amount: Math.round((state['reactor-cooling'].cooling.value / 1.25) * 100)})}}
                        </div>
                    </div>

                    <div class="block" style="width: 70%;">
                        <power-consumption-display :state="state" stateMachine="reactor-cooling"
                                                   :label="$t('stateMachine.reactor-cooling.powerConsumption')">
                        </power-consumption-display>
                    </div>
                </div>
            </div>
        </div>

        <br>

        <div class="block-group">
            <div class="block" style="width: 33%;">
                <camera :title="$t('camera.cooling')" type="cooling"
                        :offline="state['base']['powerSatisfaction'].value < 0.1"></camera>
            </div>

            <div class="block" style="width: 33%;">
                <camera :title="$t('camera.reactor')" type="engine"
                        :param="Math.min(Math.max(state['reactor']['heat'].value - 1200, 0) / 2400, 1)"
                        :offline="['critical'].includes(state['reactor']['heat'].status.id) || state['base']['powerSatisfaction'].value < 0.1"></camera>
            </div>

            <div class="block" style="width: 33%;">
                <camera :title="$t('camera.pump')" type="pump"
                        :offline="state['base']['powerSatisfaction'].value < 0.1"></camera>
            </div>
        </div>
    </section>
</template>

<script>
    import EngineeringMixin from '../../../mixins/engineering';

    import Lazy from '../../Lazy';
    import TemperatureDisplay from '../../controls/engineering/TemperatureDisplay';
    import PowerConsumptionDisplay from '../../controls/engineering/PowerConsumptionDisplay';
    import ReactorTemperatureChart from './components/ReactorTemperatureChart';
    import Camera from './components/Camera.vue';
    import Slider from '../../controls/Slider';

    export default {
        name: 'reactor',
        mixins: [EngineeringMixin],
        props: ['statistics'],
        computed: {
            production() {
                return process.env.NODE_ENV !== 'development';
            },
        },
        components: {
            Lazy,
            TemperatureDisplay,
            PowerConsumptionDisplay,
            ReactorTemperatureChart,
            Camera,
            Slider,
        },
    };
</script>
