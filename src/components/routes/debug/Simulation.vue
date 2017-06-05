<template>
    <section>
        <section class="content">
            <p>
                Tick: {{ state.tick }}
            </p>

            <div class="state-machines">
                <state-machine v-for="stateMachine in display.stateMachines" :key="stateMachine.id"
                               :id="stateMachine.id" :state="state.stateMachines[stateMachine.id]"
                               :position="stateMachine.position"
                               @update="(property, value) => stateMachineChanged(stateMachine.id, property, value)">
                </state-machine>
            </div>
        </section>
    </section>
</template>

<style lang="less" scoped>
    .state-machines {
        position: relative;
    }
</style>

<script>
    import Simulation from 'resistopia-reactor-simulation';

    import {startUpdate, stopUpdate} from '../../../util/tween';

    import merge from 'deepmerge';
    import StateMachine from "./components/StateMachine";

    export default {
        components: {StateMachine},
        name: 'simulation',
        data() {
            const stateMachine = Simulation.Program.Prototype();

            return {
                stateMachine: stateMachine,
                state: Simulation.createInitialState(stateMachine),
                stateChanges: {},
                simulationIntervalId: null,
                display: {
                    stateMachines: [
                        {
                            id: 'storage-matter',
                            position: [0, 0],
                        },
                        {
                            id: 'storage-antimatter',
                            position: [1, 0],
                        },
                        {
                            id: 'reactor',
                            position: [0, 1],
                        },
                        {
                            id: 'distributor',
                            position: [0, 2],
                        },
                        {
                            id: 'reactor-cooling',
                            position: [2, 2],
                        },
                        {
                            id: 'core',
                            position: [0, 3],
                        },
                        {
                            id: 'base',
                            position: [1, 3],
                        },
                    ],
                },
            };
        },
        methods: {
            changeState(changes) {
                this.stateChanges = merge(this.stateChanges, changes);
            },
            stateMachineChanged(stateMachine, property, value) {
                this.changeState({[stateMachine]: {[property]: value}});
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
