<template>
    <div class="bokeh-lights" :class="{enabled}"></div>
</template>

<style lang="less" scoped>
    @keyframes bokeh-lights {
        0% {
            background-position: 0 0;
        }
        50% {
            background-position: 200px 500px;
        }
        100% {
            background-position: 500px 200px;
        }
    }

    .bokeh-lights {
        width: 100%;
        height: 100%;

        background: url("../../../../../static/img/bokeh1.png") repeat;

        mix-blend-mode: color-dodge;

        animation: bokeh-lights 5s steps(3) infinite;

        opacity: 0;
        transition: 5s opacity;
        &.enabled {
            opacity: 0.2;
        }
    }
</style>

<script>
    export default {
        name: 'bokeh-lights',
        props: {
            enabled: {
                required: true,
                type: Boolean,
            },
        },
    };
</script>
