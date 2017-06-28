export default {
    methods: {
        changeProperty(stateMachine, property, value) {
            this.$emit('changeProperty', stateMachine, property, value);
        },
    },
};
