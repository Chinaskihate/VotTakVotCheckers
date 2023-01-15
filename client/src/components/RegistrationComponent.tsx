import React, {FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { StartGameServerEvent } from '../contract/events/serverToClient/startGameServerEvent';
import { actionCreators, RootState } from '../store';
import { SocketClient } from '../utils/socketClient';

interface RegistrationProps {
    socketClient: SocketClient;
}

const RegistrationComponent: FC<RegistrationProps> = ({socketClient}) => {
    const dispatch = useDispatch();
    const [username, setUserName] = useState<string>('');
    const [isRegisterClicked, setRegisterClicked] = useState<boolean>(false);

    const { depositMoney, withdrawMoney, bankrupt, startGame, endGame, setUsername } = bindActionCreators(actionCreators, dispatch);

    const amount = useSelector((state: RootState) => state.bank);

    socketClient.onStart((e: StartGameServerEvent) => {
        console.log(e);
        startGame();
        return;
    });

    const register = () => {
        socketClient.register(username);
        setUsername(username);
        setRegisterClicked(true);
    }

    return (
        <div>
            <h1>{amount }</h1>
            <button onClick={() => depositMoney(1000)}>Deposit</button>
            <button onClick={() => withdrawMoney(500)}>Withdraw</button>
            <button onClick={() => bankrupt()}>Bankrupt</button>
            <h1>
                <input placeholder={'name'} onChange={(event) => setUserName(event.target.value)}/>
            </h1>
            <button onClick={() => register()}>Register</button>
        </div>
    );
};

export default RegistrationComponent;