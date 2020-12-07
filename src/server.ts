import express from "express";
import cors from "cors";
import routes from "./routes";
import * as http from "http";  
import * as socket from "socket.io";
import { Socket } from "socket.io";

const app = express();

app.use(cors())
app.use(express.json())
app.use(routes);
        
const server = new http.Server(app);  
export const io = new socket.Server(server);

io.on('connection', async (socket: Socket) => {
    console.log(socket.id + " connected");

    //Join room in connection
    let query: { room?: string; } = socket.handshake.query;
    const { room } = query;
    let rooms: string[] | undefined = room?.split(",")
    if(rooms) {
        rooms.map(item => socket.join(item))
    }
    //join in emit
    socket.on("join", (channel) => {
        socket.join(channel)
        console.log(socket.rooms);
    })
    //disconnect
    socket.on('disconnect', () => {
        console.log(socket.id + " disconnected")
    });
  });

server.listen(process.env.PORT || 3333, () => {  
    console.log(`Application listening on port ${process.env.PORT || 3333}!`);
});
