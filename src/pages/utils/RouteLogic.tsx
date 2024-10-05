import { RootState, useAppSelector } from "@/store";
import { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import ReactGA from "react-ga4";
import { IWithPageTrackingProps } from "../types";

const withPageTracking = <P extends object>(
  Component: React.ComponentType<P & IWithPageTrackingProps>,
): React.FC<P> => {
  return (props: P) => {
    const reduxState = useAppSelector((state: RootState) => state);
    const location = useLocation();

    useEffect(() => {
      ReactGA.send({ hitType: "pageview", page: location.pathname });
    }, [location]);

    return <Component {...props} reduxState={reduxState} />;
  };
};

export const GeneralPagesRoutes = withPageTracking(({ reduxState }) => {
  const {
    user: { uid },
  } = reduxState;
  if (uid) {
    return <Navigate to="/profile" replace />;
  }
  return <Outlet />;
});

export const AuthenticatedRoutes = withPageTracking(({ reduxState }) => {
  const {
    user: { uid },
  } = reduxState;

  if (!uid) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
});

export const SomePagesRoutes = withPageTracking(() => {
  return <Outlet />;
});
