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
import { MoveServerEvent } from "../../contract/events/serverToClient/moveServerEvent";
import { Board } from "../../contract/models/game_components/board";

interface BoardProps {
    board: BoardUI;
    setBoard: (board: BoardUI) => void;
}

const BoardComponent: FC<BoardProps> = ({board, setBoard}) => {
    const [selectedSell, setSelectedSell] = useState<CellUI | null>(null);
    const [foo, setFoo] = useState<boolean>(true);
    const dispatch = useDispatch();
    const {moveGame} = bindActionCreators(actionCreators, dispatch);
    const gameStatus = useSelector((state: RootState) => state.game);
    const isOnline = useSelector((state: RootState) => state.mode);
    const serverPosition = gameStatus.position;

    function click(cell: CellUI) {
        console.log('click: ' + cell.x + ' ' + cell.y)
        if (selectedSell && selectedSell !== cell && selectedSell.figure?.canMove(cell)) {
            console.log('first condition')
            selectedSell.moveFigure(cell);
            setSelectedSell(null);
            if (isOnline) {
                socketClient.move(board.getPosition(), (gameStatus.currentMove! + 1) % 4)
            } else {
                moveGame(gameStatus.playerColor!, board.getPosition(), (gameStatus.currentMove! + 1) % 4)
            }
        } else if(selectedSell && selectedSell.x == cell.x && selectedSell.y == cell.y) {
            console.log('second condition')
            setSelectedSell(null)
        } else if (cell.figure
                    && compareColors(cell!.figure!.color, gameStatus!.currentMove!)
                    && (!isOnline || gameStatus!.playerColor === gameStatus!.currentMove)) {
            console.log('third condition')
            setSelectedSell(cell);
        }
    }

    socketClient.onMove((e: MoveServerEvent) => {
        moveGame(gameStatus.playerColor!, e.board, e.nextMoveColor);
        setBoard(BoardUI.getBoardUI(e.board))
    });

    useEffect(() => {
        highlightCells()
    }, [selectedSell]);

    function highlightCells() {
        for (let i = 0; i < serverPosition!.length; i++) {
            for (let j = 0; j < serverPosition![0].length; j++) {
                const serverCell = serverPosition![i][j];
                board.cells[i][j] = new CellUI(board, i, j, CellColors.BLACK, null);
                if (serverCell) {
                    if (serverCell!.isQueen) {
                        board.cells[i][j].figure = new QueenUI(castContractColor(serverCell!.color!), board.cells[i][j]);
                    } else {
                        board.cells[i][j].figure = new CheckerUI(castContractColor(serverCell!.color!), board.cells[i][j]);
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