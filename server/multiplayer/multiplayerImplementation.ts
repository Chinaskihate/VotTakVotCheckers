import {Multiplayer} from "./multiplayer";
import {PlayersQueue} from "../utils/playersQueue";
import {ColorPicker} from "../utils/colorPicker";
import {DefaultEventsMap} from "socket.io/dist/typed-events";
import {Server} from "socket.io";
import {Game} from "../contract/models/game_components/game";
import {User} from "../contract/models/game_components/user";
import {Board} from "../contract/models/game_components/board";
import {EventName} from "../contract/events/eventName";
import {StartGameServerEvent} from "../contract/events/serverToClient/startGameServerEvent";
import {EndGameServerEvent, GameResultStatus} from "../contract/events/serverToClient/endGameServerEvent";
import {Checker} from "../contract/models/figures/checker";

export class MultiplayerImplementation implements Multiplayer {
    readonly io: Server<DefaultEventsMap,DefaultEventsMap>;
    game: Game;
    playersQueue: PlayersQueue;

    constructor(io: Server<DefaultEventsMap,DefaultEventsMap>) {
        this.io = io;
        this.playersQueue = new PlayersQueue();
    }

    getAllPlayers(): PlayersQueue {
        return this.playersQueue;
    }

    getGame(): Game {
        return this.game;
    }

    startGame() {
        console.log('trying to start game')
        if (this.game == null) {
            let players: User[] = [];
            for (let i = 0; i < 4; i++) {
                players.push(this.playersQueue.dequeue());
            }
            let gameId: string = Math.random().toString(5);
            let colorPicker: ColorPicker = new ColorPicker();
            players.map((player) => {
                player.setGameId(gameId);
                player.setColor(colorPicker.pickRandomColor());
                this.io.of('/multiplayer4').sockets.get(player.getSocketId()).join(gameId);
            })

            this.game = new Game(players, 1, new Board(), gameId);

            this.io.to(gameId).emit(EventName.START, new StartGameServerEvent(
                this.game.getBoard().getPosition(), this.game.getCurrentMove())
            );
        }
        console.log('game started: ' + this.game);
    }

    addNewPlayer(name: string, socketId: string): void {
        this.playersQueue.enqueue(new User(name, socketId));
        if (this.playersQueue.length > 3) {
            if (this.game == null) {
                this.startGame();
            }
        }
        console.log('player ' + name + ' ' + socketId + ' added');
    }

    private checkEnd(): void {
        if (this.game.checkWin()) {
            this.io.emit(EventName.END, new EndGameServerEvent(
                this.game.getGameId(),
                GameResultStatus.ENDED,
                this.getGame().findWinner())
            );
        }
        console.log('game ended');

        if (this.playersQueue.length > 3) {
            this.startGame();
        }
    }

    doMove(board: Checker[][]): void {
        this.getGame().doMove(board);
        this.checkEnd();
    }
}