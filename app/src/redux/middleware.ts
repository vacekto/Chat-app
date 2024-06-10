import { Middleware, PayloadAction, isAction } from "@reduxjs/toolkit"
import { TSetAlertTimeoutPayload, alertActions } from "./slice/alertSlice"
import { IAlert } from "../util/types"
import { v4 as uuidv4 } from 'uuid';

export const addAlertMiddleware: Middleware = api => next => action => {
    if (!isAction(action) || action.type !== "alert/addAlert") return next(action)
    const newAlert = (action as PayloadAction<IAlert>).payload
    newAlert.id = uuidv4()

    next(action)

    api.dispatch(alertActions.setAlertTimeout({
        alertId: newAlert.id,
        delay: 5000
    }))

}

export const setAlertTimeoutMiddleware: Middleware = api => next => action => {
    if (!isAction(action) || action.type !== "alert/setAlertTimeout") return next(action)

    const payload = (action as PayloadAction<TSetAlertTimeoutPayload>).payload
    const state = api.getState()

    const alertTimeout = state.alert.alertTimeouts[payload.alertId]
    if (alertTimeout) clearTimeout(alertTimeout)
    const removeAlert = () => api.dispatch(alertActions.fadeAlert(payload.alertId))

    if (payload.delay !== -1)
        payload.timeoutId = setTimeout(removeAlert, payload.delay)

    return next(action)
}