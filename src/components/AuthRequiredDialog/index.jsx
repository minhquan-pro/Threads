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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const AuthRequiredDialog = ({
  children,
  type,
  id,
  title = "",
  description = "",
  buttonClasses = "",
  count,
  Icon,
  sizeIcon,
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
          {Icon && <Icon size={sizeIcon} />}
          {count ? count : null}
          {children}
        </ElementType>
      </DialogTrigger>
      <DialogContent className="flex max-h-[380px] max-w-[400px] flex-col justify-center border-none">
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
