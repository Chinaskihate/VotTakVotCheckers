import {Checker, Color} from "../models/figures/checker";
import {Board} from "../models/game_components/board";
import {Coordinates} from "../models/game_components/coordinates";
import {MoveResult} from "./MoveResult";


export class CheckerLogic {
    static move(board: Board, from: Coordinates, to: Coordinates): Board {
        const result = board.getCopy();
        const cell = board.getCell(from);
        if (from.getX() == to.getX()) {
            const cond = from.getY() < to.getY();
            for (let i = from.getY(); cond ? i < to.getY() : i > to.getY(); cond ? i++ : i--) {
                result.updateCell(new Coordinates(from.getX(), i), null)
            }
        } else if (from.getY() == to.getY()) {
            const cond = from.getX() < to.getX();
            for (let i = from.getX(); cond ? i < to.getX() : i > to.getX(); cond ? i++ : i--) {
                result.updateCell(new Coordinates(i, from.getY()), null)
            }
        }
        result.updateCell(new Coordinates(to.getX(), to.getY()), cell);
        return result;
    }

    static getMoveResult(board: Board, from: Coordinates, to: Coordinates): MoveResult {
        const checker = board.getCell(from) as Checker;
        const toCell = board.getCell(to);
        if (from.getX() == to.getX() && from.getY() == to.getY()) {
            return MoveResult.ABORTED;
        }
        if (!checker || toCell || checker.isQueen) {
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
                case 1:
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
        console.log('from green move result')
        console.log(from)
        console.log(to)
        if (from.getX() === to.getX()) {
            switch (to.getY() - from.getY()) {
                case -1:
                    return MoveResult.MOVE_DONE;
                case 2:
                case -2:
                    return this.getEatResult(board, from, to, to.getY() === board.getPosition().length - 1);
                default:
                    return MoveResult.ABORTED;
            }
        } else if (from.getY() === to.getY()) {
            switch (to.getX() - from.getX()) {
                case 1:
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
                    const middleCell = board.getCell(new Coordinates(from.getX(), (to.getY() + from.getY()) / 2));
                    if (from.getX() == 1 && from.getY() == 0) {
                        console.log('---------------')
                        console.log(middleCell)
                    }
                    return middleCell ? middleCell.color !== board.getCell(from)?.color : false;
                default:
                    return false;
            }
        } else if (from.getY() === to.getY()) {
            switch (to.getX() - from.getX()) {
                case 2:
                case -2:
                    const middleCell = board.getCell(new Coordinates((from.getX() + to.getX()) / 2, from.getY()));
                    return middleCell ? middleCell.color !== board.getCell(from)?.color : false;
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
                || this.canEat(board, from, new Coordinates(from.getX() - 2, from.getY()));
            if (from.getY() - 2 < 0) {
                condition ||= this.canEat(board, from, new Coordinates(from.getX(), from.getY() + 2))
            } else if (from.getY() + 2 > maxY) {
                condition ||= this.canEat(board, from, new Coordinates(from.getX(), from.getY() - 2))
            } else {
                condition ||= this.canEat(board, from, new Coordinates(from.getX(), from.getY() + 2))
                    || this.canEat(board, from, new Coordinates(from.getX(), from.getY() - 2))
            }
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