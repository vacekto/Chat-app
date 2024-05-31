"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BadUserInput extends Error {
    constructor(message) {
        super(message);
    }
}
exports.default = BadUserInput;
