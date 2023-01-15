import React, {useEffect, useState} from "react";
import "./App.css"
import BoardComponent from "./components/game/BoardComponent";
import RegistrationComponent from "./components/RegistrationComponent";
import {Board} from "./models/Board";
import { SocketClient } from "./utils/socketClient";

const socketClient = new SocketClient();

const App = () => {
    const [board, setBoard] = useState(new Board());

    useEffect(() => {
        restart();
    }, []);

    function restart() {
        const newBoard = new Board();
        newBoard.initCells();
        newBoard.addFigures();
        setBoard(newBoard);
    }

    return (
        <div className="app">
            <RegistrationComponent socketClient={socketClient}/>
            <BoardComponent
                board={board}
                setBoard={setBoard}/>
        </div>
    );
};

export default App;