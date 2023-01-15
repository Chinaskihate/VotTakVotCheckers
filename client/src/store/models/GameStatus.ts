import { Color } from "../../contract/models/figures/checker";

export class GameStatus {
    gameStarted: boolean;
    playerColor: Color | null;

    constructor(gameStarted: boolean, playerColor: Color | null) {
        this.gameStarted = gameStarted;
        this.playerColor = playerColor;
    }
}