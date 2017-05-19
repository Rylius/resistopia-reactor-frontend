<template>
    <div class="block-group temperature-display">
        <div class="block" style="width: 30%;">
            {{ label }}
            <slot name="status"></slot>
        </div>
        <div class="block" style="width: 35%;">
            <seven-segment-display :value="Math.round(values[stateMachine][property].data)"
                                   :color="values[stateMachine][property].color"
                                   :digits="4" :decimals="0"></seven-segment-display>
        </div>
        <div class="block" style="width: 15%;">
            <seven-segment-display value="°C"
                                   :color="values[stateMachine][property].color"
                                   :digits="2" :decimals="0"></seven-segment-display>
        </div>
        <div class="block" style="width: 20%;">
            <lamp :enabled="values[stateMachine][property].type === 'critical'"
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
            values: {
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
