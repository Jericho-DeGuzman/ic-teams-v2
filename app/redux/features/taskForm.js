import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: false,
}

export const taskFormSlice = createSlice({
    name: 'taskForm',
    initialState,
    reducers: {
        openTaskForm: (state) => {
            state.value = true
        },
        closeTaskForm: (state) => {
            state.value = false
        }
    }
})

export const { openTaskForm, closeTaskForm } = taskFormSlice.actions;
export default taskFormSlice.reducer;

