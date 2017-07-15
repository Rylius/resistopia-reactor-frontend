<template>
    <div class="range-slider" :class="[vertical ? 'range-slider-vertical' : 'range-slider-horizontal']">
        <div class="range-slider-track">
            <span class="dragger"
                  :style="{left: vertical ? '0' : handlePosition, top: vertical ? handlePosition : '0'}"></span>
        </div>
    </div>
</template>

<style lang="less" scoped>
    @import "../../assets/less/variables";

    @slider-size: 30px;
    @track-size: 6px;
    @track-margin: 10px;
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
    import {clamp} from '../../util/math';

    export default {
        name: 'slider',
        data() {
            return {
                trackLength: 0,
                trackOffset: 0,
                handleLength: 0,
                dragging: false,
            };
        },
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
        computed: {
            handlePosition() {
                return ((this.value * this.trackLength) - (this.handleLength / 2)) + 'px';
            },
        },
        methods: {
            offset(el) {
                const offsetProp = this.vertical ? 'offsetTop' : 'offsetLeft';
                let offset = el[offsetProp];
                while (el = el.offsetParent) {
                    offset += el[offsetProp];
                }
                return offset;
            },
            beginDrag() {
                this.dragging = true;

                this.updateDrag();

                document.addEventListener('touchmove', this.updateDrag);
                document.addEventListener('mousemove', this.updateDrag);
            },
            updateDrag() {
                const e = window.event;
                const positionProp = this.vertical ? 'pageY' : 'pageX';
                const pos = e.touches ? e.touches[0][positionProp] : e[positionProp];

                const value = clamp(((pos - this.trackOffset) / this.trackLength), 0, 1);
                this.$emit('update', value);
            },
            endDrag() {
                document.removeEventListener('touchmove', this.updateDrag);
                document.removeEventListener('mousemove', this.updateDrag);

                this.dragging = false;
            },
        },
        mounted() {
            const track = this.$el.getElementsByClassName('range-slider-track')[0];
            this.trackLength = (this.vertical ? track.offsetHeight : track.offsetWidth);
            this.trackOffset = this.offset(track);

            const handle = this.$el.getElementsByClassName('dragger')[0];
            this.handleLength = (this.vertical ? handle.offsetHeight : handle.offsetWidth);

            track.addEventListener('touchstart', this.beginDrag);
            track.addEventListener('mousedown', this.beginDrag);

            document.addEventListener('touchend', this.endDrag);
            document.addEventListener('mouseup', this.endDrag);
        },
        beforeDestroy() {
            document.removeEventListener('touchend', this.endDrag);
            document.removeEventListener('mouseup', this.endDrag);
            document.removeEventListener('touchmove', this.updateDrag);
            document.removeEventListener('mousemove', this.updateDrag);
        },
    };
</script>
