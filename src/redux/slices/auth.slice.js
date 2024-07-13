import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  uid: "",
  susertoken: ""
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials(state, action) {
      state = action.payload
    },
  },
});

export default authSlice.reducer;
export const { setCredentials } = authSlice.actions;
