import { randomNumber } from "./random";

export function getRandomMatrix(rows: number, columns: number, min: number, max: number): number[][] {
    return Array.from({length: rows}, 
        () => Array.from({length: columns}, () => randomNumber(min,max)))
}