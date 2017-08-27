import TWEEN from 'tween.js';

const INTERVAL = 100;

let interval = null;

export function startUpdate(interval = INTERVAL) {
    interval = setInterval(() => TWEEN.update(), interval);
}

export function stopUpdate() {
    if (interval) {
        clearInterval(interval);
        interval = null;
    }
}
