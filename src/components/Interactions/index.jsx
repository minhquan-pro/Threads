import AuthRequiredDialog from "@/components/AuthRequiredDialog";
import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/features/auth";
import classNames from "classnames";

const buttonClasses = `m-auto  border-none shadow-none`;

const Interactions = ({
  onClick,
  isLiked,
  count = 0,
  Icon,
  title,
  description,
}) => {
  const currentUser = useCurrentUser();

  if (!currentUser) {
    return (
      <div>
        <AuthRequiredDialog
          type="button"
          title={title}
          description={description}
          Icon={Icon}
          count={count}
          buttonClasses={buttonClasses}
        />
      </div>
    );
  }

  return (
    <div>
      <Button
        onClick={onClick}
        variant="outline"
        className={classNames(buttonClasses, {
          "text-red-500": isLiked,
        })}
      >
        {Icon && <Icon className={`${isLiked && "fill-current"}`} />}
        {count ? <span>{count}</span> : null}
      </Button>
    </div>
  );
};
export default Interactions;
