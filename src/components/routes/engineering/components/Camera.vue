<template>
    <div class="camera">
        <div class="screen" :class="[type]"></div>
        <div class="effects" :class="[type, {offline}]"></div>

        <span class="title label">{{ title }}</span>
        <span class="status label" :class="{offline}"></span>
    </div>
</template>

<style lang="less" scoped>
    @import "../../../../assets/less/engineering_variables";

    @camera-width: 240px;
    @camera-height: 180px;

    @keyframes noise-slide {
        0% {
            background-position: 0 @camera-height;
        }
        50% {
            background-position: -1000px @camera-height / 2;
        }
        100% {
            background-position: 1000px 100%;
        }
    }

    @keyframes noise {
        0% {
            background-position: 0 @camera-height;
        }
        50% {
            background-position: @camera-width * 2 @camera-height * 6;
        }
    }

    .camera {
        position: relative;

        width: @camera-width;
        height: @camera-height;

        border: 4px solid darken(@display-background, 15%);
        border-radius: 4px;

        margin: 0 auto;

        .effects {
            position: relative;

            width: 100%;
            height: 100%;

            background-image: url("../../../../../static/img/white_noise2.png");
            background-size: contain;

            mix-blend-mode: multiply;
            opacity: 0.5;

            animation: 0.75s linear noise-slide infinite;

            &.cooling {
                animation-duration: 1.2s;
            }
            &.engine {
                animation-duration: 0.9s;
            }
            &.pump {
                animation-duration: 1.1s;
            }

            &.offline {
                background-image: url("../../../../../static/img/white_noise3.png");
                background-size: 200%;

                mix-blend-mode: initial;
                opacity: 0.9;

                animation: 0.3s linear noise infinite;

                &.pump {
                    animation-duration: 0.31s;
                }
            }
        }

        .screen {
            position: absolute;
            top: 0;
            left: 0;

            width: 100%;
            height: 100%;

            background-size: 100%;

            &.cooling {
                background-image: url("../../../../../static/img/cooling.jpg");
            }
            &.engine {
                background-image: url("../../../../../static/img/engine.jpg");
            }
            &.pump {
                background-image: url("../../../../../static/img/pump.jpg");
            }
        }

        .label {
            font-size: 1.1em;
            padding: 4px 6px;
        }

        .title {
            position: absolute;
            bottom: 4px;
            left: 4px;
        }

        .status {
            position: absolute;
            bottom: 4px;
            right: 4px;

            content: 'aasdf';

            width: 1em;
            height: 1em;

            border-radius: 0.25em;

            background-color: @signal-green;
            &.offline {
                background-color: @signal-red;
            }
        }
    }
</style>

<script>
    export default {
        name: 'camera',
        props: {
            title: {
                required: true,
                type: String,
            },
            type: {
                required: true,
                type: String,
            },
            offline: {
                type: Boolean,
            },
        },
    };
</script>
