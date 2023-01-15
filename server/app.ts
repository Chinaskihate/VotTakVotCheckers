import {Server} from "socket.io";
import {Multiplayer} from "./multiplayer/multiplayer";
import {MultiplayerImplementation} from "./multiplayer/multiplayerImplementation";
import {MoveServerEvent} from "./contract/events/serverToClient/moveServerEvent";
import {EventName} from "./contract/events/eventName";
import {RegistrationClientEvent} from "./contract/events/clientToServer/registrationClientEvent";
import {EndGameServerEvent, GameResultStatus} from "./contract/events/serverToClient/endGameServerEvent";
import {User} from "./contract/models/game_components/user";

const io = new Server(5000,{ });
const multi4socket = io.of('/multiplayer4')
const multiplayer: Multiplayer = new MultiplayerImplementation(io);

multi4socket.on('connection', (socket) => {
    console.log('connection handled; socketId: ' + socket.id);

    socket.on(EventName.REGISTRATION, (data) => {
        try {
            const event = new RegistrationClientEvent(data.name === undefined ? JSON.parse(data).name : data.name)
            multiplayer.addNewPlayer(event.name, socket.id);
            console.log('player registered; name: ' + event.name + '; socketId: ' + socket.id);
        } catch (e: any) {
            console.log('SERVER ERROR: ' + e.message)
        }
    });

    socket.on(EventName.MOVE, (moveEvent: MoveServerEvent) => {
        try {
            console.log('move handled');
            multiplayer.doMove(moveEvent.board);
            multi4socket.to(multiplayer.getGame().getGameId())
                .emit(EventName.MOVE, new MoveServerEvent(
                        multiplayer.getGame().getBoard().getPosition(),
                        multiplayer.getGame().getCurrentMove(),
                        multiplayer.getGame().getPlayers()
                    )
                );
            console.log('move done');
        } catch (e) {
            console.log('SERVER ERROR: ' + e.message)
        }
    });

    socket.on('disconnect', () => {
        try {
            if (!multiplayer.getAllPlayers().contains(socket.id)) {
                multiplayer.getAllPlayers().removeBySocketId(socket.id);
                console.log('Disconnected - removed from queue; SocketID: ' + socket.id);
            } else {
                io.of('/multiplayer4').to(multiplayer.getGame().getGameId())
                    .emit(EventName.END, new EndGameServerEvent(
                        multiplayer.getGame().getGameId(),
                        GameResultStatus.ABORTED,
                        null
                    ));
                console.log('Disconnected - Game aborted');
            }
        } catch (e) {
            console.log('SERVER ERROR: ' + e.message)
        }
    });

    socket.on("connect_error", (err) => {
        console.log(`connect_error due to ${err.message}`);
    });

    // dev only
    socket.on('SHUTDOWN', () => {
        // multiplayer.getAllPlayers().enqueue(new User('1', '2'));
        // multiplayer.getAllPlayers().enqueue(new User('2', '3'));
        // multiplayer.getAllPlayers().enqueue(new User('3', '1'));
        //
        // multiplayer.getAllPlayers().removeBySocketId('1');
        //
        // multiplayer.getAllPlayers().enqueue(new User('5', '4'));
        // multiplayer.getAllPlayers().enqueue(new User('5', '4'));
        //
        // console.log(multiplayer.getAllPlayers().asArray());
        //
        // console.log(multiplayer.getAllPlayers().dequeue());
        // console.log(multiplayer.getAllPlayers().dequeue());
        throw new Error('SHUTDOWN');
    });

});

