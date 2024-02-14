import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    pending: [],
    ongoing: [],
    review: [],
    done: [],
    revise: [],
}

export const cardPositionSlice = createSlice({
    name: 'cardPosition',
    initialState,
    reducers: {
        setPendingCardPosition: (state, action) => {
            state.pending = action.payload
        },
        setOngoingCardPosition: (state, action) => {
            state.ongoing = action.payload
        },
        setForReviewCardPosition: (state, action) => {
            state.review = action.payload
        },
        setDoneCardPosition: (state, action) => {
          state.done = action.payload  
        },
        setForReviseCardPosition: (state, action) => {
            state.revise = action.payload
        }
    }
})

export const { setPendingCardPosition, setOngoingCardPosition,
    setForReviewCardPosition, setDoneCardPosition, setForReviseCardPosition} = cardPositionSlice.actions;
export default cardPositionSlice.reducer;