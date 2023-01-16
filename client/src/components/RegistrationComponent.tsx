import React, {FC, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {bindActionCreators} from 'redux';
import { EndGameServerEvent } from '../contract/events/serverToClient/endGameServerEvent';
import {StartGameServerEvent} from '../contract/events/serverToClient/startGameServerEvent';
import { Color } from '../contract/models/figures/checker';
import { Board } from '../contract/models/game_components/board';
import { User } from '../contract/models/game_components/user';
import {actionCreators, RootState} from '../store';
import {SocketClient} from '../utils/socketClient';

interface RegistrationProps {
    socketClient: SocketClient;
}

const RegistrationComponent: FC<RegistrationProps> = ({socketClient}) => {
    const dispatch = useDispatch();
    const [username, setUserName] = useState<string>('');
    const [isRegisterClicked, setRegisterClicked] = useState<boolean>(false);

    const {
        depositMoney,
        withdrawMoney,
        bankrupt,
        startGame,
        endGame,
        setUsername
    } = bindActionCreators(actionCreators, dispatch);

    const amount = useSelector((state: RootState) => state.bank);

    socketClient.onStart((e: StartGameServerEvent) => {
        const thisPlayer = (e.players.filter(p => p.getSocketId() == socketClient.getSocketId())[0]);
        startGame(thisPlayer.getColor()!, e.board, e.startColor);
        return;
    });

    socketClient.onEnd((e: EndGameServerEvent) => {
        endGame();
    })

    const register = () => {
        socketClient.register(username);
        setUsername(username);
        setRegisterClicked(true);
    }

    return (
        <div>
            <div className="registration-page">
                {/*<h1>{amount }</h1>*/}
                {/*<button onClick={() => depositMoney(1000)}>Deposit</button>*/}
                {/*<button onClick={() => withdrawMoney(500)}>Withdraw</button>*/}
                {/*<button onClick={() => bankrupt()}>Bankrupt</button>*/}
                <div className="registration">
                    <input
                        placeholder={'name'}
                        onChange={(event) => setUserName(event.target.value)}
                        disabled={isRegisterClicked}/>
                    <button onClick={() => register()}
                            disabled={isRegisterClicked}>Register
                    </button>
                </div>
                <div hidden={!isRegisterClicked} className={["wait", !isRegisterClicked ? "wait-hidden" : ""].join(' ')} >{username} Wait..</div>
            </div>
        </div>
    );
};

export default RegistrationComponent;