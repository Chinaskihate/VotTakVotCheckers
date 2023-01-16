import React, {FC, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {bindActionCreators} from "redux";
import {Coordinates} from "../../contract/models/game_components/coordinates";
import {BoardUI} from "../../models/BoardUI";
import {CellUI} from "../../models/CellUI";
import {castContractColor, CellColors, compareColors} from "../../models/Colors";
import {CheckerUI} from "../../models/figures/CheckerUI";
import {QueenUI} from "../../models/figures/QueenUI";
import {actionCreators, RootState} from "../../store";
import CellComponent from "./CellComponent";
import {socketClient} from "../../App";

interface BoardProps {
    board: BoardUI;
    setBoard: (board: BoardUI) => void;
}

const BoardComponent: FC<BoardProps> = ({board, setBoard}) => {
    const [selectedSell, setSelectedSell] = useState<CellUI | null>(null);
    const dispatch = useDispatch();
    const {moveGame} = bindActionCreators(actionCreators, dispatch);
    const gameStatus = useSelector((state: RootState) => state.game);
    const serverPosition = gameStatus.position;

    function click(cell: CellUI) {
        if (selectedSell && selectedSell !== cell && selectedSell.figure?.canMove(cell)) {
            selectedSell.moveFigure(cell);
            setSelectedSell(null);
            const copy = board.getCopyBoard()
            console.log(copy)
            socketClient.move(board.getPosition(), (gameStatus.currentMove! + 1) % 4)
            //moveGame(gameStatus.playerColor!, board.getPosition(), (gameStatus.currentMove! + 1) % 4)
        } else if (cell.figure && compareColors(cell!.figure!.color, gameStatus!.playerColor!) && gameStatus!.playerColor === gameStatus!.currentMove) {
            console.log('there')
            setSelectedSell(cell);
        }
    }

    useEffect(() => {
        highlightCells()
    }, [selectedSell]);

    function highlightCells() {
        for (let i = 0; i < serverPosition!.length; i++) {
            for (let j = 0; j < serverPosition![0].length; j++) {
                const serverCell = serverPosition![i][j];
                board.cells[j][i] = new CellUI(board, j, i, CellColors.BLACK, null);
                if (serverCell) {
                    if (serverCell!.isQueen) {
                        board.cells[j][i].figure = new QueenUI(castContractColor(serverCell!.color!), board.cells[j][i]);
                    } else {
                        board.cells[j][i].figure = new CheckerUI(castContractColor(serverCell!.color!), board.cells[j][i]);
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