<template>
    <div class="block-group power-consumption-display">
        <div class="block" style="width: 30%;">
            {{ label }}
        </div>
        <div class="block" style="width: 60%;">
            <seven-segment-display
                :value="state[stateMachine][consumptionProperty].value"
                :color="state[stateMachine][satisfactionProperty].status.color"
                :digits="4" :decimals="1"></seven-segment-display>
        </div>
        <div class="block" style="width: 10%;">
            kWh
        </div>
    </div>
</template>

<style lang="less" scoped>
    .power-consumption-display {
        display: inline-block;
    }
</style>

<script>
    import SevenSegmentDisplay from '../SevenSegmentDisplay';

    export default {
        name: 'PowerConsumptionDisplay',
        props: {
            state: {
                required: true,
            },
            stateMachine: {
                required: true,
                type: String,
            },
            consumptionProperty: {
                default: 'powerConsumed',
                type: String,
            },
            satisfactionProperty: {
                default: 'powerSatisfaction',
                type: String,
            },
            label: {
                required: true,
                type: String,
            },
        },
        components: {
            SevenSegmentDisplay,
        },
    };
</script>
