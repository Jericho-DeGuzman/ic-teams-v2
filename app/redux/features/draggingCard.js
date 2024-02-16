import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: null
}

export const draggingCardSlice = createSlice({
    name: 'draggingCard',
    initialState,
    reducers: {
        setDraggingCard: (state, action) => {
            state.value = action.payload
        }
    }
})

export const { setDraggingCard } = draggingCardSlice.actions;
export default draggingCardSlice.reducer;