import { Navbar } from "@/components/Layout";
import { RootState, useAppSelector } from "@/store";
import { ComponentType, FC } from "react";
import { ILayoutHOCProps } from "../types";
import { cn } from "@/lib/utils";
import { containerDefinition } from "@/_Variables";

export const withTemplate = <P extends ILayoutHOCProps>(
  Component: ComponentType<P>,
): FC<P> => {
  return (props: P) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const reduxState = useAppSelector((state: RootState) => state);
    const WrappedComponent = <Component {...props} reduxState={reduxState} />;

    return (
      <div>
        <Navbar reduxState={reduxState} />
        <main
          className={cn(containerDefinition, "mt-10 pt-10")}
          id="MAIN__BODY__ID"
        >
          {WrappedComponent}
        </main>
      </div>
    );
  };
};
