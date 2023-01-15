import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const HeaderComponent = () => {
    const username = useSelector((state: RootState) => state.username);
    const isGameStarted = useSelector((state: RootState) => state.game);

    return (
        <div>
            <div className="header">
                <div className="game-name">Checkers</div>
                <div className="username" hidden={!isGameStarted}>Username: {username}</div>
            </div>
        </div>
    );
};

export default HeaderComponent;