<template>
    <div>
        <div class="block-group">
            <div class="block" style="width: 10%;">
                A
                <stepped-bar :steps="25" :value="values[0]" color="orange"></stepped-bar>
                <seven-segment-display :value="values[0]" :digits="3" :decimals="1"></seven-segment-display>
            </div>

            <div class="block" style="width: 8%;">
                B
                <stepped-bar :steps="15" :max="99" :value="values[1]"></stepped-bar>
                <seven-segment-display :value="values[1]" :digits="2" :decimals="0"
                                       color="green"></seven-segment-display>
                <seven-segment-display :value="values[1]" :digits="3" :decimals="1"
                                       color="red"></seven-segment-display>
                <stepped-bar :steps="7" :value="values[0]" color="orange"></stepped-bar>
            </div>

            <div class="block" style="width: 12%;">
                C
                <stepped-bar :steps="10" :max="10" :value="values[2]" color="red"></stepped-bar>
                <seven-segment-display :value="values[2]" :digits="4" :decimals="2" color="red"></seven-segment-display>
                <stepped-bar :steps="14" :max="99" :value="values[1]" color="red"></stepped-bar>
            </div>

            <div class="block" style="width: 5%;">
                D
                <stepped-bar :steps="10" :max="1" :value="values[3]" color="red"></stepped-bar>
                <div style="font-size: 0.5em;">
                    <seven-segment-display :value="values[3]" :digits="3" :decimals="2"
                                           color="red"></seven-segment-display>
                </div>
                <div style="font-size: 0.25em;" class="block-group">
                    <seven-segment-display :value="values[3]" :digits="3" :decimals="2"
                                           color="green" class="block" style="width: 50%"></seven-segment-display>
                    <seven-segment-display :value="values[3]" :digits="3" :decimals="2"
                                           color="orange" class="block" style="width: 50%"></seven-segment-display>
                </div>
                <lamp color="orange" :enabled="true" :flash="true"></lamp>
            </div>

            <div class="block" style="width: 8%;">
                E
                <div class="block-group">
                    <div class="block" style="width: 50%;">
                        Ist
                        <stepped-bar :value="sliderValue" :steps="10" :min="100" :max="0"></stepped-bar>
                    </div>
                    <div class="block" style="width: 50%;">
                        Soll
                        <vertical-slider :value="sliderValue" style="height: 180px;"
                                         @update="sliderValue = $event"></vertical-slider>
                    </div>
                </div>
            </div>

            <div class="block" style="width: 8%;">
                F
                <seven-segment-display value="-E-" :digits="3" color="red"></seven-segment-display>
                <seven-segment-display value="EEEEEEEEE" :digits="3" color="green"></seven-segment-display>
            </div>

            <div class="block" style="width: 8%; height: 300px;">
                G
                <gauge type="linear" :value="gaugeValues[0]"
                       :options="{
                            tickSide: 'left', needleSide: 'left', numberSide: 'left',
                            units: '°C', valueInt: 2, valueDec: 1,
                            valueBox: false, borders: false,
                            colorPlate: 'transparent',
                            title: 'Kühlwasser',
                            colorTitle: 'black', colorUnits: 'black', colorNumbers: 'black',
                            colorNeedle: 'black', colorNeedleEnd: 'black',
                            colorBarProgress: '#ff5454', colorBarProgressEnd: '#0063c7',
                            fontNumbersSize: 40, fontTitleSize: 40, fontUnitsSize: 50, fontValueSize: 40,
                            fontTitleWeight: 'bold',
                            majorTicks: [0, 25, 50, 75, 100], minorTicks: 1,
                            highlights: [
                                {from: 0, to: 50, color: 'green'},
                                {from: 50, to: 75, color: 'orange'},
                                {from: 75, to: 100, color: 'red'}
                            ],
                            animationRule: 'dequad', animatedValue: true
                }"></gauge>
            </div>
        </div>

        <div class="block-group">
            <div class="block">
                <div class="danger-strip" style="width: 200px; height: 20px;"></div>

                <div style="height: 50px;">
                    <span v-for="lamp in lamps" :key="lamp.id" @click="toggleLamp(lamp)">
                        <lamp :color="lamp.color" :enabled="lamp.enabled" :flash="lamp.flashing"></lamp>
                    </span>
                </div>

                <div class="warning-strip" style="width: 200px; height: 20px;"></div>
            </div>

            <div class="block">
                <gauge type="radial" :value="gaugeValues[1]"
                       :options="{
                            units: 'RPM', minValue: 0, maxValue: 6000,
                            animationRule: 'dequad'
                        }"></gauge>
            </div>
        </div>
    </div>
</template>

<script>
    import {clamp} from '../../../util/math';

    import SteppedBar from '../../controls/SteppedBar';
    import SevenSegmentDisplay from '../../controls/SevenSegmentDisplay';
    import Lamp from '../../controls/Lamp';
    import Gauge from '../../controls/Gauge';
    import VerticalSlider from '../../controls/Slider';

    export default {
        name: 'TestEverything',
        data() {
            return {
                values: [3.7, 54, 7.31, 0.5],
                lamps: [
                    {id: 0, color: 'red', enabled: true, flashing: true},
                    {id: 1, color: 'red', enabled: false, flashing: false},
                    {id: 2, color: 'orange', enabled: true, flashing: true},
                    {id: 3, color: 'green', enabled: true, flashing: true},
                ],
                sliderValue: 50,
                gaugeValues: [83.6, 2573],
                intervals: [],
            };
        },
        methods: {
            updateValues() {
                this.values.splice(0, 1, clamp(this.values[0] + (Math.random() * 10) - 5, 0, 100));
                this.values.splice(1, 1, clamp(this.values[1] + (Math.random() * 10) - 5, 0, 99));
                this.values.splice(2, 1, clamp(this.values[2] + Math.random() - 0.5, 0, 10));
                this.values.splice(3, 1, clamp(this.values[3] + (Math.random() * 0.5) - 0.25, 0, 1));
            },
            updateGauges() {
                this.gaugeValues.splice(0, 1, 53.6 + (Math.random() * 40));
                this.gaugeValues.splice(1, 1, 1000 + (Math.random() * 4000));
            },
            toggleLamp(lamp) {
                lamp.enabled = !lamp.enabled;
            },
        },
        mounted() {
            this.intervals.push(setInterval(this.updateValues.bind(this), 250));
            this.intervals.push(setInterval(this.updateGauges.bind(this), 2000));
        },
        beforeDestroy() {
            this.intervals.forEach(clearInterval);
        },
        components: {
            SevenSegmentDisplay,
            SteppedBar,
            Lamp,
            Gauge,
            VerticalSlider,
        },
    };
</script>
