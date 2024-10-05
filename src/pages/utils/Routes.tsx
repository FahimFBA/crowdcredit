import {
    Dashboard,
    Profile,
    Settings,
    Crowdfunding,
    CrowdfundingDetails,
    ProfileDetails,
    LoanPostDetails,
  } from "../Authenticated";
  import { Home, ResetPassword, Login, Signup } from "../GeneralPages";
  import { AuthenticatedRoutes, GeneralPagesRoutes } from "./RouteLogic";
  import { allPageRoutesType } from "../types";
  
  export const allPageRoutes: allPageRoutesType[] = [
    {
      path: "/",
      element: <GeneralPagesRoutes />,
      children: [
        {
          label: "Home",
          path: "/",
          element: <Home />,
        },
        {
          label: "Login",
          path: "/login",
          element: <Login />,
        },
        {
          label: "Signup",
          path: "/signup",
          element: <Signup />,
        },
        {
          label: "Forgot Password",
          path: "/password-reset",
          element: <ResetPassword />,
        },
      ],
    },
    {
      path: "/",
      element: <AuthenticatedRoutes />,
      children: [
        {
          label: "Dashboard",
          path: "/dashboard",
          element: <Dashboard />,
        },
        {
          label: "Dashboard",
          path: "/dashboard/:id",
          element: <LoanPostDetails />,
        },
        {
          label: "Profile",
          path: "/profile",
          element: <Profile />,
        },
        {
          label: "Profile Details",
          path: "/profile/:id",
          element: <ProfileDetails />,
        },
        {
          label: "Settings",
          path: "/settings",
          element: <Settings />,
        },
        {
          label: "Crowd Funding",
          path: "/crowdfunding",
          element: <Crowdfunding />,
        },
        {
          label: "Crowd Funding project Details",
          path: "/crowdfunding/:id",
          element: <CrowdfundingDetails />,
        },
      ],
    },
  ];
  