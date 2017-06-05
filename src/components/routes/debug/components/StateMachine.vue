<template>
    <div class="state-machine" :style="style">
        <div><strong>{{ id }}</strong></div>

        <ul v-if="stateProperties">
            <li v-for="property in stateProperties">
                {{ property }}: {{ Math.round(state[property] * 10) / 10 }}
            </li>
        </ul>

        <ul v-if="editableProperties">
            <li v-for="property in editableProperties">
                {{ property }}:
                <input type="number" step="1"
                       :min="limits.input[id][property].min" :max="limits.input[id][property].max"
                       :value="state[property]" @input="update(property, $event.target.value)">
            </li>
        </ul>

        <ul v-if="outputProperties">
            <li v-for="property in outputProperties">
                {{ property }}: {{ Math.round(state[property] * 10) / 10 }}
            </li>
        </ul>
    </div>
</template>

<style lang="less" scoped>
    @import "../../../../assets/less/variables";

    .state-machine {
        background-color: lighten(@display-background, 10%);

        display: block;
        position: absolute;

        padding: 8px;

        ul {
            list-style: none;

            margin: 8px 0;
            padding: 0;
        }
    }
</style>

<script>
    import Slider from '../../../controls/Slider';

    import limits from '../../../../limits';

    import {clamp} from '../../../../util/math';

    const WIDTH = 304;
    const HEIGHT = 160;
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
            definition: {
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
                    minWidth: WIDTH + 'px',
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
        computed: {
            stateProperties() {
                return Object.keys(this.state).filter(property => !this.editableProperties.includes(property) && !this.outputProperties.includes(property));
            },
            editableProperties() {
                return Object.keys(this.state).filter(property => this.definition.public[property]);
            },
            outputProperties() {
                return Object.keys(this.state).filter(property => this.definition.output.includes(property));
            },
        },
    }
</script>
