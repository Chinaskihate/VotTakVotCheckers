import { BoardUI } from "./BoardUI";
import { CellColors } from "./Colors";
import { Figure } from "./figures/Figure";

export class  CellUI {
    readonly x: number;
    readonly y: number;
    readonly color: CellColors;
    figure: Figure | null;
    board: BoardUI;
    available: boolean;
    id: number;

    constructor(board: BoardUI, x: number, y: number, color: CellColors, figure: Figure | null) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.figure = figure;
        this.board = board;
        this.available = false;
        this.id = Math.random()
    }

    moveFigure(target: CellUI) {
        if(this.figure && this.figure?.canMove(target)) {
            this.figure.moveFigure(target);
            target.figure = this.figure;
            this.figure = null;
        }
    }
}