import { INavbarOptions } from "@/types/interface";
import { AuthenticatedNavOptions, NavOptions } from "./NavOptions";
import { RxBackpack } from "react-icons/rx";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { ILayoutHOCProps } from "@/pages";
import { useLogoutMutation } from "@/store";

export const LinkItem = ({ path, label, onClick }: INavbarOptions) => {
  return (
    <Link
      to={path}
      className={cn(
        "link-hover flex items-center text-sm font-medium",
        "text-muted-foreground hover:text-foreground",
      )}
      onClick={onClick}
    >
      {label}
    </Link>
  );
};

export const NavItems = ({ reduxState }: ILayoutHOCProps) => {
  const [logout] = useLogoutMutation();

  const userUID = reduxState?.user?.uid;

  return (
    <div className="flex gap-4 items-center">
      <Link to="/">
        <RxBackpack className="w-7 h-7 mr-3" />
      </Link>
      <nav className="hidden md:flex items-center gap-6">
        {!userUID &&
          NavOptions?.map((item: INavbarOptions) => (
            <LinkItem key={item.id} {...item} />
          ))}
        {userUID &&
          AuthenticatedNavOptions?.map((item: INavbarOptions) => (
            <LinkItem key={item.id} {...item} />
          ))}

        {userUID && (
          <LinkItem
            id={100}
            label="Logout"
            onClick={() => logout()}
            path="/login"
          />
        )}
      </nav>
    </div>
  );
};
