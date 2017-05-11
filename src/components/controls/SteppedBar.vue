<template>
    <div class="stepped-bar">
        <div class="steps">
            <div v-for="step in steps" class="step">
                <div class="state" :class="[{active: (steps - step < valueToSteps)}, color]"></div>
            </div>
        </div>
    </div>
</template>

<style lang="less" scoped>
    @import "../../assets/less/variables";

    @step-size: 8px;
    @step-margin: 10px;

    @step-color: #535e6e;
    @step-color-highlight: darken(@step-color, 5%);

    @step-fade-speed: 0.2s;

    .stepped-bar {
        display: inline-block;

        width: 100%;
        height: 100%;

        padding: 5px;

        background-color: #2f3440;

        .steps {
            font-size: @step-margin + @step-size;
            line-height: 1;
        }

        .step {
            display: inline-block;

            width: 100%;
            min-height: @step-size;
            height: 100%;

            background: @step-color linear-gradient(to right, transparent, @step-color-highlight, transparent);

            .state {
                min-height: @step-size;

                opacity: 0;
                transition: opacity @step-fade-speed ease-in-out;
                &.active {
                    opacity: 1;
                }

                &.green {
                    background: @signal-green linear-gradient(to right, transparent, @signal-green-highlight, transparent);
                }
                &.orange {
                    background: @signal-orange linear-gradient(to right, transparent, @signal-orange-highlight, transparent);
                }
                &.red {
                    background: @signal-red linear-gradient(to right, transparent, @signal-red-highlight, transparent);
                }
            }
        }
    }
</style>

<script>
    export default {
        name: 'stepped-bar',
        props: {
            min: {
                type: Number,
                default: 0,
            },
            max: {
                type: Number,
                default: 100,
            },
            value: {
                type: Number,
                required: true,
            },
            orientation: {
                type: String,
                default: 'vertical',
            },
            steps: {
                type: Number,
                required: true,
            },
            color: {
                type: String,
                default: 'green',
            },
        },
        data() {
            return {};
        },
        computed: {
            valueToSteps() {
                // http://stackoverflow.com/a/4155197
                return ((this.value - this.min) / (this.max - this.min)) * (this.steps);
            },
        },
    };
</script>
