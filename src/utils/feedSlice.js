import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
    name: "feed",
    initialState: null,
    reducers: {
        addFeed: (state, action) => {
            return action.payload
        },
        removeFeed: (state, action) => {
            const newArray = state.data.filter(f => f._id !== action.payload);
            return {...state, data: newArray};
        },
        removeEntireFeed: () => {
            return null;
        }
    }
});

export default feedSlice.reducer

export const {addFeed, removeFeed, removeEntireFeed} = feedSlice.actions