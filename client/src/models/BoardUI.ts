import { Checker } from "../contract/models/figures/checker";
import { Board } from "../contract/models/game_components/board";
import {CellUI} from "./CellUI";
import {castUIColor, CellColors, ColorUI} from "./Colors";
import { CheckerUI } from "./figures/CheckerUI";
import { QueenUI } from "./figures/QueenUI";

export class BoardUI {
    cells: CellUI[][] = []

    public initCells() {
        for (let i = 0; i < 6; i++) {
            const row: CellUI[] = []
            for (let j = 0; j < 6; j++) {
                row.push(new CellUI(this, i, j, CellColors.BLACK, null)) // black
            }
            this.cells.push(row);
        }
    }

    public getCopyBoard(): BoardUI {
        const newBoard = new BoardUI();
        newBoard.cells = this.cells;
        return newBoard;
    }

    public getPosition(): (Checker | null)[][] {
        const result = [];
        for (let i = 0; i < this.cells.length; i++) {
            result.push(new Array<Checker | null>());
            for (let j = 0; j < this.cells[0].length; j++) {
                const cell = this.getCell(i, j);
                result[i].push(cell.figure ? new Checker(castUIColor(cell.figure!.color), cell.figure! instanceof QueenUI) : null);
            }
        }
        return result;
    }
    
    public highlightCells(selectedCell: CellUI | null) {
        for (let i = 0; i < this.cells.length; i++) {
            const row = this.cells[i];
            for (let j = 0; j < row.length; j++) {
                const target = row[j];
                target.available = !!selectedCell?.figure?.canMove(target);
                if(target.available) {
                    console.log('available: ' + target.x + ' ' + target.y)
                }
            }
        }
    }

    public getCell(x: number, y: number): CellUI {
        return this.cells[x][y];
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