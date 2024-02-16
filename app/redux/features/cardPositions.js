import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    tasks: {}
}

export const cardPositionSlice = createSlice({
    name: 'cardPosition',
    initialState,
    reducers: {
        setCardTask: (state, action) => {
            state.tasks = action.payload;
        }
    }
})

export const { setCardTask, moveCard } = cardPositionSlice.actions;
export default cardPositionSlice.reducer;