import { Board } from "../../contract/models/game_components/board";
import { Colors } from "../../models/Colors";

export class GameStatus {
    board: Board | null;
    currentMove: Colors | null;

    constructor(board: Board | null, currentMove: Colors | null) {
        this.board = board;
        this.currentMove = currentMove;
    }
}