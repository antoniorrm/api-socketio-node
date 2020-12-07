import { Request, Response } from "express";
import { io } from "../server";

export default {

    async create(request: Request, response: Response) {
        const {
            data,
        } = request.body;
        
        const {channel} = request.params;
        console.log(channel, data);
        
        io.to(channel).emit(channel, data)

        return response.status(201).json({data, channel});
    }
}