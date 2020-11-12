import { Router } from "express";
import SocketController from "./controllers/SocketController";

const routes = Router();

routes.post("/notification/:channel", SocketController.create);

export default routes;