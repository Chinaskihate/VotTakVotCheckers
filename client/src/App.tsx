import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css"
import BoardComponent from "./components/game/BoardComponent";
import HeaderComponent from "./components/HeaderComponent";
import RegistrationComponent from "./components/RegistrationComponent";
import {Board} from "./models/Board";
import { RootState } from "./store";
import {SocketClient} from "./utils/socketClient";

export const socketClient = new SocketClient();

const App = () => {
    const dispatch = useDispatch();
    const isGameStarted = useSelector((state: RootState) => state.game);
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
        <div>
            <HeaderComponent/>
            <div className="app">
                {isGameStarted
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