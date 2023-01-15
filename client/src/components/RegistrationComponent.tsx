import React, {FC, useEffect } from 'react';
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

    const { depositMoney, withdrawMoney, bankrupt } = bindActionCreators(actionCreators, dispatch);
    const amount = useSelector((state: RootState) => state.bank);

    socketClient.onStart((e: StartGameServerEvent) => {
        console.log('123');
        console.log(e);
        return;
    });

    const register = (amount: number) => {
        socketClient.register(JSON.stringify(amount));
    }

    return (
        <div>
            <h1>{amount }</h1>
            <button onClick={() => depositMoney(1000)}>Deposit</button>
            <button onClick={() => withdrawMoney(500)}>Withdraw</button>
            <button onClick={() => bankrupt()}>Bankrupt</button>
            <button onClick={() => register(amount)}>Register</button>
        </div>
    );
};

export default RegistrationComponent;