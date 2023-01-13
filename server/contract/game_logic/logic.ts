import { Board } from "../models/game_components/board";
import { Coordinates } from "../models/game_components/coordinates";

export enum MoveResult {
    ABORTED,
    MOVE_AGAIN,
    MOVE_DONE
}

export class Logic {
    static getMoveResult(board: Board, from: Coordinates, to: Coordinates): MoveResult {
        const figure = board.getCell(from);
        const toCell = board.getCell(to);
        if (!figure || toCell) {
            return MoveResult.ABORTED;
        }

        if (Math.abs(from.getX() - to.getX()) > 0 && Math.abs(from.getY() - to.getY())) {
            return MoveResult.ABORTED;
        }

        return MoveResult.MOVE_DONE;
    }
}