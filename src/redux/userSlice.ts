import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  loggedIn: boolean;
}

export interface LoginPayload {
  username: string;
  password: string;
}

const initialState: UserState = {
  loggedIn: false,
};

const slice = createSlice({
  name: "userState",
  initialState,
  reducers: {
    login(state, { payload }: PayloadAction<LoginPayload>) {
      if (payload) {
        state.loggedIn = true;
      }
    }
  }
});

export const { login } = slice.actions;

export default slice.reducer;
