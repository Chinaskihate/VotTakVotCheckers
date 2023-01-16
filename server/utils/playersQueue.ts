import {User} from "../contract/models/game_components/user";

export class PlayersQueue {
    private players: User[] = [];
    private currCount: number;

    constructor() {
        this.currCount = 0;
    }

    enqueue(element): void {
        if (this.players.filter(x => x.getSocketId() == element.getSocketId()).length == 0) {
            this.players[this.currCount] = element;
            ++this.currCount;
        } else {
            console.log('player with this ID is already registered.');
        }
    }

    dequeue(): User {
        const item = this.players[this.currCount - 1];
        this.players.splice(this.currCount - 1, 1);
        --this.currCount;
        return item;
    }
c
    removeBySocketId(socketId: string): boolean {
        if (this.players.length == 0) {
            return false;
        }
        const idx = this.players.findIndex(x => x.getSocketId() == socketId);
        console.log('idx ' + idx);
        this.players.splice(idx, 1);
        console.log(this.players.length);
        --this.currCount;
        console.log('user with socketId = ' + socketId + ' was removed from queue')
        return true;
    }

    peek(): User {
        return this.players[this.currCount - 1];
    }

    get length(): number {
        return this.currCount;
    }

    get isEmpty(): boolean {
        return this.currCount === 0;
    }

    public contains(socketId: string): boolean {
        this.players.map(player => {
            if (player.getSocketId() == socketId) {
                return true;
            }
        });
        return false;
    }

    asArray(): User[] {
        return this.players;
    }
}