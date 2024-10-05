import { RootState } from "@/store";
import { RouteObject } from "react-router-dom";

export type NewPropertiesOnRouteObjectType = RouteObject & {
  order?: number;
  label: string;
  icon?: JSX.Element;
};

export interface INewPropertiesWithRouteObject {
  children: NewPropertiesOnRouteObjectType[];
}

export type allPageRoutesType = RouteObject & INewPropertiesWithRouteObject;

export interface IWithPageTrackingProps {
  reduxState: RootState;
}

export interface ILayoutHOCProps {
  reduxState?: RootState;
}
