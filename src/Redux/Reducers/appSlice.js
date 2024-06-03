// searchSlice.js
import { createSlice } from '@reduxjs/toolkit';

const appSlice = createSlice({
  name: 'search',
  initialState: {
    tasks: [],
  },
  reducers: {
    saveTaskOptions: (state, action) => {
      state.tasks = action.payload;
    },
  },
});

export const {
  saveTaskOptions,
} = appSlice.actions;

export default appSlice.reducer;
