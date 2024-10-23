
export const getPercent = (max: number, min: number, value: number) => parseFloat(((Math.min(max, Math.max(min, value)) - min) * 100 / (max - min)).toFixed(2));

export const getValue = (max: number, min: number, value: number) => Math.round((value / 100) * (max - min) + min);

export const getNearestNumber = (value: number, options: number[]): number => options.reduce((prev, curr) => Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev, options[0]);