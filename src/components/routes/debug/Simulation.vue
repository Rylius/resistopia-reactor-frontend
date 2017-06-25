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

            <canvas id="connections-canvas" width="984" height="768"></canvas>

            <div class="state-machines">
                <state-machine v-for="stateMachine in display.stateMachines" :key="stateMachine.id"
                               :id="stateMachine.id" :state="state.stateMachines[stateMachine.id]"
                               :definition="program.stateMachines.find(machine => machine.id === stateMachine.id)"
                               :position="stateMachine.position" :targets="stateMachine.targets"
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

    #connections-canvas {
        position: absolute;
        z-index: 100;

        pointer-events: none;
        user-select: none;
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
                            targets: [{id: 'reactor', fromOffset: {y: 50}, toOffset: {y: -50}}],
                        },
                        {
                            id: 'storage-antimatter',
                            position: [1, 0],
                            targets: [{id: 'reactor', fromOffset: {y: 50}, toOffset: {x: 20, y: -50}}],
                        },
                        {
                            id: 'reactor',
                            position: [0, 1],
                            targets: [
                                {id: 'energy-distributor', fromOffset: {y: 60}, toOffset: {y: -90}},
                                {id: 'reactor-cooling', fromOffset: {x: 130}, toOffset: {x: -140}},
                            ],
                        },
                        {
                            id: 'energy-distributor',
                            position: [0, 2],
                            targets: [
                                {id: 'energy-converter', fromOffset: {x: 140, y: -45}, toOffset: {x: -140}},
                                {id: 'core', fromOffset: {y: 90}, toOffset: {y: -40}},
                                {id: 'energy-capacitor', fromOffset: {x: 120, y: 90}, toOffset: {y: -40}},
                            ],
                        },
                        {
                            id: 'energy-converter',
                            position: [1, 2],
                            targets: [
                                {id: 'distributor', fromOffset: {x: 140}, toOffset: {x: -140}},
                            ],
                        },
                        {
                            id: 'distributor',
                            position: [2, 2],
                            targets: [
                                {id: 'reactor-cooling', fromOffset: {y: -40}, toOffset: {y: 60}},
                                {id: 'base', fromOffset: {y: 40}, toOffset: {y: -40}},
                            ],
                        },
                        {
                            id: 'reactor-cooling',
                            position: [2, 1],
                        },
                        {
                            id: 'energy-capacitor',
                            position: [1, 3.5],
                            targets: [
                                {id: 'core', fromOffset: {x: -145}, toOffset: {x: 130}},
                            ],
                        },
                        {
                            id: 'core',
                            position: [0, 3.5],
                        },
                        {
                            id: 'base',
                            position: [2, 3],
                        },
                    ],
                },
                arrowsDrawn: false,
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
            drawArrows() {
                const canvas = document.getElementById('connections-canvas');
                const canvasBounds = canvas.getBoundingClientRect();
                const context = canvas.getContext('2d');

                function drawArrow(from, to) {
                    const head = 24;
                    const angle = Math.atan2(to.y - from.y, to.x - from.x);
                    context.moveTo(from.x, from.y);
                    context.lineTo(to.x, to.y);
                    context.moveTo(to.x, to.y);
                    context.lineTo(to.x - head * Math.cos(angle - Math.PI / 6), to.y - head * Math.sin(angle - Math.PI / 6));
                    context.moveTo(to.x, to.y);
                    context.lineTo(to.x - head * Math.cos(angle + Math.PI / 6), to.y - head * Math.sin(angle + Math.PI / 6));
                }

                function center(el) {
                    const bounds = el.getBoundingClientRect();
                    return {
                        x: (bounds.left + (bounds.width / 2)) - canvasBounds.left,
                        y: (bounds.top + (bounds.height / 2)) - canvasBounds.top
                    };
                }

                context.strokeStyle = 'rgba(0, 100, 230, 0.75)';
                context.lineWidth = 4;

                context.beginPath();
                this.display.stateMachines.forEach(display => {
                    if (!display.targets) {
                        return;
                    }

                    display.targets.forEach(target => {
                        const fromEl = document.getElementById(`state-machine-${display.id}`);
                        const toEl = document.getElementById(`state-machine-${target.id}`);

                        const from = center(fromEl);
                        const to = center(toEl);

                        if (target.fromOffset) {
                            from.x += target.fromOffset.x || 0;
                            from.y += target.fromOffset.y || 0;
                        }
                        if (target.toOffset) {
                            to.x += target.toOffset.x || 0;
                            to.y += target.toOffset.y || 0;
                        }

                        drawArrow(from, to);
                    });
                });
                context.stroke();

                this.arrowsDrawn = true;
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
        beforeUpdate() {
            if (!this.arrowsDrawn) {
                this.drawArrows();
            }
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
