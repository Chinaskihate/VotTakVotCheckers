import {GameEvent} from "../gameEvent";
import {User} from "../../models/game_components/user";
import {EventName} from "../eventName";

export enum GameResultStatus {
    ABORTED,
    ENDED
}

export class EndGameServerEvent extends GameEvent {
    gameID: string;
    status: GameResultStatus;
    winner: User;

    constructor(gameId: string, status: GameResultStatus, winner: User) {
        super(EventName.END);
        this.gameID = gameId;
        this.status = status;
        this.winner = winner;
    }
}