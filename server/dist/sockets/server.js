"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addSocketServer = exports.usersList = void 0;
const socket_io_1 = require("socket.io");
const middleware_1 = require("./middleware");
const registerEvents_1 = require("./registerEvents");
const config_1 = require("../util/config");
exports.usersList = new Map();
const addSocketServer = (server) => {
    const io = new socket_io_1.Server(server, {
        cors: {
            origin: config_1.CORS
        }
    });
    io.use(middleware_1.auth);
    io.on("connection", (0, registerEvents_1.registerEvents)(io));
};
exports.addSocketServer = addSocketServer;
