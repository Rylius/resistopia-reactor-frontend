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
                            matter: {{ Math.round(state['storage-matter'].releasedMatterPerTick.value) }}
                            <slider :vertical="false"
                                    :value="state['storage-matter']['releasedMatterPerTick'].normalizedValue"
                                    @update="value => changeProperty('storage-matter', 'releasedMatterPerTick', value)"></slider>
                        </div>
                        <div class="block" style="width: 50%;">
                            antimatter: {{ Math.round(state['storage-antimatter'].releasedAntimatterPerTick.value)}}
                            <slider :vertical="false"
                                    :value="state['storage-antimatter']['releasedAntimatterPerTick'].normalizedValue"
                                    @update="value => changeProperty('storage-antimatter', 'releasedAntimatterPerTick', value)"></slider>
                        </div>
                    </div>

                    <div class="block" style="width: 70%;">
                        <temperature-display :state="state" stateMachine="reactor" property="heat"
                                             :label="$t('reactor.temperature.core')"
                                             style="width: 100%"></temperature-display>
                    </div>

                    <div class="block" style="width: 30%;">
                    </div>
                </div>
            </div>

            <div class="block" style="width: 50%;">
                <div class="block-group">
                    <div class="block" style="width: 100%;">
                        <h1>{{ $t('cooling.name') }}</h1>
                    </div>

                    <div class="block" style="width: 100%;">
                        <!-- TODO -->
                        cooling:
                        {{ Math.round((state['reactor-cooling'].effectiveCooling.value / 2) * 100) }}%
                        requested:
                        {{ Math.round((state['reactor-cooling'].cooling.value / 2) * 100) }}%
                        <slider :vertical="false"
                                :value="state['reactor-cooling']['cooling'].normalizedValue"
                                @update="value => changeProperty('reactor-cooling', 'cooling', value)"></slider>
                    </div>

                    <div class="block" style="width: 70%;">
                        <power-consumption-display :state="state" stateMachine="reactor-cooling"
                                                   :label="$t('stateMachine.reactor-cooling.powerConsumption')">
                        </power-consumption-display>
                    </div>
                </div>
            </div>
        </div>

        <div class="block-group">
            <div class="block" style="width: 33%;">
                <camera :title="$t('camera.cooling')" type="cooling"
                        :offline="['warning', 'critical'].includes(state['reactor']['heat'].status.id)"></camera>
            </div>

            <div class="block" style="width: 33%;">
                <camera :title="$t('camera.reactor')" type="engine"
                        :offline="['critical'].includes(state['reactor']['heat'].status.id)"></camera>
            </div>

            <div class="block" style="width: 33%;">
                <camera :title="$t('camera.pump')" type="pump"
                        :offline="['warning', 'critical'].includes(state['reactor']['heat'].status.id)"></camera>
            </div>
        </div>
    </section>
</template>

<script>
    import EngineeringMixin from '../../../mixins/engineering';

    import TemperatureDisplay from '../../controls/engineering/TemperatureDisplay';
    import PowerConsumptionDisplay from '../../controls/engineering/PowerConsumptionDisplay';
    import Camera from './components/Camera.vue';
    import Slider from '../../controls/Slider';

    export default {
        name: 'reactor',
        mixins: [EngineeringMixin],
        components: {
            Camera,
            TemperatureDisplay,
            PowerConsumptionDisplay,
            Slider,
        },
    };
</script>
