<template>
    <div class="energy-bar">
        <div v-for="i in elements" class="element">
            <div class="state" :class="{active: (i / elements) > value }"></div>
        </div>
    </div>
</template>

<style lang="less" scoped>
    @element-color: #029e00;
    @element-color-highlight: darken(@element-color, 17.5%);
    @element-active-color: #9eff00;
    @element-active-color-highlight: @element-color;

    @element-height: 0.75em;
    @element-margin: @element-height;

    .energy-bar {
        width: 128px;

        opacity: 0.8;

        .element {
            width: 128px;
            height: @element-height;

            border-radius: 1em;

            background: @element-color linear-gradient(to right, transparent, @element-color-highlight, transparent);
            box-shadow: 0 0 2px 3px fade(@element-active-color, 50%);

            .state {
                width: 100%;
                height: @element-height;

                border-radius: 1em;

                opacity: 0;
                transition: 5s opacity;

                &.active {
                    background: @element-active-color linear-gradient(to right, transparent, @element-active-color-highlight, transparent);
                    opacity: 1;
                }
            }
        }

        .element + .element {
            margin-top: @element-margin;
        }
    }
</style>

<script>
    export default {
        name: 'energy-bar',
        props: ['elements', 'value'],
    };
</script>
