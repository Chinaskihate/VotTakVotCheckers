import React, {FC, useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {Coordinates} from "../../contract/models/game_components/coordinates";
import {BoardUI} from "../../models/BoardUI";
import {CellUI} from "../../models/CellUI";
import {castContractColor, CellColors, compareColors} from "../../models/Colors";
import { Checker } from "../../models/figures/Checker";
import { Queen } from "../../models/figures/Queen";
import {RootState} from "../../store";
import CellComponent from "./CellComponent";

interface BoardProps {
    board: BoardUI;
    setBoard: (board: BoardUI) => void;
}

const BoardComponent: FC<BoardProps> = ({board, setBoard}) => {
    const [selectedSell, setSelectedSell] = useState<CellUI | null>(null);
    const gameStatus = useSelector((state: RootState) => state.game);
    const serverBoard = gameStatus.board;

    function click(cell: CellUI) {
        console.log(cell)
        if (selectedSell && selectedSell !== cell && selectedSell.figure?.canMove(cell)) {
            selectedSell.moveFigure(cell);
            setSelectedSell(null);
        } else if (cell.figure && compareColors(cell!.figure!.color, gameStatus!.playerColor!) && gameStatus!.playerColor === gameStatus!.currentMove) {
            setSelectedSell(cell);
        }
    }

    useEffect(() => {
        highlightCells()
    }, [selectedSell]);

    function highlightCells() {
        for (let i = 0; i < serverBoard!.getPosition().length; i++) {
            for (let j = 0; j < serverBoard!.getPosition()[0].length; j++) {
                const serverCell = serverBoard!.getCell(new Coordinates(i, j));
                board.cells[j][i] = new CellUI(board, j, i, CellColors.BLACK, null);
                if (serverCell) {
                    if (serverCell!.isQueen) {
                        board.cells[j][i].figure = new Queen(castContractColor(serverCell!.color!), board.cells[j][i]);
                    } else {
                        board.cells[j][i].figure = new Checker(castContractColor(serverCell!.color!), board.cells[j][i]);
                    }
                }
            }
        }
        board.highlightCells(selectedSell);
        updateBoard()
    }

    function updateBoard() {
        const newBoard = board.getCopyBoard()
        setBoard(newBoard)
    }

    return (
        <div className="board">
            {board.cells.map((row, index) =>
                <React.Fragment key={index}>
                    {row.map(cell =>
                        <CellComponent
                            click={click}
                            cell={cell}
                            key={cell.id}
                            selected={cell.x === selectedSell?.x && cell.y === selectedSell?.y}/>
                    )}
                </React.Fragment>
            )}
        </div>
    );
};

export default BoardComponent;