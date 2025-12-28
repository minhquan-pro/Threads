import { Modal, ModalContent, ModalTitle } from "@/components/common/Modal";
import { Link } from "react-router";
import { Button } from "../../ui/button";
import classNames from "classnames";
import { useState } from "react";

const AuthRequiredDialog = ({
  id,
  children,
  title = "Yêu cầu đăng nhập",
  description = "Vui lòng đăng nhập để tiếp tục",
  count,
  Icon,
  iconSize,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        variant="outline"
        className={classNames(
          "border-none bg-transparent text-gray-600 shadow-none dark:text-gray-400",
          {
            "bg-black text-white hover:bg-black/80 dark:bg-white dark:text-black dark:hover:bg-white/90":
              children,
          },
          {
            "bg-gray-100 text-black dark:bg-gray-800/50": id === "create",
          },
        )}
        onClick={() => setIsOpen(true)}
      >
        {Icon && <Icon style={iconSize} />}
        {count && <span>{count}</span>}
        {children && <div>{children}</div>}
      </Button>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        className="flex items-center justify-center"
      >
        <ModalContent className="flex max-h-[380px] max-w-[400px] flex-col justify-center border-none bg-white dark:bg-[#181818]">
          <div className="text-center">
            <ModalTitle className="text-center text-2xl text-gray-900 dark:text-white">
              {title}
            </ModalTitle>
            {description && (
              <p className="mt-2 text-center text-gray-600 dark:text-gray-400">
                {description}
              </p>
            )}
          </div>
          <Button
            asChild
            className="w-full text-lg font-semibold dark:bg-white dark:text-black dark:hover:bg-gray-200"
          >
            <Link to="/login">Đăng nhập</Link>
          </Button>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AuthRequiredDialog;
