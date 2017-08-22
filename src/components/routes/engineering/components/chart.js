import merge from 'deepmerge';

export default function (options = {}) {
    return merge({
        responsive: true,
        maintainAspectRatio: true,
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
    }, options);
};
