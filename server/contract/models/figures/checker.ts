export enum Color {
    BLACK,
    WHITE,
    GREEN,
    RED
}

export class Checker {
    color: Color;
    isQueen: boolean;

    public setIsQueen(isQueen: boolean) {
        this.isQueen = isQueen;
    }

    constructor(color: Color, isQueen: boolean) {
        this.color = color;
        this.isQueen = isQueen;
    }
}