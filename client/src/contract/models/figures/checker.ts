export enum Color {
    BLACK,
    WHITE,
    GREEN,
    RED
}

export class Checker {
    color: Color | null;
    isQueen: boolean;

    constructor(data?: any, color?: Color, isQueen?: boolean) {
        if (color) {
            this.color = color;
            this.isQueen = isQueen!;
        } else {
            this.color = data.color;
            this.isQueen = data.isQueen;
        }
    }
}