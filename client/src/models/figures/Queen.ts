import {CellUI} from "../CellUI";
import {ColorUI} from "../Colors";
import {Figure, FigureNames} from "./Figure";
import blackLogo from '../../assets/checker-black.png';
import greenLogo from '../../assets/checker-green.png';
import redLogo from '../../assets/checker-red.png';
import whiteLogo from '../../assets/checker-white.png';

export class Queen extends Figure {
    constructor(color: ColorUI, cell: CellUI) {
        super(color, cell);
        this.logo = color === ColorUI.BLACK
            ? blackLogo
            : (color === ColorUI.GREEN
                ? greenLogo
                : (color === ColorUI.RED
                    ? redLogo
                    : whiteLogo));
        this.name = FigureNames.KING;
    }

    canMove(target: CellUI): boolean {
        if(!super.canMove(target)) {
            return false;
        }
        return true;
    }
}