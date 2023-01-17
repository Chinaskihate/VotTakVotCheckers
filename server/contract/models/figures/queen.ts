import {Checker, Color} from "./checker";

export class Queen extends Checker {
    constructor(color: Color) {
        super(color, true);
    }
}