import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    uuid: null
}

export const deletingTargetSlice = createSlice({
    name: 'deletingTarget',
    initialState,
    reducers: {
        setDeletingTarget: (state, action) => {
            state.uuid = action.payload
        }
    }
})

export const { setDeletingTarget } = deletingTargetSlice.actions;
export default deletingTargetSlice.reducer;