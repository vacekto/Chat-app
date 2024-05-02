import { Draft, PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IAlert } from '../../util/types'

export interface IAlertState {
    alerts: IAlert[]
}

const initialState: IAlertState = {
    alerts: []
}

export const alertSlice = createSlice({
    name: 'alert',
    initialState,
    reducers: {
        addAlert: (state: Draft<IAlertState>, action: PayloadAction<IAlert>) => {
            state.alerts.push(action.payload)
        },
        removeAlert: (state: Draft<IAlertState>, action: PayloadAction<number>) => {
            state.alerts = state.alerts.filter(alert => alert.id !== action.payload)
        }
    },

})

export const alertActions = alertSlice.actions
export default alertSlice.reducer