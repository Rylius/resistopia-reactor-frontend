export default {
    props: {
        state: {
            required: true,
        },
        globalState: {
            required: true,
        },
    },
    methods: {
        changeProperty(stateMachine, property, value) {
            this.$emit('changeProperty', stateMachine, property, value);
        },
    },
};
