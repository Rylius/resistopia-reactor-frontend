<template>
    <section>
        <section class="content">
            <p>
                <span style="display: inline-block; width: 100px;">
                    Tick: {{ state.tick }}
                </span>
                <span style="margin-right: 20px;">
                    <button @click="stopSimulation" :disabled="!simulationRunning">Pause</button>
                    <button @click="startSimulation" :disabled="simulationRunning">Resume</button>
                    <button @click="stepSimulation">Step</button>
                </span>
                <span style="margin-right: 20px;">
                    <button @click="resetSimulation">Reset</button>
                </span>
            </p>

            <div class="state-machines">
                <state-machine v-for="stateMachine in display.stateMachines" :key="stateMachine.id"
                               :id="stateMachine.id" :state="state.stateMachines[stateMachine.id]"
                               :definition="program.stateMachines.find(machine => machine.id === stateMachine.id)"
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

    import StateMachine from './components/StateMachine';

    const updateSimulation = function () {
        // Copy previous state and apply changes
        const state = merge({}, this.state);
        state.stateMachines = merge(state.stateMachines, this.stateChanges);
        this.stateChanges = {};

        this.state = Simulation.update(this.program, state);
    };

    export default {
        name: 'simulation',
        data() {
            const program = Simulation.Program.Prototype;

            return {
                program,
                state: Simulation.createInitialState(program),
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
            stopSimulation() {
                if (this.simulationIntervalId) {
                    clearInterval(this.simulationIntervalId);
                    this.simulationIntervalId = null;
                }
            },
            startSimulation() {
                this.simulationIntervalId = setInterval(updateSimulation.bind(this), 1000);
            },
            stepSimulation() {
                updateSimulation.bind(this).apply();
            },
            resetSimulation() {
                const wasRunning = this.simulationRunning;

                this.stopSimulation();

                this.state = Simulation.createInitialState(this.program);
                this.stateChanges = {};

                if (wasRunning) {
                    this.startSimulation();
                }
            },
        },
        computed: {
            simulationRunning() {
                return !!this.simulationIntervalId;
            },
        },
        mounted() {
            startUpdate();
            this.startSimulation();
        },
        beforeDestroy() {
            this.stopSimulation();
            stopUpdate();
        },
        components: {
            StateMachine,
        },
    };
</script>
