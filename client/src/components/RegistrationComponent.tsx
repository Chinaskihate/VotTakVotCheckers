import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators, RootState } from '../store';
import { SocketClient } from '../utils/socketClient';

const RegistrationComponent = () => {
    const dispatch = useDispatch();

    const { depositMoney, withdrawMoney, bankrupt } = bindActionCreators(actionCreators, dispatch);
    const amount = useSelector((state: RootState) => state.bank);
    const client = new SocketClient();
    client.register(String(Math.random() % 100));

    return (
        <div>
            <h1>{amount }</h1>
            <button onClick={() => depositMoney(1000)}>Deposit</button>
            <button onClick={() => withdrawMoney(500)}>Withdraw</button>
            <button onClick={() => bankrupt()}>Bankrupt</button>
        </div>
    );
};

export default RegistrationComponent;