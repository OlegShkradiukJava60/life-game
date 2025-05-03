import { getRandomMatrix } from "../utils/matrix";

export default class LifeMatrix {
    private _matrix: number[][];

    constructor(rows: number, columns: number) {
        this._matrix = getRandomMatrix(rows, columns, 0, 1);
    }

    get matrix() {
        return this._matrix;
    }

    next(): number[][] {
        const rows = this._matrix.length;
        const columns = this._matrix[0].length;
        const nextGeneration = new Array(rows);

        for (let i = 0; i < rows; i++) {
            nextGeneration[i] = new Array(columns);
            for (let j = 0; j < columns; j++) {
                const liveNeighbors = this.countLiveNeighbors(i, j);
                nextGeneration[i][j] = this.getNextCellState(this._matrix[i][j], liveNeighbors);
            }
        }

        this._matrix = nextGeneration;
        return this._matrix;
    }

    private countLiveNeighbors(row: number, col: number): number {
        let liveNeighbors = 0;

        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                if (i === 0 && j === 0) continue;

                const neighborRow = row + i;
                const neighborCol = col + j;

                liveNeighbors += this._matrix[neighborRow]?.[neighborCol] ? 1 : 0;
            }
        }

        return liveNeighbors;
    }

    private getNextCellState(current: number, liveNeighbors: number): number {
        if (current === 1) {
            return liveNeighbors < 2 || liveNeighbors > 3 ? 0 : 1;
        } else {
            return liveNeighbors === 3 ? 1 : 0;
        }
    }
}
