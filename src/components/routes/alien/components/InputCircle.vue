<template>
    <div class="input-circle" :style="{left: `${x}px`, top: `${y}px`}" @click="touch">
        <div class="active" :style="style">
            <img class="content" src="../../../../../static/img/alien_input_circle.png">
        </div>
        <div class="effects"></div>
    </div>
</template>

<style lang="less" scoped>
    @size: 384px;
    @transition-speed: 10s;

    @keyframes rotation {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }

    .input-circle {
        position: absolute;

        width: @size;
        height: @size;

        transform-origin: 50% 50%;

        background-image: url("../../../../../static/img/alien_input_circle_disabled.png");
        background-size: contain;

        .active {
            position: absolute;

            width: @size;
            height: @size;

            transform-origin: 50% 50%;

            pointer-events: none;

            .content {
                position: absolute;

                width: 100%;
                height: 100%;

                transform-origin: 50% 50%;

                animation: 10s linear rotation infinite;
            }
        }

        .effects {
            pointer-events: none;
        }
    }
</style>

<script>
    import TWEEN from 'tween.js';

    import {clamp} from '../../../../util/math';

    const SIZE = 384;
    const MIN_SIZE = 32;

    const SPEED = 5000;

    export default {
        name: 'input-circle',
        props: {
            x: {
                required: true,
                type: Number,
            },
            y: {
                required: true,
                type: Number,
            },
            value: {
                required: true,
                type: Number,
            },
        },
        data() {
            return {
                animatedValue: 0,
            };
        },
        methods: {
            touch(event) {
                const x = Math.abs((event.offsetX / SIZE) - 0.5) * 2;
                const y = Math.abs((event.offsetY / SIZE) - 0.5) * 2;
                const dist = clamp(Math.max(x, y), 0, 1);
                this.$emit('value', dist);
            },
        },
        computed: {
            style() {
                const size = Math.max(SIZE * this.animatedValue, MIN_SIZE);
                return {
                    transform: `scale(${size / SIZE})`,
                };
            },
        },
        watch: {
            value: function (newValue, oldValue) {
                const vm = this;
                new TWEEN.Tween({value: this.animatedValue})
                    .easing(TWEEN.Easing.Quadratic.Out)
                    .to({value: newValue}, SPEED)
                    .onUpdate(function () {
                        vm.animatedValue = this.value;
                    })
                    .start();
            },
        },
    };
</script>
