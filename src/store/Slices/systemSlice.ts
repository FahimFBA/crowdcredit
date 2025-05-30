import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ThemeTypesEnum } from "@/types/enum";
import { TailwindThemeType } from "@/types/types";

interface SystemState {
  mode: TailwindThemeType;
}

const initialState: SystemState = {
  mode: ThemeTypesEnum.LIGHT,
};

export const systemSlice = createSlice({
  name: "system",
  initialState,
  reducers: {
    themeSwitch: (
      state: SystemState,
      action: PayloadAction<TailwindThemeType>,
    ) => {
      state.mode = action.payload;
    },
    resetSystem: () => initialState,
  },
});

export const { themeSwitch, resetSystem } = systemSlice.actions;
