const RETRY_DELAY_MS = 10000;

export default {
    data() {
        return {
            websocket: null,
            websocketListeners: {},
        };
    },
    methods: {
        websocketOpen() {
            return this.websocket && this.websocket.readyState === WebSocket.OPEN;
        },
        onBackendWebsocketOpen() {
        },
        onBackendWebsocketError(event) {
            console.error(`Failed to connect to backend websocket at ${event.target.url}, retrying in ${Math.round(RETRY_DELAY_MS / 100) / 10} seconds`);

            this.closeBackendWebsocket();
            setTimeout(() => this.openBackendWebsocket(), RETRY_DELAY_MS);
        },
        onBackendWebsocketMessage(message) {
            // TODO
            const data = JSON.parse(message.data);
            console.log(data);

            if (this.websocketListeners[data.type]) {
                this.websocketListeners[data.type].forEach(listener => listener(data.data));
            }
        },
        onBackendWebsocketClose(event) {
            console.log(`Backend websocket closed (clean: ${event.wasClean})`);

            this.websocket = null;
        },
        closeBackendWebsocket() {
            if (this.websocket && this.websocket.readyState !== WebSocket.CLOSING && this.websocket.readyState !== WebSocket.CLOSED) {
                this.websocket.close();
            }

            this.websocket = null;
        },
        openBackendWebsocket() {
            const url = process.env.RESISTOPIA_BACKEND_WS;

            console.log(`Attempting to open backend websocket connection to ${url}...`);

            this.websocket = new WebSocket(url, 'json');
            this.websocket.onopen = this.onBackendWebsocketOpen;
            this.websocket.onerror = this.onBackendWebsocketError;
            this.websocket.onmessage = this.onBackendWebsocketMessage;
            this.websocket.onclose = this.onBackendWebsocketClose;
        },
        registerBackendWebsocketListener(messageType, listener) {
            if (this.websocketListeners[messageType]) {
                this.websocketListeners[messageType].push(listener);
            } else {
                this.websocketListeners[messageType] = [listener];
            }
        },
    },
    mounted() {
        this.openBackendWebsocket();
    },
    beforeDestroy() {
        this.closeBackendWebsocket();
    },
};
