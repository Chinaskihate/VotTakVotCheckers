import {GameEvent} from "../gameEvent";
import {User} from "../../../server/game_components/user";
import {EventName} from "../eventName";

export enum GameResultStatus {
    ABORTED,
    ENDED
}

export class EndGameServerEvent extends GameEvent {
    eventName = EventName.END;
    gameID: string;
    status: GameResultStatus;
    winner: User;

    constructor(gameId: string, status: GameResultStatus, winner: User) {
        super();
        this.gameID = gameId;
        this.status = status;
        this.winner = winner;
    }
}