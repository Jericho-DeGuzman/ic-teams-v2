import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    uuid: null
}

export const editingTargetSlice = createSlice({
    name: 'editingTarget',
    initialState,
    reducers: {
        setEditingCard: (state, actions) => {
            state.uuid = actions.payload
        }
    }
})

export const { setEditingCard } = editingTargetSlice.actions
export default editingTargetSlice.reducer;