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
        'energy-distributor': {},
        'energy-converter': {},
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
                max: 300,
            },
        },
        'storage-antimatter': {
            releasedAntimatterPerTick: {
                min: 0,
                max: 300,
            },
        },
        'energy-distributor': {
            converterWeight: {
                min: 0,
                max: 1,
            },
            capacitorWeight: {
                min: 0,
                max: 1,
            },
            coreWeight: {
                min: 0,
                max: 1,
            },
        },
        'energy-converter': {
            energyConversion: {
                min: 0,
                max: 100,
            },
        },
        'reactor-cooling': {
            cooling: {
                min: 0,
                max: 1,
            },
        },
        'pump-a': {
            enabled: {min: 0, max: 1},
        },
        'pump-b': {
            enabled: {min: 0, max: 1},
        },
        'pump-c': {
            enabled: {min: 0, max: 1},
        },
    },
};
