<template>
    <section>
        <p>
            {{ $t('reactor.name') }}:
            <span v-if="state.reactor.shutdownRemaining.value">{{ $t('reactor.state.offline') }}</span>
            <span v-else>{{ $t('reactor.state.online') }}
                ({{ $t('temperature.c', {temp: Math.round(state.reactor.heat.value)}) }})</span>
        </p>

        <p>
            ai core:
            <span v-if="state.core.energySatisfaction.status.id === 'normal'">active</span>
            <span v-else-if="state.core.energySatisfaction.status.id === 'warning'">active, not enough energy</span>
            <span v-else>offline</span>
        </p>
    </section>
</template>

<script>
    import EngineeringMixin from '../../../mixins/engineering';

    import SevenSegmentDisplay from '../../controls/SevenSegmentDisplay';
    import Lamp from '../../controls/Lamp';
    import Slider from '../../controls/Slider';
    import TemperatureDisplay from '../../controls/engineering/TemperatureDisplay';
    import PowerConsumptionDisplay from '../../controls/engineering/PowerConsumptionDisplay';

    export default {
        name: 'dashboard',
        mixins: [EngineeringMixin],
        components: {
            PowerConsumptionDisplay,
            SevenSegmentDisplay,
            Lamp,
            Slider,
            TemperatureDisplay,
        },
    };
</script>
