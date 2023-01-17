import { Checker } from "../models/figures/checker";
import { Board } from "../models/game_components/board";
import { Coordinates } from "../models/game_components/coordinates";
import { MoveResult } from "./MoveResult";

export class QueenLogic {
    static getQueenMoveResult(board: Board, from: Coordinates, to: Coordinates): MoveResult {
        const queen = board.getCell(from) as Checker;
        const toCell = board.getCell(to);
        if (from.getX() == to.getX() && from.getY() == to.getY()) {
            return MoveResult.MOVE_DONE;
        }
        if (!queen || toCell || !queen.isQueen) {
            return MoveResult.ABORTED;
        }

        if (Math.abs(from.getX() - to.getX()) && Math.abs(from.getY() - to.getY())) {
            return MoveResult.ABORTED;
        }

        const currentMax = this.getNumberOfPossibleFiguresToEatByQueen(board, from);
        if (currentMax === 0) {
            const isUp = from.getY() < to.getY();
            const isRight = from.getX() < to.getY();
            for (let i = from.getX(); isRight ? i <= to.getX() : i >= to.getX() ; isRight ? i++: i--) {
                for (let j = from.getY(); isUp ? j <= to.getY() : j >= to.getY() ; isUp ? j++: j--) {
                    if (board.getCell(new Coordinates(i, j))) {
                        return MoveResult.ABORTED;
                    }
                }
            }
            return MoveResult.MOVE_DONE;
        } else if (this.canEat(board, from, to)) {
            if (this.getNumberOfPossibleFiguresToEatByQueen(board, to) + 1 === currentMax) {
                return MoveResult.MOVE_AGAIN;
            }
        }
        return MoveResult.ABORTED;
    }

    private static getNumberOfPossibleFiguresToEatByQueen(board: Board, from: Coordinates): number {
        let result = 0;
        // vertical
        for (let i = 0; i < board.getPosition().length; i++) {
            const boardCopy = board.getCopy();
            const to = new Coordinates(from.getX(), i);
            if (this.tryMoveOnEat(boardCopy, from, to)) {
                result += 1 + this.getNumberOfPossibleFiguresToEatByQueen(boardCopy, to);
            }
        }
        // horizontal
        for (let i = 0; i < board.getPosition().length; i++) {
            const boardCopy = board.getCopy();
            const to = new Coordinates(from.getX(), i);
            if (this.tryMoveOnEat(boardCopy, from, to)) {
                result++;
                this.getNumberOfPossibleFiguresToEatByQueen(boardCopy, to);
            }
        }
        return result;
    }

    private static tryMoveOnEat(board: Board, from: Coordinates, to: Coordinates): boolean {
        if (this.canEat(board, from, to)) {
            const queen = board.getCell(from) as Checker;
            if (from.getX() === to.getX()) {
                const isUp = from.getY() < to.getY();
                for (let i = from.getY(); isUp ? i <= to.getY() : i >= to.getY(); isUp ? i++ : i--) {
                    board.updateCell(new Coordinates(from.getX(), i), null);
                }
                board.updateCell(new Coordinates(from.getX(), to.getY()), queen);
                return true;
            } else if (from.getY() === to.getY()) {
                const isRight = from.getX() < to.getX();
                for (let i = from.getX(); isRight ? i <= to.getX() : i >= to.getX(); isRight ? i++ : i--) {
                    board.updateCell(new Coordinates(i, from.getY()), null);
                }
                board.updateCell(new Coordinates(to.getX(), from.getY()), queen);
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    private static canEat(board: Board, from: Coordinates, to: Coordinates): boolean {
        const queen = board.getCell(from) as Checker;
        if (board.getCell(to) || !queen) {
            return false;
        }
        if (from.getX() !== to.getX() && from.getY() !== to.getY()) {
            return false;
        }
        const figuresInRoad = new Array<Checker>();
        if (from.getX() === to.getX()) {
            if (Math.abs(from.getY() - to.getY()) == 1) {
                return false;
            }
            const isUp = from.getY() < to.getY();
            for (let i = from.getY() + (isUp ? 1 : -1); isUp ? i <= to.getY() : i >= to.getY(); isUp ? i++ : i--) {
                const figure = board.getCell(new Coordinates(from.getX(), i)) as Checker;
                if (figure) {
                    figuresInRoad.push(figure);
                }
            }
        } else if (from.getY() === to.getY()) {
            if (Math.abs(from.getX() - to.getX()) == 1) {
                return false;
            }
            const isRight = from.getX() < to.getX();
            for (let i = from.getY() + (isRight ? 1 : -1); isRight ? i <= to.getY() : i >= to.getY(); isRight ? i++ : i--) {
                const figure = board.getCell(new Coordinates(i, from.getY())) as Checker;
                if (figure) {
                    figuresInRoad.push(figure);
                }
            }
        }
        return figuresInRoad.length === 1
            ? figuresInRoad[0].color !== board.getCell(from)?.color
            : false;
    }
}