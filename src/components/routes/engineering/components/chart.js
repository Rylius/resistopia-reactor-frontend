import merge from 'deepmerge';

export default function (options = {}, additionalOptions = {}) {
    return merge(merge({
        responsive: true,
        maintainAspectRatio: true,
        animation: {
            duration: 0,
        },
        title: {
            fontColor: '#eee',
        },
        legend: {
            display: false,
        },
        elements: {
            line: {
                fill: false,
            },
        },
        tooltips: {
            intersect: false,
            mode: 'nearest',
        },
    }, options), additionalOptions);
};
