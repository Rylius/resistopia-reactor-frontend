<template>
    <section>
    </section>
</template>

<script>
    import Slider from '../../controls/Slider';

    export default {
        name: 'reactor',
        props: {
            state: {
                required: true,
            },
        },
        components: {
            Slider
        },
    };
</script>
