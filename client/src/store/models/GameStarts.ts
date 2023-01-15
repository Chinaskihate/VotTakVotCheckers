import { Color } from "../../contract/models/figures/checker";

export class GameStarts {
    gameStarted: boolean;
    playerColor: Color | null;

    constructor(gameStarted: boolean, playerColor: Color | null) {
        this.gameStarted = gameStarted;
        this.playerColor = playerColor;
    }
}