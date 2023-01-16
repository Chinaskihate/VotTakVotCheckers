import {Checker, Color} from "../../contract/models/figures/checker";
import {Board} from "../../contract/models/game_components/board";

export class GameStatus {
    gameStarted: boolean;
    playerColor: Color | null;
    position: (Checker | null)[][] | null;
    currentMove: Color | null;

    constructor(gameStarted: boolean, playerColor: Color | null, position: (Checker | null)[][] | null, currentMove: Color | null) {
        this.gameStarted = gameStarted;
        this.playerColor = playerColor;
        this.position = position;
        this.currentMove = currentMove;
    }
}