<template>
    <div v-if="visible">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: 'lazy',
        props: {
            delay: {
                default: 10,
                type: Number,
            },
        },
        data() {
            return {
                visible: false,
            };
        },
        mounted() {
            setTimeout(() => {
                this.visible = true;
            }, this.delay);
        },
    };
</script>
