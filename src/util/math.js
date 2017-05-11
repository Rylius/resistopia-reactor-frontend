export function clamp(value, min, max) {
    return Math.max(Math.min(value, max), min);
}

export function percentToRange(percent, min, max) {
    return ((percent / 100) * (max - min)) + min;
}

export function rangeToPercent(pixel, min, max) {
    return ((pixel - min) / (max - min)) * 100;
}
