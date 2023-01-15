import {Checker, Color} from "../figures/checker";
import { Coordinates } from "./coordinates";
import {MAX_SIZE} from './game';

export class Board {
    private position: (Checker | null)[][];

    public getPosition(): (Checker | null)[][] {
        return this.position;
    }

    public getCopy(): Board {
        return JSON.parse(JSON.stringify(this));
    }

    public getCell(coord: Coordinates) {
        return this.position[coord.getX()][coord.getY()];
    }

    public updateCell(coord: Coordinates, figure: Checker | null) {
        this.position[coord.getX()][coord.getY()] = figure;
    }

    constructor(data: any) {
        this.position = [];
        if (!data) {
            for (let i = 0; i < MAX_SIZE; i++) {
                this.position.push(new Array<Checker>(MAX_SIZE));
            }
            this.fillNormally();
        } else {
            for (let i = 0; i < data.length; i++) {
                this.position.push(new Array<Checker>(MAX_SIZE));
                for (let j = 0; j < data[0].length; j++) {
                    this.position[i].push(data[i][j] ? new Checker(data[i][j]) : null);
                }
            }
        }
    }

    public updatePosition(new_position: Checker[][]): void {
        const errMess = 'Invalid board length';
        if (new_position.length != MAX_SIZE) {
            throw new Error(errMess);
        }
        for (let i = 0; i < MAX_SIZE; i++) {
            if (new_position[i].length != MAX_SIZE) {
                throw new Error(errMess);
            }
        }
        for (let i = 0; i < MAX_SIZE; i++) {
            for (let j = 0; j < MAX_SIZE; j++) {
                this.position[i][j] = new_position[i][j];
            }
        }
    }

    private fillNormally() {
        this.position[0][0] = new Checker(Color.BLACK);
        this.position[0][1] = new Checker(Color.BLACK);
        this.position[0][2] = new Checker(Color.BLACK);
        this.position[1][0] = new Checker(Color.BLACK);
        this.position[2][0] = new Checker(Color.BLACK);
        this.position[1][1] = new Checker(Color.BLACK);

        this.position[5][5] = new Checker(Color.RED);
        this.position[5][4] = new Checker(Color.RED);
        this.position[4][5] = new Checker(Color.RED);
        this.position[4][4] = new Checker(Color.RED);
        this.position[3][5] = new Checker(Color.RED);
        this.position[5][3] = new Checker(Color.RED);

        this.position[0][3] = new Checker(Color.GREEN);
        this.position[0][4] = new Checker(Color.GREEN);
        this.position[0][5] = new Checker(Color.GREEN);
        this.position[1][4] = new Checker(Color.GREEN);
        this.position[1][5] = new Checker(Color.GREEN);
        this.position[2][5] = new Checker(Color.GREEN);

        this.position[3][0] = new Checker(Color.WHITE);
        this.position[4][0] = new Checker(Color.WHITE);
        this.position[5][0] = new Checker(Color.WHITE);
        this.position[4][1] = new Checker(Color.WHITE);
        this.position[5][1] = new Checker(Color.WHITE);
        this.position[5][2] = new Checker(Color.WHITE);
    }
}