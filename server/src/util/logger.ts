import { appendFile } from 'fs'

export const logger = {
    log: function (event: any) {

        const outputFile = (event instanceof Error) ?
            'errors.txt' : 'events.txt'

        const content = formatEvent(event)

        const path = `/chatapp/server/src/logs/${outputFile}`;

        writeToFile(path, content)
    },
}

function formatEvent(event: any) {

    let formated: string = '-----------\n'
    formated += `TIME: ${new Date().toUTCString()} \n`

    if (event instanceof Error) {
        formated += `Message: ${event.message} \n`
        formated += `Stack: ${event.stack}`
    } else if (typeof event === 'object') {
        formated += JSON.stringify(event)
    } else {
        formated += event
    }

    formated += `${event}\n\n`

    return formated
}

function writeToFile(path: string, content: string) {
    console.log('path: ' + path, 'content: ' + content)
    appendFile(path, content, { flag: 'a+' }, err => {
        if (err) console.error('LOGGER ERROR: ' + err);
    });
}
