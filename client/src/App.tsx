import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css"
import BoardComponent from "./components/game/BoardComponent";
import HeaderComponent from "./components/HeaderComponent";
import RegistrationComponent from "./components/RegistrationComponent";
import {BoardUI} from "./models/BoardUI";
import { RootState } from "./store";
import {SocketClient} from "./utils/socketClient";

export const socketClient = new SocketClient();

const App = () => {
    const dispatch = useDispatch();
    const gameStatus = useSelector((state: RootState) => state.game);
    const [board, setBoard] = useState(new BoardUI());

    useEffect(() => {
        restart();
    }, []);

    function restart() {
        const newBoard = new BoardUI();
        newBoard.initCells();
        //newBoard.addFigures();
        setBoard(newBoard);
    }

    return (
        <div>
            <HeaderComponent/>
            <div className="app">
                {gameStatus.gameStarted
                    ? <BoardComponent
                        board={board}
                        setBoard={setBoard}/>
                    : <RegistrationComponent
                        socketClient={socketClient}/>}
            </div>
        </div>
    );
};

export default App;