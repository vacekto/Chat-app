import { IResponseError } from "../types";
export declare const getJWTPayload: (token: string) => any;
export declare function isServerError(data: Object): data is IResponseError;
