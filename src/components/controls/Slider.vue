<template>
    <div></div>
</template>

<style lang="less">
    @import "../../assets/less/variables";

    @slider-size: 30px;
    @track-size: 6px;
    @track-margin: 5px;
    @handle-thickness: 10px;

    @track-color: #252525;
    @handle-color: darken(@display-background, 10%);

    .range-slider {
        margin: 0 @track-margin (@slider-size / 2)
    }

    .range-slider-track {
        width: auto;
        height: @slider-size;
        margin: 0 auto;
        position: relative;
        cursor: e-resize;
    }

    .range-slider-track:before {
        content: '';
        display: block;
        position: absolute;
        top: (@slider-size - @track-size) / 2;
        left: 0;
        width: 100%;
        height: @track-size;
        background-color: @track-color;
    }

    .range-slider-track .dragger {
        display: block;
        width: @handle-thickness;
        height: inherit;
        position: relative;
        z-index: 2;
        background-color: @handle-color;
        cursor: inherit;
    }

    .range-slider-vertical {
        display: inline-block;
        vertical-align: middle;
        margin: @track-margin (@slider-size / 2) @track-margin 0;
    }

    .range-slider-vertical .range-slider-track {
        cursor: n-resize;
        width: @slider-size;
        height: 100%;
    }

    .range-slider-vertical .range-slider-track:before {
        top: 0;
        right: auto;
        left: (@slider-size - @track-size) / 2;
        width: @track-size;
        height: 100%;
    }

    .range-slider-vertical .range-slider-track .dragger {
        width: inherit;
        height: @handle-thickness;
    }
</style>

<script>
    import createRangeSlider from '../../controls/range-slider';

    export default {
        name: 'vertical-slider',
        props: {
            value: {
                type: Number,
                required: true,
            },
            vertical: {
                type: Boolean,
                default: true,
            },
        },
        methods: {
            sliderValueChanged(value) {
                this.$emit('update', value);
            },
        },
        mounted() {
            this.slider = createRangeSlider(this.$el, {
                value: this.value,
                vertical: this.vertical,
                drag: this.sliderValueChanged,
            });
        },
    };
</script>
