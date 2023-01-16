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
        try {
            interface MyMove {
                eventName: EventName;
                board: Checker[][];
                nextMoveColor: Color;
            }

            data = JSON.stringify(data).replace(`'`, `"`);
            let obj: MyMove = JSON.parse(data.toString());

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
            throw e;
            //console.log('SERVER ERROR: ' + e.message)
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
        // multiplayer.getAllPlayers().enqueue(new User('1', '2'));
        // multiplayer.getAllPlayers().enqueue(new User('2', '3'));
        // multiplayer.getAllPlayers().enqueue(new User('3', '1'));
        // console.log('after add');
        // console.log(multiplayer.getAllPlayers().asArray());
        //
        // multiplayer.getAllPlayers().removeBySocketId('1');
        // console.log('after remove by id');
        // console.log(multiplayer.getAllPlayers().asArray());

        // multiplayer.getAllPlayers().enqueue(new User('5', '4'));
        // multiplayer.getAllPlayers().enqueue(new User('5', '4'));
        // console.log('after add');
        // console.log(multiplayer.getAllPlayers().asArray());
        //
        // console.log(multiplayer.getAllPlayers().dequeue());
        // console.log(multiplayer.getAllPlayers().dequeue());
        // console.log('after dequeue');
        // console.log(multiplayer.getAllPlayers().asArray());
        throw new Error('SHUTDOWN');
    });

});

