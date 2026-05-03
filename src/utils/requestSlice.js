import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
    name: "requests",
    initialState: null,
    reducers: {
        addRequests: (state, action) => {
            return action.payload
        },
        removeRequest: (state, action) => {
            const newArray = state.data.filter(r => r._id !== action.payload);
            return {...state, data: newArray}
        },
        removeCompleteRequests: () => {
            return null;
        }
    }
});

export default requestSlice.reducer

export const {addRequests, removeRequest, removeCompleteRequests} = requestSlice.actions