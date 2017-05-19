export function clamp(value, min, max) {
    return Math.max(Math.min(value, max), min);
}

export function normalizedToRange(value, min, max) {
    return (value * (max - min)) + min;
}

export function rangeToNormalized(value, min, max) {
    return (value - min) / (max - min);
}
