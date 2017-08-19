import merge from 'deepmerge';

import {rangeToNormalized} from './util/math';

export const StatusType = {
    Normal: 'normal',
    Cold: 'cold',
    Warning: 'warning',
    Critical: 'critical',
};

const propertyDefaults = {
    stateMachine: null,
    property: null,
    value: null,
    normalizedValue: null,
    editable: false,
    min: null,
    max: null,
    status: null,
    statusRanges: [],
};

const energyToPowerFactor = 1;

const config = {
    'storage-matter': {
        matter: {
            statusRanges: [
                // Less than one hour
                {
                    from: -Infinity,
                    to: (state) => 3600 * state['storage-matter']['releasedMatterPerTick'],
                    id: StatusType.Critical,
                    color: 'red',
                },
                // Less than 12 hours
                {
                    from: (state) => 3600 * state['storage-matter']['releasedMatterPerTick'],
                    to: (state) => 43200 * state['storage-matter']['releasedMatterPerTick'],
                    id: StatusType.Warning,
                    color: 'orange',
                },
                // More than 12 hours
                {
                    from: (state) => 43200 * state['storage-matter']['releasedMatterPerTick'],
                    to: Infinity,
                    id: StatusType.Normal,
                    color: 'green',
                },
            ],
        },
        releasedMatterPerTick: {
            editable: true,
            min: 0,
            max: 300,
        },
    },
    'storage-antimatter': {
        antimatter: {
            statusRanges: [
                // Less than one hour
                {
                    from: -Infinity,
                    to: (state) => 3600 * state['storage-antimatter']['releasedAntimatterPerTick'],
                    id: StatusType.Critical,
                    color: 'red',
                },
                // Less than 12 hours
                {
                    from: (state) => 3600 * state['storage-antimatter']['releasedAntimatterPerTick'],
                    to: (state) => 43200 * state['storage-antimatter']['releasedAntimatterPerTick'],
                    id: StatusType.Warning,
                    color: 'orange',
                },
                // More than 12 hours
                {
                    from: (state) => 43200 * state['storage-antimatter']['releasedAntimatterPerTick'],
                    to: Infinity,
                    id: StatusType.Normal,
                    color: 'green',
                },
            ],
        },
        releasedAntimatterPerTick: {
            editable: true,
            min: 0,
            max: 300,
        },
    },
    reactor: {
        shutdownRemaining: {
            statusRanges: [
                {from: -Infinity, to: 0, id: StatusType.Normal, color: 'green'},
                {from: 1, to: Infinity, id: StatusType.Critical, color: 'red'},
            ],
        },
        heat: {
            statusRanges: [
                {from: -Infinity, to: 1000, id: StatusType.Cold, color: 'blue',},
                {from: 1000, to: 2000, id: StatusType.Normal, color: 'green'},
                {from: 2000, to: 4000, id: StatusType.Warning, color: 'orange'},
                {from: 4000, to: Infinity, id: StatusType.Critical, color: 'red'},
            ],
        },
    },
    'energy-distributor': {
        unusedEnergy: {
            statusRanges: [
                {from: -Infinity, to: 0, id: StatusType.Normal, color: 'green'},
                // reactor natural cooling * reactor energyToHeatFactor = 50 * 1.1 = 55
                {from: 0, to: 55, id: StatusType.Warning, color: 'orange'},
                {from: 55, to: Infinity, id: StatusType.Critical, color: 'red'},
            ],
        },
        converterWeight: {
            editable: true,
            min: 0,
            max: 1,
        },
        capacitorWeight: {
            editable: true,
            min: 0,
            max: 1,
        },
        coreWeight: {
            editable: true,
            min: 0,
            max: 1,
        },
    },
    'energy-capacitor': {
        energy: {
            statusRanges: [
                // capacity: 270000
                // core: 150/tick
                // => 30 minutes core runtime if full
                {from: -Infinity, to: 90000, id: StatusType.Critical, color: 'red'},
                {from: 90000, to: 180000, id: StatusType.Warning, color: 'orange'},
                {from: 180000, to: Infinity, id: StatusType.Normal, color: 'green'},
            ],
        },
    },
    'energy-converter': {
        energyConversion: {
            editable: true,
            min: 0,
            max: 100,
        },
        energy: {
            statusRanges: [
                {from: -Infinity, to: 0, id: StatusType.Critical, color: 'red',},
                {
                    from: 0,
                    to: (state) => state['energy-converter']['energyConversion'] * energyToPowerFactor * 0.95,
                    id: StatusType.Warning,
                    color: 'orange',
                },
                {
                    from: (state) => state['energy-converter']['energyConversion'] * energyToPowerFactor * 0.95,
                    to: (state) => state['energy-converter']['energyConversion'] * energyToPowerFactor,
                    id: StatusType.Normal,
                    color: 'green',
                },
            ],
        },
    },
    'power-distributor': {
        wastedPower: {
            statusRanges: [
                {from: -Infinity, to: 0, id: StatusType.Normal, color: 'green'},
                {from: 0, to: Infinity, id: StatusType.Warning, color: 'orange'},
            ],
        },
        heat: {
            statusRanges: [
                {from: -Infinity, to: 10, id: StatusType.Cold, color: 'blue',},
                {from: 10, to: 30, id: StatusType.Normal, color: 'green'},
                {from: 30, to: 150, id: StatusType.Warning, color: 'orange'},
                {from: 150, to: Infinity, id: StatusType.Critical, color: 'red'},
            ],
        },
        shutdownRemaining: {
            statusRanges: [
                {from: -Infinity, to: 0, id: StatusType.Normal, color: 'green'},
                {from: 1, to: Infinity, id: StatusType.Critical, color: 'red'},
            ],
        },
    },
    'power-capacitor': {
    },
    'reactor-cooling': {
        cooling: {
            editable: true,
            min: 0,
            max: 1.5,
        },
        powerConsumed: {
            value: (config, state) => state['reactor-cooling']['powerRequired'] * state['reactor-cooling']['powerSatisfaction'],
        },
        powerSatisfaction: {
            min: 0,
            max: 1,
            statusRanges: [
                {from: -Infinity, to: 0.75, id: StatusType.Critical, color: 'red'},
                {from: 0.75, to: 0.9, id: StatusType.Warning, color: 'orange'},
                {from: 0.9, to: Infinity, id: StatusType.Normal, color: 'green'},
            ],
        },
        waterSatisfaction: {
            min: 0,
            max: 1,
            statusRanges: [
                {from: -Infinity, to: 0.75, id: StatusType.Critical, color: 'red'},
                {from: 0.75, to: 0.9, id: StatusType.Warning, color: 'orange'},
                {from: 0.9, to: Infinity, id: StatusType.Normal, color: 'green'},
            ],
        },
    },
    core: {
        energySatisfaction: {
            min: 0,
            max: 1,
            statusRanges: [
                {from: -Infinity, to: 0.25, id: StatusType.Critical, color: 'red'},
                {from: 0.25, to: 0.75, id: StatusType.Warning, color: 'orange'},
                {from: 0.75, to: Infinity, id: StatusType.Normal, color: 'green'},
            ],
        },
    },
    base: {
        powerConsumed: {
            value: (config, state) => state['base']['powerRequired'] * state['base']['powerSatisfaction'],
        },
        powerSatisfaction: {
            min: 0,
            max: 1,
            statusRanges: [
                {from: -Infinity, to: 0.5, id: StatusType.Critical, color: 'red'},
                {from: 0.5, to: 0.9, id: StatusType.Warning, color: 'orange'},
                {from: 0.9, to: Infinity, id: StatusType.Normal, color: 'green'},
            ],
        },
        drinkingWaterConsumed: {
            value: (config, state) => state['base']['drinkingWaterRequired'] * state['base']['drinkingWaterSatisfaction'],
        },
        drinkingWaterSatisfaction: {
            min: 0,
            max: 1,
            statusRanges: [
                {from: -Infinity, to: 0.5, id: StatusType.Critical, color: 'red'},
                {from: 0.5, to: 0.9, id: StatusType.Warning, color: 'orange'},
                {from: 0.9, to: Infinity, id: StatusType.Normal, color: 'green'},
            ],
        },
    },
    'pump-a': createPumpConfig('pump-a'),
    'pump-b': createPumpConfig('pump-b'),
    'pump-c': createPumpConfig('pump-c'),
    'water-tank': {
        water: {
            statusRanges: [
                {from: -Infinity, to: 5000, id: StatusType.Critical, color: 'red',},
                {from: 5000, to: 25000, id: StatusType.Warning, color: 'orange',},
                {from: 25000, to: Infinity, id: StatusType.Normal, color: 'green',},
            ],
        },
    },
    'water-treatment': {
        resourceCleaner: {
            statusRanges: [
                {from: -Infinity, to: 3600, id: StatusType.Critical, color: 'red'}, // Less than one hour
                {from: 3600, to: 43200, id: StatusType.Warning, color: 'orange'}, // Less than 12 hours
                {from: 43200, to: Infinity, id: StatusType.Normal, color: 'green'},
            ],
        },
        resourceChlorine: {
            statusRanges: [
                {from: -Infinity, to: 3600, id: StatusType.Critical, color: 'red'}, // Less than one hour
                {from: 3600, to: 43200, id: StatusType.Warning, color: 'orange'}, // Less than 12 hours
                {from: 43200, to: Infinity, id: StatusType.Normal, color: 'green'},
            ],
        },
        resourceMinerals: {
            statusRanges: [
                {from: -Infinity, to: 3600, id: StatusType.Critical, color: 'red'}, // Less than one hour
                {from: 3600, to: 43200, id: StatusType.Warning, color: 'orange'}, // Less than 12 hours
                {from: 43200, to: Infinity, id: StatusType.Normal, color: 'green'},
            ],
        },
        powerSatisfaction: {
            min: 0,
            max: 1,
            statusRanges: [
                {from: -Infinity, to: 0.5, id: StatusType.Critical, color: 'red'},
                {from: 0.5, to: 0.9, id: StatusType.Warning, color: 'orange'},
                {from: 0.9, to: Infinity, id: StatusType.Normal, color: 'green'},
            ],
        },
        drinkingWater: {
            min: 0,
            max: 1000,
            statusRanges: [
                {from: -Infinity, to: 250, id: StatusType.Critical, color: 'red'}, // Less than 15 minutes
                {from: 250, to: 750, id: StatusType.Warning, color: 'orange'}, // Less than 45 minutes
                {from: 750, to: Infinity, id: StatusType.Normal, color: 'green'},
            ],
        },
    },
};

function createPumpConfig(id) {
    return {
        enabled: {
            editable: true,
            min: 0,
            max: 1,
        },
        filterHealth: {
            statusRanges: [
                {
                    from: -Infinity,
                    to: (state) => state[id]['filterMaxHealth'] * 0.25,
                    id: StatusType.Critical,
                    color: 'red',
                },
                {
                    from: (state) => state[id]['filterMaxHealth'] * 0.25,
                    to: (state) => state[id]['filterMaxHealth'] * 0.75,
                    id: StatusType.Warning,
                    color: 'orange',
                },
                {
                    from: (state) => state[id]['filterMaxHealth'] * 0.75,
                    to: Infinity,
                    id: StatusType.Normal,
                    color: 'green',
                },
            ],
        },
    };
}

function parseProperty(state, stateMachineConfig, stateMachineId, propertyName, propertyValue, simulationState) {
    const property = merge(propertyDefaults, stateMachineConfig[propertyName] || {});
    stateMachineConfig[propertyName] = property;

    property.stateMachine = stateMachineId;
    property.property = propertyName;

    if (typeof propertyValue === 'undefined') {
        if (typeof property.value === 'function') {
            property.value = property.value(property, simulationState);
        } else {
            throw new Error(`Invalid custom state machine property ${property.stateMachine}.${property.property}: ${property.value}`);
        }
    } else {
        property.value = propertyValue;
    }

    if (typeof property.min === 'number' && typeof property.max === 'number') {
        property.normalizedValue = rangeToNormalized(property.value, property.min, property.max);
    }

    if (property.statusRanges) {
        property.status = property.statusRanges.find(range => property.value >= range.from && property.value <= range.to) || {};
    }
}

function parseStateMachine(stateMachineId, state, stateMachineConfig, simulationState, simulationStateMachine) {
    Object.keys(stateMachineConfig).forEach(propertyName => {
        parseProperty(state, stateMachineConfig, stateMachineId, propertyName, simulationStateMachine[propertyName], simulationState);
    });
}

export function createFrontendState(simulationState) {
    const frontendState = merge({}, simulationState, {clone: true});
    frontendState.stateMachines = merge(frontendState.stateMachines, config, {clone: true});

    Object.keys(simulationState.stateMachines).forEach(stateMachineId => {
        if (!frontendState.stateMachines[stateMachineId]) {
            return;
        }

        parseStateMachine(
            stateMachineId,
            frontendState.stateMachines, frontendState.stateMachines[stateMachineId],
            simulationState.stateMachines, simulationState.stateMachines[stateMachineId],
        );
    });

    return frontendState;
}
