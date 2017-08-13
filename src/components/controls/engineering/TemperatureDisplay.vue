<template>
    <div class="temperature-display">
        <span class="label text">{{ label }}</span>
        <lamp :enabled="state[stateMachine][property].status.id === 'critical'"
              color="red" :flash="true"></lamp>
        <seven-segment-display :value="Math.round(state[stateMachine][property].value) + offset"
                               :color="state[stateMachine][property].status.color"
                               :digits="4" :decimals="0"></seven-segment-display>
        <span class="label unit">°C</span>
    </div>
</template>

<style lang="less" scoped>
    .temperature-display {
        display: flex;
        justify-content: flex-end;
        align-items: center;

        padding: 0 10px;

        .label.text {
            max-width: 50%;
        }
        .lamp {
            margin-right: -3px;
        }
        .segment-display {
            width: 95px;
        }
        .label.unit {
            margin-left: 8px;
        }
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
            offset: {
                type: Number,
                default: 0,
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
