import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    option: false, 
    internal: false,
    external: false,
    edit: false,
}

export const targetFormSlice = createSlice({
    name: 'targetForm',
    initialState,
    reducers: {
        openOptionForm: (state, action) => {
            state.option = action.payload;  
        },
        openInternalForm: (state, action) => {
            state.internal = action.payload;
        },
        openExternalForm: (state, action) => {
            state.external = action.payload;
        },
        openEditForm: (state, action) => {
            state.edit = action.payload;
        }
    }
})

export const {openOptionForm, openInternalForm, openExternalForm, openEditForm} = targetFormSlice.actions;
export default targetFormSlice.reducer;