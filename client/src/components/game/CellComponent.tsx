import React, {FC} from 'react';
import {CellUI} from "../../models/CellUI";

interface CellProps {
    cell: CellUI;
    selected: boolean;
    click: (cell: CellUI) => void;
}

const CellComponent: FC<CellProps> = ({cell, selected, click}) => {
    return (
        <div
            className={['cell', selected ? "selected" : cell.color].join(' ')}
            onClick={() => click(cell)}
            style={{background: cell.available && cell.figure ? 'green' : ''}}>
            {cell.available && !cell.figure && <div className={"available"}/>}
            {cell.figure?.logo && <img src={cell.figure.logo} alt=''/>}
        </div>
    );
};

export default CellComponent;