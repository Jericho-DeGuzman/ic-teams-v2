import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: null
}

export const grabbingCardSlice = createSlice({
    name: 'grabbingCard',
    initialState,
    reducers: {
        setGrabbingCard: (state, payload) => {
            state.value = payload.payload;
        }
    }
})

export const { setGrabbingCard } = grabbingCardSlice.actions;
export default grabbingCardSlice.reducer;