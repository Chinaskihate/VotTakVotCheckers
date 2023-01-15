import {Checker, Color} from "../../models/figures/checker";
import {GameEvent} from "../gameEvent";
import {EventName} from "../eventName";
import {User} from "../../models/game_components/user";

export class StartGameServerEvent extends GameEvent {
    board: (Checker | null)[][];
    startColor: Color;
    players: User[];

    constructor(board: (Checker | null)[][], startColor: Color, players: User[]) {
        super(EventName.START);
        this.board = board;
        this.startColor = startColor;
        this.players = players;
    }
}