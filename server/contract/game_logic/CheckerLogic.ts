import {Checker, Color} from "../models/figures/checker";
import {Queen} from "../models/figures/queen";
import {Board} from "../models/game_components/board";
import {Coordinates} from "../models/game_components/coordinates";
import { MoveResult } from "./MoveResult";


export class CheckerLogic {
    static getMoveResult(board: Board, from: Coordinates, to: Coordinates): MoveResult {
        const checker = board.getCell(from) as Checker;
        const toCell = board.getCell(to);
        if (from.getX() == to.getX() && from.getY() == to.getY()) {
            return MoveResult.MOVE_DONE;
        }
        if (!checker || toCell) {
            return MoveResult.ABORTED;
        }

        if (Math.abs(from.getX() - to.getX()) && Math.abs(from.getY() - to.getY())) {
            return MoveResult.ABORTED;
        }

        switch (checker.color) {
            case Color.BLACK:
                return this.getBlackMoveResult(board, from, to);
            case Color.WHITE:
                return this.getWhiteMoveResult(board, from, to);
            case Color.RED:
                return this.getRedMoveResult(board, from, to);
            case Color.GREEN:
                return this.getGreenMoveResult(board, from, to);
            default:
                return MoveResult.ABORTED;
        }
    }

    private static getBlackMoveResult(board: Board, from: Coordinates, to: Coordinates): MoveResult {
        const maxSize = board.getPosition().length - 1;
        if (from.getX() === to.getX()) {
            switch (to.getY() - from.getY()) {
                case 1:
                    return MoveResult.MOVE_DONE;
                case 2:
                case -2:
                    return this.getEatResult(board, from, to, to.getY() === maxSize);
                default:
                    return MoveResult.ABORTED;
            }
        } else if (from.getY() === to.getY()) {
            switch (to.getX() - from.getX()) {
                case 1:
                    return MoveResult.MOVE_DONE;
                case 2:
                case -2:
                    return this.getEatResult(board, from, to, to.getX() === maxSize);
                default:
                    return MoveResult.ABORTED;
            }
        }
        return MoveResult.ABORTED;
    }

    private static getWhiteMoveResult(board: Board, from: Coordinates, to: Coordinates): MoveResult {
        if (from.getX() === to.getX()) {
            switch (to.getY() - from.getY()) {
                case -1:
                    return MoveResult.MOVE_DONE;
                case 2:
                case -2:
                    return this.getEatResult(board, from, to, to.getY() === 0);
                default:
                    return MoveResult.ABORTED;
            }
        } else if (from.getY() === to.getY()) {
            switch (to.getX() - from.getX()) {
                case 1:
                    return MoveResult.MOVE_DONE;
                case 2:
                case -2:
                    return this.getEatResult(board, from, to, to.getX() === board.getPosition().length - 1);
                default:
                    return MoveResult.ABORTED;
            }
        }
        return MoveResult.ABORTED;
    }

    private static getRedMoveResult(board: Board, from: Coordinates, to: Coordinates): MoveResult {
        if (from.getX() === to.getX()) {
            switch (to.getY() - from.getY()) {
                case -1:
                    return MoveResult.MOVE_DONE;
                case 2:
                case -2:
                    return this.getEatResult(board, from, to, to.getY() === 0);
                default:
                    return MoveResult.ABORTED;
            }
        } else if (from.getY() === to.getY()) {
            switch (to.getX() - from.getX()) {
                case -1:
                    return MoveResult.MOVE_DONE;
                case 2:
                case -2:
                    return this.getEatResult(board, from, to, to.getY() === 0);
                default:
                    return MoveResult.ABORTED;
            }
        }
        return MoveResult.ABORTED;
    }

    private static getGreenMoveResult(board: Board, from: Coordinates, to: Coordinates): MoveResult {
        if (from.getX() === to.getX()) {
            switch (to.getY() - from.getY()) {
                case 1:
                    return MoveResult.MOVE_DONE;
                case 2:
                case -2:
                    return this.getEatResult(board, from, to, to.getY() === board.getPosition().length - 1);
                default:
                    return MoveResult.ABORTED;
            }
        } else if (from.getY() === to.getY()) {
            switch (to.getX() - from.getX()) {
                case -1:
                    return MoveResult.MOVE_DONE;
                case 2:
                case -2:
                    return this.getEatResult(board, from, to, to.getX() === 0);
                default:
                    return MoveResult.ABORTED;
            }
        }
        return MoveResult.ABORTED;
    }

    private static canEat(board: Board, from: Coordinates, to: Coordinates): boolean {
        if (board.getCell(to)) {
            return false;
        }
        const checker = board.getCell(from);
        if (from.getX() === to.getX()) {
            switch (to.getY() - from.getY()) {
                case 2:
                case -2:
                    return board.getCell(
                            new Coordinates(from.getX(), (to.getY() + from.getY()) / 2))?.color
                        !== board.getCell(from)?.color;
                default:
                    return false;
            }
        } else if (from.getY() === to.getY()) {
            switch (to.getX() - from.getX()) {
                case 2:
                case -2:
                    return board.getCell(
                            new Coordinates((from.getX() + to.getX()) / 2, from.getY()))?.color
                        !== board.getCell(from)?.color;
                default:
                    return false;
            }
        }

        return false;
    }

    private static canMoveAgain(board: Board, from: Coordinates): boolean {
        const maxX = board.getPosition().length - 1;
        const maxY = board.getPosition()[0].length - 1;
        let condition = false;
        if (from.getX() - 2 < 0) {
            condition = this.canEat(board, from, new Coordinates(from.getX() + 2, from.getY()));
            if (from.getY() - 2 < 0) {
                condition ||= this.canEat(board, from, new Coordinates(from.getX(), from.getY() + 2));
            } else if (from.getY() + 2 > maxY) {
                condition ||= this.canEat(board, from, new Coordinates(from.getX(), from.getY() - 2));
            } else {
                condition ||= this.canEat(board, from, new Coordinates(from.getX(), from.getY() + 2))
                    || this.canEat(board, from, new Coordinates(from.getX(), from.getY() - 2));
            }
        } else if (from.getX() + 2 > maxX) {
            condition = this.canEat(board, from, new Coordinates(from.getX() - 2, from.getY()));
            if (from.getY() - 2 < 0) {
                condition ||= this.canEat(board, from, new Coordinates(from.getX(), from.getY() + 2));
            } else if (from.getY() + 2 > maxY) {
                condition ||= this.canEat(board, from, new Coordinates(from.getX(), from.getY() - 2))
            } else {
                condition ||= this.canEat(board, from, new Coordinates(from.getX(), from.getY() + 2))
                    || this.canEat(board, from, new Coordinates(from.getX(), from.getY() - 2))
            }
        } else {
            condition = this.canEat(board, from, new Coordinates(from.getX() + 2, from.getY()))
                || this.canEat(board, from, new Coordinates(from.getX() - 2, from.getY()))
                || this.canEat(board, from, new Coordinates(from.getX(), from.getY() + 2))
                || this.canEat(board, from, new Coordinates(from.getX(), from.getY() - 2));
        }
        return condition;
    }

    private static getEatResult(board: Board, from: Coordinates, to: Coordinates, becameQueen: boolean): MoveResult {
        if (!this.canEat(board, from, to)) {
            return MoveResult.ABORTED;
        }
        const boardCopy = board.getCopy();
        boardCopy.updateCell(new Coordinates(
            (from.getX() + to.getX()) / 2,
            (from.getY() + to.getY()) / 2
        ), null);
        return becameQueen
            ? MoveResult.BECAME_QUEEN
            : this.canMoveAgain(boardCopy, to)
                ? MoveResult.MOVE_AGAIN
                : MoveResult.MOVE_DONE;
    }
}