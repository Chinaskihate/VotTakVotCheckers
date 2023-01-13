import {Checker, Color} from "../figures/checker";

export class Board {
    private position: Checker[][];

    public getPosition(): Checker[][] {
        return this.position;
    }

    constructor() {
        this.position = [];
        for (let i = 0; i < 6; i++) {
            this.position.push(new Array<Checker>(6));
        }
        this.fillNormally();
    }

    public updatePosition(new_position: Checker[][]): void {
        for (let i = 0; i < 6; i++) {
            for (let j = 0; j < 6; j++) {
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