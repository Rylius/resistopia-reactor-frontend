const RETRY_DELAY_MS = 10000;

export default {
    data() {
        return {
            websocket: null,
            websocketListeners: {},
            websocketReconnectTimeoutId: null,
        };
    },
    methods: {
        websocketOpen() {
            return this.websocket && this.websocket.readyState === WebSocket.OPEN;
        },
        onBackendWebsocketOpen() {
            console.log('Backend websocket connection established');
        },
        onBackendWebsocketError(event) {
            console.error(`Failed to connect to backend websocket at ${event.target.url}, retrying in ${Math.round(RETRY_DELAY_MS / 100) / 10} seconds`);

            this.closeBackendWebsocket();
            if (!this.websocketReconnectTimeoutId) {
                this.websocketReconnectTimeoutId = setTimeout(() => this.openBackendWebsocket(), RETRY_DELAY_MS);
            }
        },
        onBackendWebsocketMessage(message) {
            // Attempt to parse message
            let data;
            try {
                data = JSON.parse(message.data);
            } catch (err) {
                console.error('Failed to parse backend message:', message, err);
                return;
            }

            // Find listeners for this event type and fire them
            if (this.websocketListeners[data.type]) {
                this.websocketListeners[data.type].forEach((listener, i) => {
                    try {
                        listener(data.data);
                    } catch (err) {
                        console.error(`Event '${data.type}', listener ${i}:`, err);
                    }
                });
            }
        },
        onBackendWebsocketClose(event) {
            console.log(`Backend websocket closed (clean: ${event.wasClean})`);

            if (!event.wasClean && !this.websocketReconnectTimeoutId) {
                this.websocketReconnectTimeoutId = setTimeout(() => this.openBackendWebsocket(), RETRY_DELAY_MS);
            }

            this.websocket = null;
        },
        closeBackendWebsocket() {
            if (this.websocket && this.websocket.readyState !== WebSocket.CLOSING && this.websocket.readyState !== WebSocket.CLOSED) {
                this.websocket.close();
            }

            this.websocket = null;
        },
        openBackendWebsocket() {
            if (this.websocketReconnectTimeoutId) {
                clearTimeout(this.websocketReconnectTimeoutId);
            }
            this.websocketReconnectTimeoutId = null;

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
