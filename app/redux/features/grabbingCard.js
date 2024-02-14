import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: null
}

export const grabbingCardSlice = createSlice({
    name: 'grabbingCard',
    initialState,
    reducers: {
        setGrabbingCard: (state, action) => {
            state.value = action.payload
        }
    }
})

export const { setGrabbingCard } = grabbingCardSlice.actions;
export default grabbingCardSlice.reducer;