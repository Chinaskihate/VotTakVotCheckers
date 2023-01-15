import {User} from "../contract/models/game_components/user";

export class PlayersQueue {
    private players: User[] = [];
    private head: number;
    private tail: number;

    constructor() {
        this.head = null;
        this.tail = null;
    }

    enqueue(element): void {
        this.players[this.tail] = element;
        this.tail++;
    }

    dequeue(): User {
        const item = this.players[this.head];
        delete this.players[this.head];
        this.head++;
        return item;
    }

    removeBySocketId(socketId: string): boolean {
        if (this.players.length == 0) {
            return false;
        }
        this.players.slice(this.players.findIndex(x => x.getSocketId() == socketId), 1);
        return true;
    }

    peek(): User {
        return this.players[this.head];
    }

    get length(): number {
        return this.tail - this.head;
    }

    get isEmpty(): boolean {
        return this.length === 0;
    }

    public contains(socketId: string): boolean {
        this.players.map(player => {
            if (player.getSocketId() == socketId) {
                return true;
            }
        });
        return false;
    }
}