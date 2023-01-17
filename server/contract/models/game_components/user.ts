import {Color} from "../figures/checker";

export class User {
    private readonly socketId: string;
    private gameId: string | null;
    private color: Color | null;
    private isLoser: boolean = false;
    private readonly name: string;

    public getName() {
        return this.name;
    }

    public getSocketId() {
        return this.socketId;
    }

    public getColor() {
        return this.color;
    }

    public setGameId(gameId: string): void {
        this.gameId = gameId;
    }

    public setColor(color: Color): void {
        this.color = color;
    }

    public getIsLooser() {
        return this.isLoser;
    }

    public setIsLooser(isLooser: boolean) {
        this.isLoser = isLooser;
    }

    constructor(name: string, socketId: string) {
        this.name = name;
        this.socketId = socketId;
    }
}