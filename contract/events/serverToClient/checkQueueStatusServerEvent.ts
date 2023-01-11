import {GameEvent} from "../gameEvent";
import {EventName} from "../eventName";

export class CheckQueueStatusServerEvent extends GameEvent {
    eventName = EventName.CHECK;
    totalPlayersCountInQueue: number;
    playerNumberInQueue: number;

    constructor(totalPlayersCountInQueue: number, playerNumberInQueue: number) {
        super();
        this.totalPlayersCountInQueue = totalPlayersCountInQueue;
        this.playerNumberInQueue = playerNumberInQueue;
    }
}