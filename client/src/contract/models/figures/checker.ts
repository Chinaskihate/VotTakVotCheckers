export enum Color {
    BLACK,
    WHITE,
    GREEN,
    RED
}

export class Checker {
    color: Color | null;
    isQueen: boolean;

    constructor(color: Color, isQueen: boolean) {
        this.color = color;
        this.isQueen = isQueen!;
    }

    static getFromObject(data?: any) {
        return new Checker(data.color, data.isQueen);
    }
}