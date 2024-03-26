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
        },
        updateTarget: (state, actions) => {
            state.targets.map((target, index) => {
                if(target.uuid == actions.payload.uuid) state.targets[index] = actions.payload
            })
        }
    }
})

export const { setTargetData, removeTarget, addNewTarget, updateTarget } = targetsDataSlice.actions;
export default targetsDataSlice.reducer;