<template>
    <div class="block-group temperature-display">
        <div class="block" style="width: 30%;">
            {{ label }}
            <slot name="status"></slot>
        </div>
        <div class="block" style="width: 35%;">
            <seven-segment-display :value="Math.round(state[stateMachine][property].value)"
                                   :color="state[stateMachine][property].status.color"
                                   :digits="4" :decimals="0"></seven-segment-display>
        </div>
        <div class="block" style="width: 15%;">
            <seven-segment-display value="°C"
                                   :color="state[stateMachine][property].status.color"
                                   :digits="2" :decimals="0"></seven-segment-display>
        </div>
        <div class="block" style="width: 20%;">
            <!-- FIXME -->
            <lamp :enabled="state[stateMachine][property].status.id === 'critical'"
                  color="red" :flash="true"></lamp>
        </div>
    </div>
</template>

<style lang="less" scoped>
    .temperature-display {
        display: inline-block;
    }
</style>

<script>
    import SevenSegmentDisplay from '../SevenSegmentDisplay';
    import Lamp from '../Lamp';

    export default {
        name: 'TemperatureDisplay',
        props: {
            state: {
                required: true,
            },
            stateMachine: {
                required: true,
                type: String,
            },
            property: {
                required: true,
                type: String,
            },
            label: {
                required: true,
                type: String,
            },
        },
        components: {
            SevenSegmentDisplay,
            Lamp,
        },
    };
</script>
