import { Draft, PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IAlert } from '../../util/types'


/**
 * @param delay timeout in ms
 */
export type TSetAlertTimeoutPayload = {
    alertId: string
    delay: number
    timeoutId?: NodeJS.Timeout
}

export interface IAlertState {
    alerts: IAlert[],
    alertTimeouts: Record<string, NodeJS.Timeout>
}

const initialState: IAlertState = {
    alerts: [],
    alertTimeouts: {}
}

export const alertSlice = createSlice({
    name: 'alert',
    initialState,
    reducers: {
        addAlert: (state: Draft<IAlertState>, action: PayloadAction<IAlert>) => {
            console.log("reducer")
            state.alerts.push(action.payload)
        },
        removeAlert: (state: Draft<IAlertState>, action: PayloadAction<string>) => {
            state.alerts = state.alerts.filter(alert => alert.id !== action.payload)
            delete state.alertTimeouts[action.payload]
        },
        setAlertTimeout: (state: Draft<IAlertState>, action: PayloadAction<TSetAlertTimeoutPayload>) => {
            state.alertTimeouts[action.payload.alertId] = action.payload.timeoutId!
            console.log("testing")
        }
    },

})

export const alertActions = alertSlice.actions
export default alertSlice.reducer