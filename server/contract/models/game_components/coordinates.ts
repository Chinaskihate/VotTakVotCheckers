import {MAX_SIZE} from './game';

export class Coordinates {
    private x: number;
    private y: number;

    constructor(x: number, y: number) {
        if (x >= MAX_SIZE || y >= MAX_SIZE || x < 0 || y < 0) {
            throw new Error('Invalid coords');
        }
        this.x = x;
        this.y = y;
    }

    public getX(): number {
        return this.x;
    }

    public getY(): number {
        return this.y;
    }
}