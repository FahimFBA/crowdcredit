import { IBaseSheetComponent } from "@/types/interface";
import {
  Button,
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui";

export const BaseSheetComponent = ({
  trigger,
  setSheetState,
  sheetState,
  title,
  description,
  handleSubmit,
  children,
  isLoading,
  buttonText,
}: IBaseSheetComponent) => {
  return (
    <Sheet open={sheetState} onOpenChange={setSheetState}>
      <SheetTrigger>{trigger}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription>{description}</SheetDescription>
        </SheetHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(e);
          }}
        >
          {children}
          <SheetFooter>
            <SheetClose>
              <Button variant="link" size="sm" type="button">
                cancel
              </Button>
            </SheetClose>
            {isLoading ? (
              <Button variant="secondary" disabled size="sm" type="submit">
                Creating....
              </Button>
            ) : (
              <Button variant="default" size="sm" type="submit">
                {buttonText}
              </Button>
            )}
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
};
