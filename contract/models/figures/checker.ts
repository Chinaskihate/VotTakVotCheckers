export enum Color {
    BLACK,
    WHITE,
    GREEN,
    RED
}

export class Checker {
    color: Color;

    constructor(color: Color) {
        this.color = color;
    }
}