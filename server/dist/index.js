"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const connect_1 = __importDefault(require("./Mongo/connect"));
const connect_2 = __importDefault(require("./Redis/connect"));
const router_1 = __importDefault(require("./routes/router"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const errorHandler_1 = __importDefault(require("./middleware/errorHandler"));
const http_1 = require("http");
const server_1 = require("./sockets/server");
const config_1 = require("./util/config");
const app = (0, express_1.default)();
const httpServer = (0, http_1.createServer)(app);
app.use((0, cors_1.default)({
    origin: config_1.CORS,
    credentials: true,
}));
(0, server_1.addSocketServer)(httpServer);
app.use('/', express_1.default.static(__dirname + '/SPA'));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use(router_1.default);
app.use(errorHandler_1.default);
httpServer.listen(process.env.PORT, () => {
    console.log('server running in mode: ' + process.env.NODE_ENV);
    (0, connect_1.default)();
    (0, connect_2.default)();
});
