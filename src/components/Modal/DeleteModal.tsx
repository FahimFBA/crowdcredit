import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog";
  import { IDeleteEventModalProps } from "@/types/interface";
  import { MouseEventHandler } from "react";
  
  export const DeleteModal = ({
    title,
    icon,
    description,
    onConfirm,
  }: IDeleteEventModalProps) => {
    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>{icon}</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{title}</AlertDialogTitle>
            <AlertDialogDescription>{description}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={
                onConfirm as unknown as MouseEventHandler<HTMLButtonElement>
              }
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  };
  