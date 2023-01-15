import {Cell} from "./Cell";
import {CellColors, Colors} from "./Colors";
import { Checker } from "./figures/Checker";

export class Board {
    cells: Cell[][] = []

    public initCells() {
        for (let i = 0; i < 6; i++) {
            const row: Cell[] = []
            for (let j = 0; j < 6; j++) {
                row.push(new Cell(this, j, i, CellColors.BLACK, null)) // black
            }
            this.cells.push(row);
        }
    }

    public getCopyBoard(): Board {
        const newBoard = new Board();
        newBoard.cells = this.cells;
        return newBoard;
    }
    
    public highlightCells(selectedCell: Cell | null) {
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

    public addFigures() {
        this.addCheckers();
    }

    private addCheckers() {
        new Checker(Colors.BLACK, this.getCell(0, 0));
        new Checker(Colors.BLACK, this.getCell(1, 0));
        new Checker(Colors.BLACK, this.getCell(0, 1));
        new Checker(Colors.BLACK, this.getCell(1, 1));
        new Checker(Colors.BLACK, this.getCell(2, 0));
        new Checker(Colors.BLACK, this.getCell(0, 2));

        new Checker(Colors.RED, this.getCell(0, 5));
        new Checker(Colors.RED, this.getCell(1, 5));
        new Checker(Colors.RED, this.getCell(1, 4));
        new Checker(Colors.RED, this.getCell(0, 4));
        new Checker(Colors.RED, this.getCell(0, 3));
        new Checker(Colors.RED, this.getCell(2, 5));

        new Checker(Colors.GREEN, this.getCell(5, 0));
        new Checker(Colors.GREEN, this.getCell(5, 1));
        new Checker(Colors.GREEN, this.getCell(4, 0));
        new Checker(Colors.GREEN, this.getCell(3, 0));
        new Checker(Colors.GREEN, this.getCell(4, 1));
        new Checker(Colors.GREEN, this.getCell(5, 2));

        new Checker(Colors.WHITE, this.getCell(5, 5));
        new Checker(Colors.WHITE, this.getCell(4, 5));
        new Checker(Colors.WHITE, this.getCell(5, 4));
        new Checker(Colors.WHITE, this.getCell(4, 4));
        new Checker(Colors.WHITE, this.getCell(5, 3));
        new Checker(Colors.WHITE, this.getCell(3, 5));
    }
}