import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  Button,
} from "../ui";
import { FC } from "react";
import { Loader2 } from "lucide-react";
import { IBaseModalProps } from "@/types/interface";
import { useControlledState } from "@/_Hooks";
import { cn } from "@/lib/utils";

export const BaseModal: FC<IBaseModalProps> = ({
  className = "",
  onConfirm,
  children,
  text: {
    dialogueTitle = "Dialogue Title",
    dialogueDescription = "Dialogue Description",
  },
  triggerBtn,
  confirmButtonText = "Confirm",
  confirmButtonID = "",
  status: { isLoading, isLoadingText },
  state: { modalState, setModalState },
}) => {
  const [localState, handleOpenChange] = useControlledState({
    controlledState: modalState,
    onStateChange: setModalState,
  });

  const formOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onConfirm();
  };

  const footerBtnSwitches = isLoading ? (
    <Button size="sm" variant="secondary" className="flex gap-1" disabled>
      <Loader2 className="h-[18px] w-[18px] animate-spin text-primary" />
      {isLoadingText}
    </Button>
  ) : (
    <Button size="sm" id={confirmButtonID}>
      {confirmButtonText}
    </Button>
  );

  return (
    <Dialog open={localState} onOpenChange={handleOpenChange}>
      {triggerBtn && <DialogTrigger asChild>{triggerBtn}</DialogTrigger>}

      <DialogContent
        className={cn("sm:max-w-[425px]", className)}
        onClick={() => (document.body.style.pointerEvents = "")}
      >
        <form onSubmit={formOnSubmit}>
          <DialogHeader>
            <DialogTitle className="text-xl">{dialogueTitle}</DialogTitle>
            <DialogDescription>{dialogueDescription}</DialogDescription>
          </DialogHeader>
          <div className={cn("grid gap-4 my-3")}>{children}</div>
          <DialogFooter>
            <DialogClose asChild>
              <Button
                type="button"
                size="sm"
                variant="link"
                className={cn("text-black")}
              >
                Cancel
              </Button>
            </DialogClose>
            {footerBtnSwitches}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
