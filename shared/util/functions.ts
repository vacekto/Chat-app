import { ITokenPayload, ITokenPayloadExtended } from "../types"

type TGetJWTPayload = <T extends boolean = false>(
    token: string, extended?: T
) => T extends true ?
    ITokenPayloadExtended :
    ITokenPayload

export const getTokenPayload: TGetJWTPayload = (token, extended) => {
    const tokenPayload = token.split('.')[1]
    const payload = JSON.parse(atob(tokenPayload))
    if (extended) return payload
    delete payload.exp
    delete payload.iat
    return payload
}



export function logger(message?: string) {
    if (process.env.NODE_ENV !== "production") throw new Error(message)
    // const haha = console.trace("stack trace")
    const trace = getFormattedStackTrace()

    // todo: handle production logging
}

function getFormattedStackTrace() {
    function formatStackTraceLine(line: string) {
        // Chrome and Node.js format: at functionName (fileName:line:column)
        const chromeRegex = /at (\S+) \((.+):(\d+):(\d+)\)/;
        // Firefox format: functionName@fileName:line:column
        const firefoxRegex = /(\S+)@(.*):(\d+):(\d+)/;

        let match = chromeRegex.exec(line.trim());
        if (match) {
            return `-- Function: ${match[1]}, File: ${match[2]}, Line: ${match[3]}, Column: ${match[4]}`;
        }

        match = firefoxRegex.exec(line.trim());
        if (match) {
            return `-- Function: ${match[1]}, File: ${match[2]}, Line: ${match[3]}, Column: ${match[4]}`;
        }

        return line; // Fallback for lines that don't match the expected format
    }

    const error = new Error();
    const stackLines = error.stack!.split('\n').slice(1); // Skip the first line (error message)
    return stackLines.map(line => formatStackTraceLine(line)).join('\n');
}

