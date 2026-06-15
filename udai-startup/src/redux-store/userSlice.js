import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        items: []
    },
    reducers: {
        addItem: (state, action) => {
            state.items.push(action.payload);
        },
        clearItem: () => {}
    }
});

export const { addItem, clearItem } = userSlice.actions;

export default userSlice.reducer;