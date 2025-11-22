import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Link } from "react-router";
import { Button } from "../ui/button";
import classNames from "classnames";

const AuthRequiredDialog = ({
  children,
  title = "Yêu cầu đăng nhập",
  description = "Vui lòng đăng nhập để tiếp tục",
  count,
  Icon,
  iconSize,
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className={classNames("border-none text-gray-600 shadow-none", {
            "bg-black text-white hover:bg-black/80": children,
          })}
        >
          {Icon && <Icon style={iconSize} />}
          {count !== undefined && count !== null && <span>{count}</span>}
          {children && <div>{children}</div>}
        </Button>
      </DialogTrigger>
      <DialogContent className="flex max-h-[380px] max-w-[400px] flex-col justify-center border-none">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl">{title}</DialogTitle>
          {description && (
            <DialogDescription className="text-center">
              {description}
            </DialogDescription>
          )}
        </DialogHeader>
        <Button asChild className="w-full text-lg font-semibold">
          <Link to="/login">Đăng nhập</Link>
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default AuthRequiredDialog;
