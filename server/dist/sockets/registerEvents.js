"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerEvents = void 0;
const server_1 = require("./server");
const registerEvents = (io) => (socket) => {
    console.log(`${socket.data.username} connected`);
    server_1.usersList.set(socket.data.username, socket);
    socket.on("message", msg => {
        socket.broadcast.emit("message", msg);
    });
    socket.on("disconnect", reason => {
        console.log(`user ${socket.data.username} disconnecting, reason: `, reason);
        server_1.usersList.delete(socket.data.username);
    });
};
exports.registerEvents = registerEvents;
