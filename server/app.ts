import {Server} from "socket.io";
import {Multiplayer} from "./multiplayer/multiplayer";
import {MultiplayerImplementation} from "./multiplayer/multiplayerImplementation";
import {MoveServerEvent} from "./contract/events/serverToClient/moveServerEvent";
import {EventName} from "./contract/events/eventName";

const io = new Server(5000,{ });
const multi4socket = io.of('/multiplayer4')
const multiplayer: Multiplayer = new MultiplayerImplementation(io);

multi4socket.on('connection', (socket) => {
    console.log('connection handled; socketId: ' + socket.id);
    socket.on(EventName.REGISTRATION, (name: string) => {
        multiplayer.addNewPlayer(name, socket.id);
        console.log('player registered; name: ' + name + '; socketId: ' + socket.id);
    });

    socket.on(EventName.MOVE, (moveEvent: MoveServerEvent) => {
        console.log('move handled');
        multiplayer.doMove(moveEvent.board);
        multi4socket.to(multiplayer.getGame().getGameId())
            .emit(EventName.MOVE, new MoveServerEvent(
                multiplayer.getGame().getBoard().getPosition(), multiplayer.getGame().getCurrentMove())
            );
        console.log('move done');
    });

    socket.on('disconnect', () => {
        if (!multiplayer.getAllPlayers().contains(socket.id)) {

        } else {
            multiplayer.getAllPlayers().removeBySocketId(socket.id);
        }
    });

    // dev only
    socket.on('SHUTDOWN', () => {
        throw new Error();
    });

});

