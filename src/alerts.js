import {StatusType} from './simulation';

export const AlertTab = {
    Reactor: 'reactor',
    Power: 'power',
    Water: 'water',
    Storage: 'storage',
};

export const AlertType = {
    None: {
        id: StatusType.Normal,
        order: 0,
    },
    Warning: {
        id: StatusType.Warning,
        order: 1,
    },
    Critical: {
        id: StatusType.Critical,
        order: 2,
    },
};

export default function createAlerts() {
    return [

        // Reactor

        {
            tab: AlertTab.Reactor,
            id: 'reactor-temperature-low',
            type: AlertType.Warning,
            active(state) {
                return state['reactor'].heat.status.id === 'cold' && (state['storage-matter'].releasedMatterPerTick.value + state['storage-antimatter'].releasedAntimatterPerTick.value) > 0;
            },
        },
        {
            tab: AlertTab.Reactor,
            id: 'reactor-temperature-high',
            type: AlertType.Warning,
            active(state) {
                return state['reactor'].heat.status.id === StatusType.Warning;
            },
        },
        {
            tab: AlertTab.Reactor,
            id: 'reactor-temperature-critical',
            type: AlertType.Critical,
            active(state) {
                return state['reactor'].heat.status.id === StatusType.Critical;
            },
        },
        {
            tab: AlertTab.Reactor,
            id: 'reactor-shutdown',
            type: AlertType.Critical,
            active(state) {
                return state['reactor'].shutdownRemaining.status.id === StatusType.Critical;
            },
        },

        {
            tab: AlertTab.Reactor,
            id: 'reactor-cooling-disabled',
            type: AlertType.Warning,
            active(state) {
                return state['reactor'].heat.status.id !== 'cold' && state['reactor-cooling'].cooling.value <= 0;
            },
        },
        {
            tab: AlertTab.Reactor,
            id: 'reactor-cooling-missing-power',
            type: AlertType.Warning,
            active(state) {
                return state['reactor-cooling'].powerSatisfaction.status.id !== StatusType.Normal;
            },
        },
        {
            tab: AlertTab.Reactor,
            id: 'reactor-cooling-missing-water',
            type: AlertType.Warning,
            active(state) {
                return state['reactor-cooling'].waterSatisfaction.status.id !== StatusType.Normal;
            },
        },

        // Power

        {
            tab: AlertTab.Power,
            id: 'power-distributor-wasting-power',
            type: AlertType.Warning,
            active(state) {
                // Give a little bit of wiggle room
                return state['power-distributor'].wastedPower.value > 5;
            },
        },
        {
            tab: AlertTab.Power,
            id: 'power-distributor-temperature-high',
            type: AlertType.Warning,
            active(state) {
                return state['power-distributor'].heat.status.id === StatusType.Warning;
            },
        },
        {
            tab: AlertTab.Power,
            id: 'power-distributor-temperature-critical',
            type: AlertType.Critical,
            active(state) {
                return state['power-distributor'].heat.status.id === StatusType.Critical;
            },
        },
        {
            tab: AlertTab.Power,
            id: 'power-distributor-shutdown',
            type: AlertType.Critical,
            active(state) {
                return state['power-distributor'].shutdownRemaining.status.id === StatusType.Critical;
            },
        },

        {
            tab: AlertTab.Power,
            id: 'base-missing-power',
            type: AlertType.Warning,
            active(state) {
                return state['base'].powerSatisfaction.status.id === StatusType.Warning;
            },
        },
        {
            tab: AlertTab.Power,
            id: 'base-no-power',
            type: AlertType.Critical,
            active(state) {
                return state['base'].powerSatisfaction.status.id === StatusType.Critical;
            },
        },

        // Water

        {
            tab: AlertTab.Water,
            id: 'base-missing-drinking-water',
            type: AlertType.Warning,
            active(state) {
                return state['base'].drinkingWaterSatisfaction.status.id === StatusType.Warning;
            },
        },
        {
            tab: AlertTab.Water,
            id: 'base-no-drinking-water',
            type: AlertType.Critical,
            active(state) {
                return state['base'].drinkingWaterSatisfaction.status.id === StatusType.Critical;
            },
        },

        {
            tab: AlertTab.Water,
            id: 'water-tank-warning',
            type: AlertType.Warning,
            active(state) {
                return state['water-tank'].water.status.id === StatusType.Warning;
            },
        },
        {
            tab: AlertTab.Water,
            id: 'water-tank-critical',
            type: AlertType.Critical,
            active(state) {
                return state['water-tank'].water.status.id === StatusType.Critical;
            },
        },

        {
            tab: AlertTab.Water,
            id: 'water-treatment-missing-power',
            type: AlertType.Warning,
            active(state) {
                return state['water-treatment'].powerSatisfaction.status.id === StatusType.Warning;
            },
        },
        {
            tab: AlertTab.Water,
            id: 'water-treatment-no-power',
            type: AlertType.Critical,
            active(state) {
                return state['water-treatment'].powerSatisfaction.status.id === StatusType.Critical && state['water-treatment'].drinkingWater.status.id !== StatusType.Normal;
            },
        },
        {
            tab: AlertTab.Water,
            id: 'water-treatment-no-power',
            type: AlertType.Warning, // Downgrade to warning if enough drinking water is stored
            active(state) {
                return state['water-treatment'].powerSatisfaction.status.id === StatusType.Critical && state['water-treatment'].drinkingWater.status.id === StatusType.Normal;
            },
        },
        {
            tab: AlertTab.Water,
            id: 'water-treatment-no-stored-drinking-water',
            type: AlertType.Critical,
            active(state) {
                return state['water-treatment'].drinkingWater.status.id === StatusType.Critical;
            },
        },
        {
            tab: AlertTab.Water,
            id: 'water-treatment-little-stored-drinking-water',
            type: AlertType.Warning,
            active(state) {
                // Disable this warning if the unit is operating normally
                return state['water-treatment'].drinkingWater.status.id === StatusType.Warning && state['water-treatment'].powerSatisfaction.status === StatusType.Critical;
            },
        },
        {
            tab: AlertTab.Water,
            id: 'water-treatment-resource-cleaner-low',
            type: AlertType.Warning,
            active(state) {
                return state['water-treatment'].resourceCleaner.status.id === StatusType.Warning;
            },
        },
        {
            tab: AlertTab.Water,
            id: 'water-treatment-resource-cleaner-empty',
            type: AlertType.Critical,
            active(state) {
                return state['water-treatment'].resourceCleaner.status.id === StatusType.Critical;
            },
        },
        {
            tab: AlertTab.Water,
            id: 'water-treatment-resource-chlorine-low',
            type: AlertType.Warning,
            active(state) {
                return state['water-treatment'].resourceChlorine.status.id === StatusType.Warning;
            },
        },
        {
            tab: AlertTab.Water,
            id: 'water-treatment-resource-chlorine-empty',
            type: AlertType.Critical,
            active(state) {
                return state['water-treatment'].resourceChlorine.status.id === StatusType.Critical;
            },
        },
        {
            tab: AlertTab.Water,
            id: 'water-treatment-resource-minerals-low',
            type: AlertType.Warning,
            active(state) {
                return state['water-treatment'].resourceMinerals.status.id === StatusType.Warning;
            },
        },
        {
            tab: AlertTab.Water,
            id: 'water-treatment-resource-minerals-empty',
            type: AlertType.Critical,
            active(state) {
                return state['water-treatment'].resourceMinerals.status.id === StatusType.Critical;
            },
        },

        // TODO Pumps

    ];
};
