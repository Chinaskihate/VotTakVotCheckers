import { ColorUI } from "../Colors";
import logo from '../../assets/checker-black.png';
import { CellUI } from "../CellUI";

export enum FigureNames {
    FIGURE = 'Figure',
    CHECKER = 'Checker',
    KING = 'King'
}

export class FigureUI {
    color: ColorUI;
    logo: typeof logo | null;
    cell: CellUI;
    name: FigureNames;
    id: number;
    
    constructor(color: ColorUI, cell: CellUI) {
        this.color = color;
        this.cell = cell;
        this.cell.figure = this;
        this.logo = null;
        this.name = FigureNames.FIGURE;
        this.id = Math.random();
    }

    canMove(target: CellUI) : boolean {
        if(target.figure?.color == this.color) {
            return false;
        }
        return true;
    }

    moveFigure(target: CellUI) {}
}