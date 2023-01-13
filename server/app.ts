import {Server} from "socket.io";
import {Multiplayer} from "./multiplayer/multiplayer";
import {MultiplayerImplementation} from "./multiplayer/multiplayerImplementation";
import {MoveServerEvent} from "./contract/events/serverToClient/moveServerEvent";
import {EventName} from "./contract/events/eventName";

const io = new Server(5000,{ });
const multi4socket = io.of('/multiplayer4')
const multi3socket = io.of('/multiplayer3')
const multiplayer: Multiplayer = new MultiplayerImplementation(io);

multi4socket.on('connection', (socket) => {
    socket.on(EventName.REGISTRATION, (name: string) => {
        multiplayer.addNewPlayer(name, socket.id);
        console.log(EventName.START);
    });

    socket.on(EventName.MOVE, (moveEvent: MoveServerEvent) => {
        multiplayer.getGame().doMove(moveEvent.board);
        multi4socket.to(multiplayer.getGame().getGameId())
            .emit('update', )
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

