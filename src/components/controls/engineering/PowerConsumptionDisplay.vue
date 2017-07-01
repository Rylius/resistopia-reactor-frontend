<template>
    <div class="block-group power-consumption-display">
        <div class="block label-block" style="width: 25%;">
            <span class="label">{{ label }}</span>
        </div>

        <div class="block" style="width: 37.5%;">
            <div class="block-group">
                <div class="block display-label-block" style="width: 100%;">
                    <span class="label">{{ $t('power.actual') }}</span>
                    <span class="label secondary">kWh</span>
                </div>

                <div class="block" style="width: 100%;">
                    <seven-segment-display
                        :value="state[stateMachine][consumptionProperty].value"
                        :color="state[stateMachine][satisfactionProperty].status.color"
                        :digits="4" :decimals="1"></seven-segment-display>
                </div>
            </div>
        </div>

        <div class="block" style="width: 37.5%;">
            <div class="block-group">
                <div class="block display-label-block" style="width: 100%;">
                    <span class="label">{{ $t('power.target') }}</span>
                    <span class="label secondary">kWh</span>
                </div>
                <div class="block" style="width: 100%;">
                    <seven-segment-display
                        :value="state[stateMachine][requiredProperty].value"
                        color="green" :digits="4" :decimals="1"></seven-segment-display>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="less" scoped>
    .power-consumption-display {
        display: inline-block;
        width: 100%;
        min-width: 320px;
    }

    .label-block {
        height: 80px;

        /* Vertically center label */
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .display-label-block {
        text-align: right;
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
            requiredProperty: {
                default: 'powerRequired',
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
