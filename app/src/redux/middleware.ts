import { Middleware, PayloadAction, isAction } from "@reduxjs/toolkit"
import { TSetAlertTimeoutPayload, alertActions } from "./slice/alertSlice"
import { IAlert } from "../util/types"
import { v4 as uuidv4 } from 'uuid';
import { LS_CHAP_APP_ACCESS_TOKEN } from "../util/constants";
import socket from "../util/socket";

export const addAlertMiddleware: Middleware = api => next => action => {
    if (!isAction(action) || action.type !== "alert/addAlert") return next(action)
    const newAlert = (action as PayloadAction<IAlert>).payload
    newAlert.id = uuidv4()


    api.dispatch(alertActions.setAlertTimeout({
        alertId: newAlert.id,
        delay: 5000
    }))

    return next(action)
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

export const loginMiddleware: Middleware = api => next => action => {
    if (!isAction(action) || action.type !== "userData/login") return next(action)

    const accessToken = (action as PayloadAction<string>).payload
    localStorage.setItem(LS_CHAP_APP_ACCESS_TOKEN, accessToken)
    socket.connect(accessToken)

    api.dispatch(alertActions.addAlert({
        message: "Login successful",
        severity: "success"
    }))

    return next(action)
}



// dispatch(alertActions.addAlert({
//     message: "Login succesfull",
//     severity: "success"
//   }))