import {Server} from "socket.io";
import {Multiplayer} from "./multiplayer/multiplayer";
import {MultiplayerImplementation} from "./multiplayer/multiplayerImplementation";
import {Checker} from "./figures/checker";

const io = new Server(5000,{ });
const multi4socket = io.of('/multiplayer4')
const multi3socket = io.of('/multiplayer3')
const multiplayer: Multiplayer = new MultiplayerImplementation(io);

multi4socket.on('connection', (socket) => {
    socket.on('register', (name: string) => {
        multiplayer.addNewPlayer(name, socket.id);
    })

    socket.on('move', (board: Checker[][]) => {
        multiplayer.getGame().doMove(board);
        multi4socket.to(multiplayer.getGame().getGameId())
            .emit('update', )
    });

    socket.on('disconnect', () => {
        if (!multiplayer.getAllPlayers().contains(socket.id)) {

        } else {
            multiplayer.getAllPlayers().removeBySocketId(socket.id);
        }
    });
});

