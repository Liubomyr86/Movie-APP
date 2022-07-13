const randomInteger = (max: number): number => {
    const rand = 0.5 + Math.random() * max;
    return Math.round(rand);
};

export { randomInteger };
