import {Server} from "socket.io";
import {Multiplayer} from "./multiplayer/multiplayer";
import {MultiplayerImplementation} from "./multiplayer/multiplayerImplementation";
import {MoveServerEvent} from "./contract/events/serverToClient/moveServerEvent";
import {EventName} from "./contract/events/eventName";
import { RegistrationClientEvent } from "./contract/events/clientToServer/registrationClientEvent";

const io = new Server(5000,{ });
const multi4socket = io.of('/multiplayer4')
const multiplayer: Multiplayer = new MultiplayerImplementation(io);

multi4socket.on('connection', (socket) => {
    console.log('connection handled; socketId: ' + socket.id);
    socket.on(EventName.REGISTRATION, (data) => {
        const event = new RegistrationClientEvent(data.name === undefined ? JSON.parse(data).name : data.name)
        multiplayer.addNewPlayer(event.name, socket.id);
        console.log('player registered; name: ' + event.name + '; socketId: ' + socket.id);
    });

    socket.on(EventName.MOVE, (moveEvent: MoveServerEvent) => {
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
    });

    socket.on('disconnect', () => {
        if (!multiplayer.getAllPlayers().contains(socket.id)) {

        } else {
            multiplayer.getAllPlayers().removeBySocketId(socket.id);
        }
    });

    socket.on("connect_error", (err) => {
        console.log(`connect_error due to ${err.message}`);
    });

    // dev only
    socket.on('SHUTDOWN', () => {
        throw new Error();
    });

});

