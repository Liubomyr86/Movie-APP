export function randomInteger(max: number) {
    const rand = 0.5 + Math.random() * max;
    return Math.round(rand);
}
