import {PlayersQueue} from "../utils/playersQueue";
import {Server} from "socket.io";
import {DefaultEventsMap} from "socket.io/dist/typed-events";
import {Game} from "../contract/models/game_components/game";

export interface Multiplayer {
    readonly io: Server<DefaultEventsMap,DefaultEventsMap>;
    playersQueue: PlayersQueue;
    game: Game;

    getAllPlayers(): PlayersQueue;
    addNewPlayer(name: string, socketId:string): void;
    getGame(): Game;
    startGame(): void
}