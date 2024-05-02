import { Middleware, PayloadAction, isAction } from "@reduxjs/toolkit"
import { alertActions } from "./slice/alert"
import { IAlert } from "../util/types"

export const addAlertMiddleware: Middleware = api => next => action => {
    if (isAction(action) && action.type === "alert/addAlert") {
        const removeAlert = () => api.dispatch(alertActions.removeAlert((action as PayloadAction<IAlert>).payload.id))
        setTimeout(removeAlert, 3000)
    }
    return next(action)
}