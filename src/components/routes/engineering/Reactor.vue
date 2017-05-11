<template>
    <section>
        <div class="block-group">
            <div class="block block-group" style="width: 25%;">
                <div class="block">
                    matter
                    <slider :vertical="false"
                            :value="state['storage-matter'].releasedMatterPerTick"
                            @update="value => state['storage-matter'].releasedMatterPerTick = value"></slider>
                </div>
                <div class="block">
                    antimatter
                    <slider :vertical="false"
                            :value="state['storage-antimatter'].releasedAntimatterPerTick"
                            @update="value => state['storage-antimatter'].releasedAntimatterPerTick = value"></slider>
                </div>
            </div>
        </div>
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
