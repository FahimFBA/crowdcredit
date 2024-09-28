import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface InitialStateProps {
  uid: string;
  email: string;
  profile_picture: string;
}

const initialState: InitialStateProps = {
  uid: "",
  email: "",
  profile_picture: "",
};

export const userDataSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginSuccess(
      state,
      action: PayloadAction<Pick<InitialStateProps, "uid" | "email">>,
    ) {
      return {
        ...state,
        ...action.payload,
      };
    },
    logoutSuccess: () => initialState,
  },
});

export const { loginSuccess, logoutSuccess } = userDataSlice.actions;
