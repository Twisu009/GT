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

import React from "react";
import { ZodIssue } from "zod";

interface ErrorModalProps {
  title?: string;
  message: string;
  validationError?: ZodIssue[];
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onOk?: () => void;
}

export const ErrorModal = ({
  title = "Error!",
  message,
  isOpen,
  validationError,
  setOpen,
  onOk = () => {
    setOpen(false);
  },
}: ErrorModalProps) => {
  return (
    <AlertDialog open={isOpen}>
      {/* <AlertDialogTrigger>Open</AlertDialogTrigger> */}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-red-600">{title}</AlertDialogTitle>
          <AlertDialogDescription>
            {validationError ? (
              validationError.map((err, index) => (
                <div>
                  {index + 1}.{" "}
                  {err.path.map((val) => (
                    <>{val}</>
                  ))}{" "}
                  : {err.message}
                </div>
              ))
            ) : (
              <>{message}</>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={onOk}>OK</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
