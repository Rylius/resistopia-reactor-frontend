<template>
    <div class="white-noise" :class="{enabled}"></div>
</template>

<style lang="less" scoped>
    @keyframes white-noise {
        0% {
            background-position: 0 0;
        }
        50% {
            background-position: 200px 500px;
        }
    }

    .white-noise {
        width: 100%;
        height: 100%;

        background: url("../../../../../static/img/white_noise.png") repeat;

        mix-blend-mode: color-burn;

        animation: 0.1s linear infinite alternate white-noise;

        opacity: 0;
        transition: 5s opacity;
        &.enabled {
            opacity: 0.75;
        }
    }
</style>

<script>
    export default {
        name: 'white-noise',
        props: {
            enabled: {
                required: true,
                type: Boolean,
            },
        },
    };
</script>
