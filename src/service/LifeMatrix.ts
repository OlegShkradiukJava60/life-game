import { getRandomMatrix } from "../utils/matrix";

export default class LifeMatrix {
    private _matrix: number[][];
    constructor(rows: number, columns: number) {
        this._matrix = getRandomMatrix(rows, columns, 0, 1);
    }
    get matrix() {
        return this._matrix
    }
    next(): number[][] {
        //TODO
        //implementation of game of life algorith
        this._matrix = getRandomMatrix(this._matrix.length, this._matrix[0].length, 0, 1);
        return this._matrix
    }
}