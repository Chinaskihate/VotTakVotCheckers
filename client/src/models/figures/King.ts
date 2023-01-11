import {Cell} from "../Cell";
import {Colors} from "../Colors";
import {Figure, FigureNames} from "./Figure";
import blackLogo from '../../assets/checker-black.png';
import greenLogo from '../../assets/checker-green.png';
import redLogo from '../../assets/checker-red.png';
import whiteLogo from '../../assets/checker-white.png';

export class King extends Figure {
    constructor(color: Colors, cell: Cell) {
        super(color, cell);
        this.logo = color === Colors.BLACK
            ? blackLogo
            : (color === Colors.GREEN
                ? greenLogo
                : (color === Colors.RED
                    ? redLogo
                    : whiteLogo));
        this.name = FigureNames.KING;
    }

    canMove(target: Cell): boolean {
        if(!super.canMove(target)) {
            return false;
        }
        return true;
    }
}