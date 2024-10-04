import { createSlice } from '@reduxjs/toolkit';

export const configSlice = createSlice({
    name: 'config',
    initialState: {
        isLoading: false,
        config: null,
        error: "",
        modified: false
        
    },
    reducers: {
        setConfig: (state, action ) => {
            state.isLoading = false
            state.config = action.payload
        },
        startLoadingConfig: (state) => {
            state.isLoading = true
        },
        setError: (state, action) => {
            state.error = action.payload
        },
        addEndpoint: (state, action) => {
            state.config.endpoints.push(action.payload)
            state.modified = true
        },
        deleteEndpoint: (state, action) => {
            state.config.endpoints.splice(action.payload.index, 1);
            state.modified = true
        },
        editEndpoint : (state, action) => {
            const { index, endpoint } = action.payload; // Desestructurar el payload
            state.config.endpoints[index] = endpoint; // Reemplazar el endpoint en la posición dada
            state.modified = true
        },
    }
});
// Action creators are generated for each case reducer function
export const { setConfig, startLoadingConfig, setError, addEndpoint, deleteEndpoint, editEndpoint } = configSlice.actions;