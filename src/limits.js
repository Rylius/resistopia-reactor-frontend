export default {
    ranges: {
        reactor: {
            heat: [
                {from: -Infinity, to: 1000, id: 'cold', color: 'blue',},
                {from: 1000, to: 2000, id: 'normal', color: 'green'},
                {from: 2000, to: 4000, id: 'warning', color: 'orange'},
                {from: 4000, to: Infinity, id: 'critical', color: 'red'},
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
                {from: 50, to: 150, id: 'warning', color: 'orange'},
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
                max: 500,
            },
        },
        'storage-antimatter': {
            releasedAntimatterPerTick: {
                min: 0,
                max: 500,
            },
        },
        'reactor-cooling': {
            cooling: {
                min: 0,
                max: 200,
            },
        },
    },
};
