import { ThemeTypesEnum } from "./enum";

export type TailwindThemeType = ThemeTypesEnum.DARK | ThemeTypesEnum.LIGHT;
export type IHTMLFormEvent = React.FormEvent<HTMLFormElement>;
export type IHTMLInputTypeChange = React.ChangeEvent<HTMLInputElement>;

export type ElementPixelDetailsType = {
  marginTop: number;
  marginRight: number;
  marginBottom: number;
  marginLeft: number;

  marginTopAndBottom: number;
  marginLeftAndRight: number;

  marginTotal: number;

  paddingTop: number;
  paddingRight: number;
  paddingBottom: number;
  paddingLeft: number;

  paddingTopAndBottom: number;
  paddingLeftAndRight: number;

  paddingTotal: number;

  // main element height
  elementHeight: number;
};
