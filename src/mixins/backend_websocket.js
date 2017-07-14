export default {
    data() {
        return {
            websocket: null,
        };
    },
    methods: {
        onBackendWebsocketError(event) {
            // TODO
            console.log('websocket connection error:', event);
        },
        onBackendWebsocketMessage(message) {
            // TODO
            const data = JSON.parse(message.data);
            console.log(data);

            switch (data.type) {
                case 'state':
                    this.simulation.state.stateMachines = data.data;
                    break;
                default:
                    console.error(`Unknown websocket message type "${data.type}"`);
                    return;
            }
        },
        onBackendWebsocketClose(event) {
            // TODO
            console.log('websocket closed:', event);
            this.websocket = null;
        },
    },
    mounted() {
        this.websocket = new WebSocket(process.env.RESISTOPIA_BACKEND_WS, 'json');
        this.websocket.onerror = this.onBackendWebsocketError;
        this.websocket.onmessage = this.onBackendWebsocketMessage;
        this.websocket.onclose = this.onBackendWebsocketClose;
    },
    beforeDestroy() {
        if (this.websocket) {
            this.websocket.close();
            this.websocket = null;
        }
    },
};
