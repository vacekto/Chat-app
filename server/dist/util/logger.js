"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const fs_1 = require("fs");
exports.logger = {
    log: function (event) {
        const outputFile = (event instanceof Error) ?
            'errors.txt' : 'events.txt';
        const content = formatEvent(event);
        const path = `/chatapp/server/src/logs/${outputFile}`;
        writeToFile(path, content);
    },
};
function formatEvent(event) {
    let formated = '-----------\n';
    formated += `TIME: ${new Date().toUTCString()} \n`;
    if (event instanceof Error) {
        formated += `Message: ${event.message} \n`;
        formated += `Stack: ${event.stack}`;
    }
    else if (typeof event === 'object') {
        formated += JSON.stringify(event);
    }
    else {
        formated += event;
    }
    formated += `${event}\n\n`;
    return formated;
}
function writeToFile(path, content) {
    console.log('path: ' + path, 'content: ' + content);
    (0, fs_1.appendFile)(path, content, { flag: 'a+' }, err => {
        if (err)
            console.error('LOGGER ERROR: ' + err);
    });
}
