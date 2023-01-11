import {PlayersQueue} from "../utils/playersQueue";
import {Game} from "../game_components/game";
import {Server} from "socket.io";
import {DefaultEventsMap} from "socket.io/dist/typed-events";

export interface Multiplayer {
    readonly io: Server<DefaultEventsMap,DefaultEventsMap>;
    playersQueue: PlayersQueue;
    game: Game;

    getAllPlayers(): PlayersQueue;
    addNewPlayer(name: string, socketId:string): void;
    getGame(): Game;
    startGame(): void
}