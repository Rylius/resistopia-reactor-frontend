<template>
    <section>
        <section class="content">
            <p>
                Tick: {{ state.tick }}
            </p>

            <p>
                {{ state.stateMachines }}
            </p>
        </section>
    </section>
</template>

<script>
    import Simulation from 'resistopia-reactor-simulation';

    import {startUpdate, stopUpdate} from '../../../util/tween';

    import merge from 'deepmerge';

    export default {
        name: 'simulation',
        data() {
            const stateMachine = Simulation.Program.Prototype();

            return {
                stateMachine: stateMachine,
                state: Simulation.createInitialState(stateMachine),
                stateChanges: {},
                simulationIntervalId: null,
            };
        },
        methods: {
            changeState(changes) {
                this.stateChanges = merge(this.stateChanges, changes);
            },
        },
        mounted() {
            this.simulationIntervalId = setInterval(() => {
                // Copy previous state and apply changes
                const state = merge({}, this.state);
                state.stateMachines = merge(state.stateMachines, this.stateChanges);
                this.stateChanges = {};

                this.state = Simulation.update(this.stateMachine, state);
            }, 1000);

            startUpdate();
        },
        beforeDestroy() {
            if (this.simulationIntervalId) {
                clearInterval(this.simulationIntervalId);
            }

            stopUpdate();
        },
    };
</script>
