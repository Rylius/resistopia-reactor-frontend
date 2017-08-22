<script>
    import {Line} from 'vue-chartjs';
    import moment from 'moment';

    import chartDefaults from './chart';

    export default Line.extend({
        name: 'battery-chart',
        props: {
            data: {
                required: true,
            },
            options: {
                default: () => {
                    return {};
                },
            },
        },
        data() {
            return {};
        },
        watch: {
            data: {
                deep: true,
                handler() {
                    this._chart.update();
                },
            },
        },
        mounted() {
            const vm = this;

            const data = {
                labels: this.data.labels,
                datasets: [
                    {
                        label: this.$t('power.totalProduction'),
                        data: this.data.values,
                        borderColor: '#f7b233', // @signal-orange-highlight
                        backgroundColor: '#f7b233', // @signal-orange-highlight
                        pointRadius: 0,
                        spanGaps: true,
                    },
                ],
            };

            const options = chartDefaults({
                title: {
                    display: true,
                    text: `${this.$t('stateMachine.power-capacitor.name')}`,
                },
                scales: {
                    xAxes: [
                        {
                            type: 'time',
                            time: {
                                unit: 'second',
                                displayFormats: {
                                    second: 'H:mm',
                                },
                            },
                            ticks: {
                                autoSkip: true,
                                autoSkipPadding: 100,
                                maxRotation: 0,
                                fontColor: '#eee',
                            },
                        },
                    ],
                    yAxes: [
                        {
                            ticks: {
                                min: 0,
                                max: 1,
                                stepSize: 0.25,
                                fontColor: '#eee',
                                callback(value) {
                                    return vm.$t('power.charge', {charge: Math.round(value * 100)});
                                },
                            },
                            gridLines: {
                                display: true,
                                color: 'rgba(255, 255, 255, 0.25)',
                            },
                        },
                    ],
                },
                tooltips: {
                    callbacks: {
                        title(items, data) {
                            return moment(data.labels[items[0].index]).format('H:mm');
                        },
                        label(item, data) {
                            const value = data.datasets[item.datasetIndex].data[item.index];
                            return vm.$t('power.charge', {charge: Math.round(value * 100)});
                        },
                    },
                },
            }, this.options);

            this.renderChart(data, options);
        },
    });
</script>
