import { Draft, PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IAlert } from '../../util/types'
import { PartialBy } from '@chatapp/shared'
import { v4 as uuidv4 } from 'uuid';

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
        addAlert: (state: Draft<IAlertState>, action: PayloadAction<PartialBy<IAlert, "id" | "fading">>) => {
            const newAlert: IAlert = {
                id: uuidv4(),
                fading: false,
                ...action.payload,
            }
            state.alerts.push(newAlert)
        },
        removeAlert: (state: Draft<IAlertState>, action: PayloadAction<string>) => {
            const alertId = action.payload
            const alertTimeout = state.alertTimeouts[alertId]
            if (alertTimeout) clearTimeout(alertTimeout)

            state.alerts = state.alerts.filter(alert => alert.id !== action.payload)
            delete state.alertTimeouts[action.payload]
        },
        setAlertTimeout: (state: Draft<IAlertState>, action: PayloadAction<TSetAlertTimeoutPayload>) => {
            state.alertTimeouts[action.payload.alertId] = action.payload.timeoutId!
        },
        fadeAlert: (state: Draft<IAlertState>, action: PayloadAction<string>) => {
            const alertId = action.payload
            const alert = state.alerts.find(alert => alert.id === alertId)
            if (alert) alert.fading = true
        },
    },
})

export const alertActions = alertSlice.actions
export default alertSlice.reducer