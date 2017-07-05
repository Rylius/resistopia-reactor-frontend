<template>
    <section class="test-audio" v-if="audioContext">
        volume: <input type="range" v-model="gain.gain.value" min="0" max="1" step="0.1"/>

        <div v-if="audioDevicesSupported">
            <h2>audio output devices</h2>
            <ul>
                <li v-for="device in audioDevices">{{ device.label }}</li>
            </ul>
        </div>

        <h1></h1>

        <div v-if="oscillator">
            <h1>AudioContext#createOscillator</h1>
            <button @click="() => oscillator.start(0)">Play</button>
            <button @click="() => oscillator.stop()">Stop</button>
        </div>
    </section>
</template>

<style lang="less" scoped>
    @import "../../../assets/less/variables";

    .test-audio {
        padding: 20px;

        color: white;
        background-color: @display-background;
    }
</style>

<script>
    export default {
        name: 'test-audio',
        data() {
            return {
                audioDevicesSupported: false,
                audioDevices: [],
                audioContext: null,
                gain: null,
                oscillator: null,
                oscillatorDevice: null,
            };
        },
        mounted() {
            // Not supported on mobile Chrome
            if (navigator && navigator.mediaDevices && navigator.mediaDevices.enumerateDevices) {
                this.audioDevicesSupported = true;
                navigator.mediaDevices.enumerateDevices()
                    .then(devices => this.audioDevices.push(...devices.filter(device => device.kind === 'audiooutput')));
            }

            const audioContext = new AudioContext();
            this.audioContext = audioContext;

            const gain = audioContext.createGain();
            this.gain = gain;
            gain.connect(audioContext.destination);
            gain.gain.value = 1;

            const oscillator = audioContext.createOscillator();
            this.oscillator = oscillator;
            oscillator.connect(gain);

            oscillator.type = 'sine';
            oscillator.frequency.value = 50;
        },
    };
</script>
