import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isCollapsed: false,
};

export const tabsSlice = createSlice({
  name: "tab",
  initialState,
  reducers: {
    changeCollapse: (state) => {
      state.isCollapsed = !state.isCollapsed;
    },
  },
});

export const { changeCollapse } = tabsSlice.actions;

export default tabsSlice.reducer;
