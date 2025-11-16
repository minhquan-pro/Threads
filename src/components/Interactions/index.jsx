import AuthRequiredDialog from "@/components/AuthRequiredDialog";
import { Button } from "@/components/ui/button";
import classNames from "classnames";

const buttonClasses = `m-auto cursor-pointer border-none shadow-none`;

const Interactions = ({ onClick, isLike, count, Icon, title, description }) => {
  const currentUser = "Minhquan";

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
          "text-red-500": isLike,
        })}
      >
        {Icon && <Icon className={`${isLike && "fill-current"}`} />}
        {count ? <span>{count}</span> : null}
      </Button>
    </div>
  );
};
export default Interactions;
