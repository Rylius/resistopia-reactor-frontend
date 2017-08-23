<script>
    import {Line} from 'vue-chartjs';
    import AnnotationPlugin from 'chartjs-plugin-annotation';
    import moment from 'moment';

    import chartDefaults from './chart';

    export default Line.extend({
        name: 'reactor-temperature-chart',
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
                        label: this.$t('temperature.name'),
                        data: this.data.values,
                        borderColor: '#f7b233', // @signal-orange-highlight
                        backgroundColor: '#f7b233', // @signal-orange-highlight
                        pointRadius: 0,
                        lineTension: 0,
                    },
                ],
            };

            const options = chartDefaults({
                plugins: [AnnotationPlugin],
                title: {
                    display: true,
                    text: `${this.$t('reactor.name')} (${this.$t('temperature.name')})`,
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
                            id: 'value',
                            ticks: {
                                min: 0,
                                max: 3000,
                                stepSize: 500,
                                fontColor: '#eee',
                                callback(value) {
                                    return vm.$t('temperature.c', {temp: Math.round(value)});
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
                            return `${vm.$t('temperature.name')}: ${vm.$t('temperature.c', {temp: Math.round(value)})}`;
                        },
                    },
                },
                annotation: {
                    drawTime: 'beforeDatasetsDraw',
                    annotations: [
                        {
                            type: 'box',
                            xScaleID: 'time',
                            yScaleID: 'value',
                            xMin: 0,
                            xMax: Date.now() * 2,
                            yMin: 0,
                            yMax: 1000,
                            backgroundColor: 'rgba(145, 171, 255, 0.125)', // @signal-blue-highlight
                        },
                        {
                            type: 'box',
                            xScaleID: 'time',
                            yScaleID: 'value',
                            xMin: 0,
                            xMax: Date.now() * 2,
                            yMin: 1000,
                            yMax: 2000,
                            backgroundColor: 'rgba(55, 238, 55, 0.125)', // @signal-green-highlight
                        },
                        {
                            type: 'box',
                            xScaleID: 'time',
                            yScaleID: 'value',
                            xMin: 0,
                            xMax: Date.now() * 2,
                            yMin: 2000,
                            yMax: 3000,
                            backgroundColor: 'rgba(255, 70, 41, 0.125)', // @signal-red-highlight
                        },
                    ],
                },
            }, this.options);

            this.renderChart(data, options);
        },
    });
</script>
