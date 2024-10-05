export interface IUseControlledStateProps {
  controlledState?: boolean;
  onStateChange?: (state: boolean) => void;
}

export interface ElementPixelDetailsType {
  marginTop: number;
  marginRight: number;
  marginBottom: number;
  marginLeft: number;

  paddingTop: number;
  paddingRight: number;
  paddingBottom: number;
  paddingLeft: number;

  marginTopAndBottom: number;
  marginLeftAndRight: number;
  paddingTopAndBottom: number;
  paddingLeftAndRight: number;
  marginTotal: number;
  paddingTotal: number;

  // main element height
  elementHeight: number;
}

export type ElementConfig = {
  id: string;
  include?: ("height" | "margin" | "padding")[];
};
