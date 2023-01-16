import {CellUI} from "../CellUI";
import {ColorUI} from "../Colors";
import {FigureUI, FigureNames} from "./FigureUI";
import blackLogo from '../../assets/checker-black.png';
import greenLogo from '../../assets/checker-green.png';
import redLogo from '../../assets/checker-red.png';
import whiteLogo from '../../assets/checker-white.png';
import {CheckerLogic} from '../../contract/game_logic/CheckerLogic';
import {MoveResult} from '../../contract/game_logic/MoveResult';
import {Board} from "../../contract/models/game_components/board";
import {Coordinates} from "../../contract/models/game_components/coordinates";

export class CheckerUI extends FigureUI {
    constructor(color: ColorUI, cell: CellUI) {
        super(color, cell);
        this.logo = color === ColorUI.BLACK
            ? blackLogo
            : (color === ColorUI.GREEN
                ? greenLogo
                : (color === ColorUI.RED
                    ? redLogo
                    : whiteLogo));
        this.name = FigureNames.CHECKER;
    }

    canMove(target: CellUI): boolean {
        if (!super.canMove(target)) {
            return false;
        }
        const position = this.cell.board.getPosition();
        const board = new Board(position);
        const moveResult = CheckerLogic.getMoveResult(
            board,
            new Coordinates(this.cell.x, this.cell.y),
            new Coordinates(target.x, target.y));
        switch (moveResult) {
            case MoveResult.ABORTED:
                return false;
            default:
                console.log('moveResult: ' + moveResult)
                return true;
        }
    }
}