import {CellUI} from "./CellUI";
import {CellColors, ColorUI} from "./Colors";
import { Checker } from "./figures/Checker";

export class BoardUI {
    cells: CellUI[][] = []

    public initCells() {
        for (let i = 0; i < 6; i++) {
            const row: CellUI[] = []
            for (let j = 0; j < 6; j++) {
                row.push(new CellUI(this, j, i, CellColors.BLACK, null)) // black
            }
            this.cells.push(row);
        }
    }

    public getCopyBoard(): BoardUI {
        const newBoard = new BoardUI();
        newBoard.cells = this.cells;
        return newBoard;
    }
    
    public highlightCells(selectedCell: CellUI | null) {
        for (let i = 0; i < this.cells.length; i++) {
            const row = this.cells[i];
            for (let j = 0; j < row.length; j++) {
                const target = row[j];
                target.available = !!selectedCell?.figure?.canMove(target);
            }
        }
    }

    public getCell(x: number, y: number) {
        return this.cells[y][x];
    }

    // public addFigures() {
    //     this.addCheckers();
    // }
    //
    // private addCheckers() {
    //     new Checker(ColorUI.BLACK, this.getCell(0, 0));
    //     new Checker(ColorUI.BLACK, this.getCell(1, 0));
    //     new Checker(ColorUI.BLACK, this.getCell(0, 1));
    //     new Checker(ColorUI.BLACK, this.getCell(1, 1));
    //     new Checker(ColorUI.BLACK, this.getCell(2, 0));
    //     new Checker(ColorUI.BLACK, this.getCell(0, 2));
    // }
}