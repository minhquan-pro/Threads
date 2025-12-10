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
          className={classNames(
            "border-none bg-transparent text-gray-600 shadow-none dark:text-gray-400",
            {
              "bg-black text-white hover:bg-black/80 dark:bg-white dark:text-black dark:hover:bg-white/90":
                children,
            },
          )}
        >
          {Icon && <Icon style={iconSize} />}
          {count !== undefined && count !== null && <span>{count}</span>}
          {children && <div>{children}</div>}
        </Button>
      </DialogTrigger>
      <DialogContent className="flex max-h-[380px] max-w-[400px] flex-col justify-center border-none bg-white dark:bg-[#181818]">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl text-gray-900 dark:text-white">
            {title}
          </DialogTitle>
          {description && (
            <DialogDescription className="text-center text-gray-600 dark:text-gray-400">
              {description}
            </DialogDescription>
          )}
        </DialogHeader>
        <Button
          asChild
          className="w-full text-lg font-semibold dark:bg-white dark:text-black dark:hover:bg-gray-200"
        >
          <Link to="/login">Đăng nhập</Link>
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default AuthRequiredDialog;
