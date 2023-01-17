import { BoardUI } from "./BoardUI";
import { CellColors } from "./Colors";
import { FigureUI } from "./figures/FigureUI";

export class  CellUI {
    readonly x: number;
    readonly y: number;
    readonly color: CellColors;
    figure: FigureUI | null;
    board: BoardUI;
    available: boolean;
    id: number;

    constructor(board: BoardUI, x: number, y: number, color: CellColors, figure: FigureUI | null) {
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
            if (Math.abs(this.x - target.x) == 2) {
                this.board.getCell((this.x + target.x) / 2, this.y).figure = null;
            } else if (Math.abs(this.y - target.y) == 2) {
                this.board.getCell(this.x, (this.y + target.y) / 2).figure = null;
            }
            this.figure.moveFigure(target);
            target.figure = this.figure;
            this.figure = null;
            this.board.getCell(this.x, this.y).figure = null;
        }
    }
}