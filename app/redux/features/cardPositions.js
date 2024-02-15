import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    tasks: []
}

export const cardPositionSlice = createSlice({
    name: 'cardPosition',
    initialState,
    reducers: {
        setCardTask: (state, actions) => {
            state.tasks = actions.payload
        },
        moveCard: (state, actions) => {
            const {taskId, status} = actions.payload;
            state.tasks = state.tasks.map(task => 
                task.uuid === taskId ? {
                    ...task, status: status
                } : task
            )
        }
    }
})

export const { setCardTask, moveCard } = cardPositionSlice.actions;
export default cardPositionSlice.reducer;