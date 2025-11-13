/* eslint-disable no-unused-vars */
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import classNames from "classnames";
import { Link } from "react-router";
import { Button } from "../ui/button";

const AuthRequiredDialog = ({
  type,
  id,
  title,
  description,
  buttonClasses,
  Component,
  count,
}) => {
  const ElementType = type ? Button : "div";

  return (
    <Dialog>
      <DialogTrigger asChild>
        <ElementType
          variant="outline"
          className={classNames(buttonClasses, {
            "bg-gray-100 hover:text-black": id === "create",
          })}
        >
          <Component />
          {count ? <span>{count}</span> : null}
        </ElementType>
      </DialogTrigger>
      <DialogContent className="flex max-h-[380px] max-w-[400px] flex-col justify-center">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl">{title}</DialogTitle>
          <DialogDescription className="text-center">
            {description}
          </DialogDescription>
        </DialogHeader>
        <Link
          to={"/login"}
          className="rounded-md border bg-black p-3 text-center text-lg font-semibold text-white shadow-sm hover:opacity-80"
        >
          Đăng nhập
        </Link>
      </DialogContent>
    </Dialog>
  );
};

export default AuthRequiredDialog;
