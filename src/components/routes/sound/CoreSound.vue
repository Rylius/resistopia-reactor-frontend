<template>
    <div class="core-sound">
        <h1>Tarnkern-Sound - OT!</h1>
        <div class="warning-strip">&nbsp;</div>

        <div v-if="audioContext">
            <div v-if="oscillator">
                <h2>50 Hz Sinus (manuell)</h2>
                <button @click="startSound">Play</button>
                <button @click="stopSound">Stop</button>
            </div>

            <h2>Simulation</h2>
            IT: {{ !!globalState.effects }}
            <br>
            Tarnkern: {{ !!globalState.camouflage }}
            <br>
            Energie: {{ Math.round(state['core']['energySatisfaction'].value * 100) }}%

            <div v-if="audioDevicesSupported">
                <h2>Audio output devices</h2>
                Irrelevant, nicht implementiert
                <ul>
                    <li v-for="device in audioDevices">{{ device.label }}</li>
                </ul>
            </div>
        </div>

    </div>
</template>

<style lang="less" scoped>
    .core-sound {
        h1 {
            font-size: 4rem;
        }

        .warning-strip {
            width: 1024px;
            margin-left: -15px;
            margin-bottom: 1em;
        }
    }
</style>

<script>
    import EngineeringMixin from '../../../mixins/engineering';

    export default {
        name: 'core-sound',
        mixins: [EngineeringMixin],
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
        watch: {
            globalState(globals) {
                if (!globals.effects) {
                    return;
                }

                if (globals.camouflage) {
                    this.startSound();
                } else {
                    this.stopSound();
                }
            },
        },
        methods: {
            startSound() {
                this.gain.gain.value = 1;
            },
            stopSound() {
                this.gain.gain.value = 0;
            },
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

            oscillator.start(0);

            this.stopSound();
        },
    };
</script>
