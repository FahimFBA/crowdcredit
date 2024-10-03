import { containerDefinition } from "@/_Variables";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { RxMoon } from "react-icons/rx";
import { NavItems } from "./Items";
import { MobileSideBar } from "./MobileSideBar";
import { useTheme } from "@/_Hooks/useTheme";
import { ILayoutHOCProps } from "@/Pages";

export const Navbar = ({ reduxState }: ILayoutHOCProps) => {
  const { toggleTheme } = useTheme();

  return (
    <header className="fixed top-0 z-50 w-screen border-b backdrop-blur-sm">
      <div
        className={cn(
          containerDefinition,
          "flex py-4 justify-between items-center",
        )}
      >
        <NavItems reduxState={reduxState} />
        <div className="flex items-center justify-end space-x-4">
          <Button onClick={toggleTheme} variant="ghost" size="icon">
            <RxMoon className="w-6 h-6" />
          </Button>
          <MobileSideBar />
        </div>
      </div>
    </header>
  );
};
