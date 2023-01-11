import {Multiplayer} from "./multiplayer";
import {PlayersQueue} from "../utils/playersQueue";
import {Game} from "../game_components/game";
import {User} from "../game_components/user";
import {ColorPicker} from "../utils/colorPicker";
import {Board} from "../game_components/board";
import {DefaultEventsMap} from "socket.io/dist/typed-events";
import {Server} from "socket.io";

export class MultiplayerImplementation implements Multiplayer {
    readonly io: Server<DefaultEventsMap,DefaultEventsMap>;
    game: Game;
    playersQueue: PlayersQueue;

    constructor(io: Server<DefaultEventsMap,DefaultEventsMap>) {
        this.io = io;
    }

    getAllPlayers(): PlayersQueue {
        return this.playersQueue;
    }

    getGame(): Game {
        return this.game;
    }

    startGame(): void {
        if (this.game == null) {
            let players: User[] = [];
            for (let i = 0; i < 4; i++) {
                players.push(this.playersQueue.dequeue());
            }

            let gameId: string = Math.random().toString(5);
            let colorPicker: ColorPicker = new ColorPicker();
            players.map(player => {
                player.setGameId(gameId);
                player.setColor(colorPicker.pickRandomColor());
                this.io.sockets.sockets.get(player.getSocketId()).join(gameId);
            })

            this.game = new Game(players, 1, new Board(), gameId);

            this.io.to(gameId).emit('game started');
        }
    }

    addNewPlayer(name: string, socketId: string): void {
        this.playersQueue.enqueue(new User(name, socketId));
        if (this.playersQueue.length > 3) {
            if (this.game == null) {
                this.startGame();
            }
        }
    }
}