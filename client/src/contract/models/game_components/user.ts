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

    constructor(data?: any, name?: string, socketId?: string, color?: Color | null, gameId?: string | null) {
        if (name) {
            this.name = name;
            this.socketId = socketId!;
            this.color = color!;
            this.gameId = gameId!;
        } else {
            this.name = data.name;
            this.socketId = data.socketId;
            this.color = data.color;
            this.gameId = data.gameId;
        }
    }
}