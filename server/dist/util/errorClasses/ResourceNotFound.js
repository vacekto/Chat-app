"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ResourceNotFoundError extends Error {
    constructor({ resourceName, propKey, propValue }) {
        const keyValueInfo = propKey && propValue ? `with key: value pair: '${propKey}: ${propValue}' ` : ``;
        const message = `Resource '${resourceName}' ${keyValueInfo}not found.`;
        super(message);
    }
}
exports.default = ResourceNotFoundError;
