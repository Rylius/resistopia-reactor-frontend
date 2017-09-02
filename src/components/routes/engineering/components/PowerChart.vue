<script>
    import {Line} from 'vue-chartjs';
    import moment from 'moment';

    import chartDefaults from './chart';

    export default Line.extend({
        name: 'power-chart',
        props: {
            production: {
                required: true,
            },
            required: {
                required: true,
            },
            options: {
                default: () => {
                    return {};
                },
            },
        },
        watch: {
            production: {
                deep: true,
                handler() {
                    this._chart.update();
                },
            },
            required: {
                deep: true,
                handler() {
                    this._chart.update();
                },
            },
        },
        mounted() {
            const vm = this;

            const data = {
                labels: this.production.labels,
                datasets: [
                    {
                        label: this.$t('power.totalProduction'),
                        data: this.production.values,
                        borderColor: '#f7b233', // @signal-orange-highlight
                        backgroundColor: '#f7b233', // @signal-orange-highlight
                        pointRadius: 0,
                        spanGaps: true,
                        lineTension: 0,
                        xAxisID: 'time',
                    },
                    {
                        label: this.$t('power.totalRequired'),
                        data: this.required.values,
                        borderColor: '#ff4629', // @signal-red-highlight
                        backgroundColor: '#ff4629', // @signal-red-highlight
                        pointRadius: 0,
                        spanGaps: true,
                        lineTension: 0,
                        xAxisID: 'time',
                    },
                ],
            };

            const options = chartDefaults({
                title: {
                    display: true,
                    text: `${this.$t('power.name')}`,
                },
                scales: {
                    xAxes: [
                        {
                            id: 'time',
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
                                max: 250,
                                stepSize: 50,
                                fontColor: '#eee',
                                callback(value) {
                                    return vm.$t('power.kilowattHours', {power: Math.round(value)});
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

                            const label = (item.datasetIndex > 0) ? vm.$t('power.totalRequired') : vm.$t('power.totalProduction');

                            return `${label}: ${vm.$t('power.kilowattHours', {power: Math.round(value)})}`;
                        },
                    },
                },
            }, this.options);

            this.renderChart(data, options);
        },
    });
</script>
