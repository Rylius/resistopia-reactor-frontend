<script>
    import {Line} from 'vue-chartjs';
    import moment from 'moment';

    export default Line.extend({
        name: 'water-tank-chart',
        props: {
            data: {
                required: true,
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
                        label: this.$t('water.industrial'),
                        data: this.data.values,
                        borderColor: '#5f74b1', // @signal-blue-highlight
                        backgroundColor: '#636981',
                        pointRadius: 0,
                    },
                ],
            };

            const options = {
                responsive: true,
                maintainAspectRatio: true,
                title: {
                    display: true,
                    text: this.$t('stateMachine.water-tank.name'),
                },
                legend: {
                    display: false,
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
                            },
                        },
                    ],
                    yAxes: [
                        {
                            ticks: {
                                min: 0,
                                max: 35000,
                                stepSize: 5000,
                                callback(value) {
                                    return vm.$t('water.cubicMeters', {amount: Math.round(value / 100) / 10});
                                },
                            },
                        },
                    ],
                },
                tooltips: {
                    intersect: false,
                    mode: 'nearest',
                    callbacks: {
                        title(items, data) {
                            return moment(data.labels[items[0].index]).format('H:mm');
                        },
                        label(item, data) {
                            const value = data.datasets[item.datasetIndex].data[item.index];
                            return `${vm.$t('water.industrial')}: ${vm.$t('water.cubicMeters', {amount: Math.round(value / 100) / 10})}`;
                        },
                    },
                },
            };

            this.renderChart(data, options);
        },
    });
</script>
