<template>
    <div class="lamp">
        <div class="inactive" :class="[color]"></div>
        <div class="active" :class="[{enabled, flash}, color]"></div>
    </div>
</template>

<style lang="less" scoped>
    @import "../../assets/less/variables";

    @lamp-size: 50px;
    @gradient-size: 20px;

    @lamp-flash-speed: 0.6s;
    @lamp-fade-speed: 0.1s;

    @keyframes flash {
        0%, 100% {
            opacity: 0;
        }
        20%, 80% {
            opacity: 1;
        }
    }

    .lamp-background(@color, @color-highlight) {
        background-image: radial-gradient(@gradient-size circle, @color-highlight, @color, transparent);
    }

    .lamp {
        display: inline-block;
        position: relative;

        width: @lamp-size;
        height: @lamp-size;

        background-color: @display-background;

        .inactive, .active {
            position: absolute;

            width: @lamp-size;
            height: @lamp-size;
        }

        .inactive {
            &.green {
                .lamp-background(@signal-green-disabled, @signal-green-disabled);
            }
            &.orange {
                .lamp-background(@signal-orange-disabled, @signal-orange-disabled);
            }
            &.red {
                .lamp-background(@signal-red-disabled, @signal-red-disabled);
            }
        }

        .active {
            opacity: 0;
            transition: opacity @lamp-fade-speed ease-in-out;

            &.enabled {
                opacity: 1;

                &.flash {
                    animation: flash @lamp-flash-speed infinite;
                }
            }

            &.green {
                .lamp-background(@signal-green, @signal-green-highlight);
            }
            &.orange {
                .lamp-background(@signal-orange, @signal-orange-highlight);
            }
            &.red {
                .lamp-background(@signal-red, @signal-red-highlight);
            }
        }
    }

    .label {
        display: block;

        font-family: monospace;
        font-size: 1.5em;
    }
</style>

<script>
    export default {
        name: 'lamp',
        props: {
            color: {
                type: String,
                default: 'red',
            },
            enabled: Boolean,
            flash: {
                type: Boolean,
                default: true,
            },
        },
    };
</script>
