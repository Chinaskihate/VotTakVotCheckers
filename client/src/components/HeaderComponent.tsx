import React from 'react';
import {useSelector} from 'react-redux';
import {Color} from '../contract/models/figures/checker';
import {RootState} from '../store';

const HeaderComponent = () => {
    const username = useSelector((state: RootState) => state.username);
    const gameStatus = useSelector((state: RootState) => state.game);

    return (
        <div>
            <div className="header">
                <div className="game-name">Checkers</div>
                <div
                    className="username"
                    hidden={!gameStatus.gameStarted}
                >
                    <div>
                        Username: {username}
                    </div>
                </div>
                <div
                    className="username"
                    hidden={!gameStatus.gameStarted}
                >
                    <div style={{padding: 20}}>
                        Color:
                        <div
                            style={{width: 40, height: 10}}
                            className={
                                gameStatus.playerColor === Color.BLACK
                                    ? 'black'
                                    : gameStatus.playerColor === Color.RED
                                        ? 'red'
                                        : gameStatus.playerColor === Color.GREEN
                                            ? 'green'
                                            : gameStatus.playerColor === Color.WHITE
                                                ? 'white'
                                                : ''}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeaderComponent;