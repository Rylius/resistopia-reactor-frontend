<template>
    <div class="state-machine" :style="style">
        <div><strong>{{ id }}</strong></div>

        <div v-for="property in Object.keys(state)">
            {{ property }}:
            <span v-if="limits.input[id] && limits.input[id][property]">
                <input type="number" step="1"
                       :min="limits.input[id][property].min" :max="limits.input[id][property].max"
                       :value="state[property]" @input="update(property, $event.target.value)">
            </span>
            <span v-else>
                {{ Math.round(state[property] * 10) / 10 }}
            </span>
        </div>
    </div>
</template>

<style lang="less" scoped>
    @import "../../../../assets/less/variables";

    .state-machine {
        background-color: lighten(@display-background, 10%);

        display: block;
        position: absolute;

        padding: 8px;
    }
</style>

<script>
    import Slider from '../../../controls/Slider';

    import limits from '../../../../limits';

    import {clamp} from '../../../../util/math';

    const WIDTH = 304;
    const HEIGHT = 128;
    const MARGIN = 32;

    export default {
        components: {Slider},
        name: 'state-machine',
        props: {
            id: {
                type: String,
                required: true,
            },
            state: {
                required: true,
            },
            position: {
                required: true,
            },
        },
        data() {
            return {
                limits,
                style: {
                    width: WIDTH + 'px',
                    height: HEIGHT + 'px',
                    left: (this.position[0] * (WIDTH + MARGIN)) + 'px',
                    top: (this.position[1] * (HEIGHT + MARGIN)) + 'px',
                },
            };
        },
        methods: {
            update(property, value) {
                const limit = this.limits.input[this.id][property];
                this.$emit('update', property, clamp(value, limit.min, limit.max));
            },
        },
    }
</script>
