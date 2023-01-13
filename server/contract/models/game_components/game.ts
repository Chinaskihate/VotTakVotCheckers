import {Board} from "./board";
import {User} from "./user";
import {Checker, Color} from "../figures/checker";

export const MAX_SIZE = 6;

export class Game {
    private readonly gameId: string;
    private readonly players: User[];
    private readonly board: Board;
    private currentColor: number;
    private readonly colors: Color[] = [Color.BLACK, Color.WHITE, Color.RED, Color.GREEN];

    constructor(players: User[], firstMove: number, board: Board, gameId: string) {
        this.players = players;
        this.gameId = gameId;
        this.currentColor = firstMove;
        this.board = board;
    }

    public getPlayers(): User[] {
        return this.players;
    }

    public getCurrentMove(): Color {
        return this.colors[this.currentColor];
    }

    public getGameId(): string {
        return this.gameId;
    }

    public getBoard(): Board {
        return this.board;
    }

    public doMove(new_position: Checker[][]): void {
        this.board.updatePosition(new_position);
        this.switchCurrentColor();
    }

    private switchCurrentColor(): void {
        this.currentColor = (this.currentColor + 1) % 4;
    }
}