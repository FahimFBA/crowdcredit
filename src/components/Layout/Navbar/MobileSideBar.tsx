import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { NavOptions } from "./NavOptions";
import { INavbarOptions } from "@/types/interface";
import { LinkItem } from "./Items";
import { RxHamburgerMenu, RxBackpack } from "react-icons/rx";

export const MobileSideBar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="flex md:hidden">
          <RxHamburgerMenu className="w-6 h-6" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader className="pt-4">
          <SheetTitle className="flex justify-center pb-6">
            <RxBackpack className="w-8 h-8" />
          </SheetTitle>
          <div className="flex gap-3 flex-col items-center">
            {NavOptions?.map((item: INavbarOptions) => (
              <LinkItem
                key={item?.id}
                {...item}
                onClick={() => setIsOpen(false)}
              />
            ))}
          </div>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};
