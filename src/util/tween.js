import TWEEN from 'tween.js';

const INTERVAL = 100;

let interval = null;

export function startUpdate() {
    interval = setInterval(() => TWEEN.update(), INTERVAL);
}

export function stopUpdate() {
    if (interval) {
        clearInterval(interval);
        interval = null;
    }
}
