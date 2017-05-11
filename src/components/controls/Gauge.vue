<template>
    <canvas class="canvas-gauges"></canvas>
</template>

<script>
    import {LinearGauge, RadialGauge} from 'canvas-gauges';

    export default {
        name: 'gauge',
        props: {
            type: {
                type: String,
                required: true,
            },
            value: {
                type: Number,
                required: true,
            },
            options: {
                type: Object,
                default: () => ({}),
            },
        },
        data() {
            return {
                gauge: null,
            };
        },
        watch: {
            value(newValue) {
                // TODO
                if (this.gauge) {
                    this.gauge.value = newValue;
                }
            },
        },
        mounted() {
            this.options.renderTo = this.$el;
            if (this.type === 'linear') {
                this.gauge = new LinearGauge(this.options);
            } else {
                this.gauge = new RadialGauge(this.options);
            }

            this.gauge.value = this.value;
            this.gauge.draw();
        },
        beforeDestroy() {
            if (this.gauge) {
                this.gauge.destroy();
            }
        },
    };
</script>
