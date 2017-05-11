<template>
    <div class="segment-display">
        <div class="background" :data-content="backgroundDigits"></div>
        <div class="value" :class="[color]">{{ formattedValue }}</div>
    </div>
</template>

<style lang="less" scoped>
    @import "../../assets/less/variables";

    @segment-display-background: @display-background;
    @segment-inactive-color: lighten(@display-background, 10%);

    .segment-display {
        font-family: Segment7Standard, monospace;
        font-size: 2.5em;

        display: block;
        position: relative;

        width: 100%;
        height: 1em;

        box-sizing: border-box;

        background-color: @segment-display-background;

        .background {
            position: absolute;
            width: 100%;
            padding: 0 5px;

            text-align: right;

            color: @segment-inactive-color;
        }
        /* Prevents background text from being selectable */
        .background:before {
            content: attr(data-content);
        }

        .value {
            position: absolute;
            width: 100%;
            padding: 0 5px;

            text-align: right;

            &.green {
                color: @signal-green-highlight;
            }
            &.orange {
                color: @signal-orange-highlight;
            }
            &.red {
                color: @signal-red-highlight;
            }
        }
    }
</style>

<script>
    export default {
        name: 'seven-segment-display',
        props: {
            value: {
                type: [Number, String],
                required: true,
            },
            digits: {
                type: Number,
                default: 3,
            },
            decimals: {
                type: Number,
                default: 1,
            },
            color: {
                type: String,
                default: 'orange',
            },
        },
        computed: {
            formattedValue() {
                if (typeof this.value === 'string') {
                    // Only display the rightmost characters
                    return this.value.substring(this.value.length - this.digits);
                }

                const factor = Math.pow(10, this.decimals);
                const rounded = Math.round(this.value * factor) / factor;
                return rounded.toFixed(this.decimals);
            },
            backgroundDigits() {
                let digits = '';
                for (let i = 0; i < this.digits; i++) {
                    digits += '8';
                    if (this.decimals && i === this.digits - this.decimals - 1) {
                        digits += '.';
                    }
                }
                return digits;
            },
        },
    }
</script>
