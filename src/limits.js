export default {
    ranges: {
        reactor: {
            heat: [
                {from: -Infinity, to: 100, id: 'cold', color: 'blue',},
                {from: 100, to: 500, id: 'normal', color: 'green'},
                {from: 500, to: 1000, id: 'warning', color: 'orange'},
                {from: 1000, to: Infinity, id: 'critical', color: 'red'},
            ],
        },
        'reactor-cooling': {
            powerConsumed: [],
            powerSatisfaction: [
                {from: -Infinity, to: 0.25, id: 'critical', color: 'red'},
                {from: 0.25, to: 0.75, id: 'warning', color: 'orange'},
                {from: 0.75, to: Infinity, id: 'normal', color: 'green'},
            ],
        },
        distributor: {
            heat: [
                {from: -Infinity, to: 50, id: 'normal', color: 'green',},
                {from: 100, to: 150, id: 'warning', color: 'orange'},
                {from: 150, to: Infinity, id: 'critical', color: 'red'},
            ],
        },
        core: {
            powerSatisfaction: [
                {from: -Infinity, to: 0.25, id: 'critical', color: 'red'},
                {from: 0.25, to: 0.75, id: 'warning', color: 'orange'},
                {from: 0.75, to: Infinity, id: 'normal', color: 'green'},
            ],
        },
        base: {
            powerSatisfaction: [
                {from: -Infinity, to: 0.25, id: 'critical', color: 'red'},
                {from: 0.25, to: 0.75, id: 'warning', color: 'orange'},
                {from: 0.75, to: Infinity, id: 'normal', color: 'green'},
            ],
        },
    },
    input: {
        'storage-matter': {
            releasedMatterPerTick: {
                min: 0,
                max: 250,
            },
        },
        'storage-antimatter': {
            releasedAntimatterPerTick: {
                min: 0,
                max: 250,
            },
        },
        'reactor-cooling': {
            cooling: {
                min: 0,
                max: 500,
            },
        },
    },
};