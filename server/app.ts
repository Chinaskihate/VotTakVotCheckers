import {Server} from "socket.io";
import {Multiplayer} from "./multiplayer/multiplayer";
import {MultiplayerImplementation} from "./multiplayer/multiplayerImplementation";
import {MoveServerEvent} from "./contract/events/serverToClient/moveServerEvent";
import {EventName} from "./contract/events/eventName";
import {RegistrationClientEvent} from "./contract/events/clientToServer/registrationClientEvent";
import {Checker, Color} from "./contract/models/figures/checker";

const io = new Server(5000,{ });
const multi4socket = io.of('/multiplayer4')
const multiplayer: Multiplayer = new MultiplayerImplementation(io);

multi4socket.on('connection', (socket) => {
    console.log('connection handled; socketId: ' + socket.id);

    socket.on(EventName.REGISTRATION, (data) => {
        try {
            const event = new RegistrationClientEvent(data.name === undefined ? JSON.parse(data).name : data.name)
            multiplayer.addNewPlayer(event.name, socket.id);
        } catch (e: any) {
            console.log('SERVER ERROR: ' + e.message)
        }
    });

    socket.on(EventName.MOVE, (data) => {
        console.log('json data handled');
        console.log(data);
        data = JSON.parse(data);
        try {
            console.log('trying to parse...');
            console.log(data);

            interface MyMove {
                eventName: EventName;
                board: Checker[][];
                nextMoveColor: Color;
            }

            data = JSON.stringify(data).replace(`'`, `"`);
            let obj: MyMove = JSON.parse(data.toString());

            console.log('parsed');

            multiplayer.doMove(obj.board);
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
            if (multiplayer.getGame() != null &&
                multiplayer.getGame().getPlayers().find(x => x.getSocketId() == socket.id) != undefined) {
                multiplayer.abortGame();
            } else {
                multiplayer.getAllPlayers().removeBySocketId(socket.id);
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
        throw new Error('SHUTDOWN');
    });

});

