import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    targets: []
}

export const targetsDataSlice = createSlice({
    name: 'targetData',
    initialState,
    reducers: {
        setTargetData: (state, actions) => {
            state.targets = actions.payload
        },
        removeTarget: (state, actions) => {
            state.targets = state.targets.filter((target) => target.uuid !== actions.payload);
        },
        addNewTarget: (state, actions) => {
            state.targets = [...state.targets, actions.payload]
        }
    }
})

export const { setTargetData, removeTarget, addNewTarget } = targetsDataSlice.actions;
export default targetsDataSlice.reducer;