import { IResponseError } from "../types";

export function isServerError(data: Object): data is IResponseError {
    return typeof (data as any).errorMessage === "string"
}
