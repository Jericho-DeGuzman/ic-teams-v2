import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: null
}

export const draggingCard = createSlice({
    name: 'dragggingCard',
    initialState,
    reducers: {
        setDraggingCard: (state, action) => {
            state.value = action.payload
        }
    }
})

export const { setDraggingCard } = draggingCard.actions;
export default draggingCard.reducer;