"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("../server");
exports.default = {
    async create(request, response) {
        const { data, } = request.body;
        const { channel } = request.params;
        console.log(channel);
        server_1.io.emit(channel, data);
        return response.status(201).json({ data, channel });
    }
};
