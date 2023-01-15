import { Color } from "../../contract/models/figures/checker";
import { Board } from "../../contract/models/game_components/board";

export class GameStatus {
    gameStarted: boolean;
    playerColor: Color | null;
    board: Board | null;
    currentMove: Color | null;

    constructor(gameStarted: boolean, playerColor: Color | null, board: Board | null, currentMove: Color | null) {
        this.gameStarted = gameStarted;
        this.playerColor = playerColor;
        this.board = board;
        this.currentMove = currentMove;
    }
}