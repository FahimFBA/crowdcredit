import { INavbarOptions } from "@/types/interface";

export const NavOptions: INavbarOptions[] = [
  {
    id: 1,
    label: "Home",
    path: "/",
  },
  {
    id: 2,
    label: "Login",
    path: "/login",
  },
  {
    id: 3,
    label: "Sign Up",
    path: "/signup",
  },
];

export const AuthenticatedNavOptions: INavbarOptions[] = [
  {
    id: 1,
    label: "Dashboard",
    path: "/dashboard",
  },
  {
    id: 3,
    label: "Crowdfunding",
    path: "/crowdfunding",
  },
  {
    id: 2,
    label: "Profile",
    path: "/profile",
  },
];
