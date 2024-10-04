import { configureStore } from '@reduxjs/toolkit'
import { configSlice } from './slices/config/configSlice'

export const store = configureStore({
    reducer: {
        config: configSlice.reducer,
    }
})