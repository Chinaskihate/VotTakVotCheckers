import React, {FC, useEffect, useState} from "react";
import {Board} from "../models/Board";
import {Cell} from "../models/Cell";
import CellComponent from "./CellComponent";

interface BoardProps {
    board: Board;
    setBoard: (board: Board) => void;
}

const BoardComponent: FC<BoardProps> = ({board, setBoard}) => {
    const [selectedSell, setSelectedSell] = useState<Cell | null>(null);

    function click(cell: Cell) {
        if (selectedSell && selectedSell !== cell && selectedSell.figure?.canMove(cell)) {
             selectedSell.moveFigure(cell);
             setSelectedSell(null);
        } else {
            setSelectedSell(cell);
        }
    }

    useEffect(() => {
        highlightCells()
    }, [selectedSell]);

    function highlightCells() {
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