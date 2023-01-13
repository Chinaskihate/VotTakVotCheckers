import {Color} from "../figures/checker";

export class User {
    private readonly socketId: string;
    private gameId: string;
    private color: Color;
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

    constructor(name: string, socketId: string, gameId: string, color: Color) {
        this.name = name;
        this.socketId = socketId;
        this.gameId = gameId;
        this.color = color;
    }
}