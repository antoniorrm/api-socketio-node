import express from "express";
import cors from "cors";
import routes from "./routes";
import * as http from "http";  
import * as socket from "socket.io";


const app = express();

app.use(cors())
app.use(express.json())
app.use(routes);
const server = new http.Server(app);  
export const io = new socket.Server(server);
io.on('connection', async (res: { id: any; on: (arg0: string, arg1: () => void) => void; }) => {
    console.log(res.id)
    res.on('disconnect', () => {
        console.log("Deu ruim")
      });
  });

server.listen(process.env.PORT || 3333, () => {  
    console.log(`Application listening on port ${process.env.PORT || 3333}!`);
});
