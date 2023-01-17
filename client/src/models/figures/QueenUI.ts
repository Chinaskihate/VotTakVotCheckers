import {CellUI} from "../CellUI";
import {ColorUI} from "../Colors";
import {FigureUI, FigureNames} from "./FigureUI";
import blackLogo from '../../assets/checker-black.png';
import greenLogo from '../../assets/checker-green.png';
import redLogo from '../../assets/checker-red.png';
import whiteLogo from '../../assets/checker-white.png';
import { MoveResult } from "../../contract/game_logic/MoveResult";
import { Board } from "../../contract/models/game_components/board";
import { QueenLogic } from "../../contract/game_logic/QueenLogic";
import { Coordinates } from "../../contract/models/game_components/coordinates";

export class QueenUI extends FigureUI {
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

    canMove(target: CellUI): MoveResult {
        const position = this.cell.board.getPosition();
        const board = new Board(position);
        return  QueenLogic.getQueenMoveResult(
            board,
            new Coordinates(this.cell.x, this.cell.y),
            new Coordinates(target.x, target.y));
    }
}