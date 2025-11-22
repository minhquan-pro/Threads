import AuthRequiredDialog from "@/components/AuthRequiredDialog";
import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/features/auth";

const buttonClasses = `m-auto border-none shadow-none`;

const Interactions = ({
  onClick,
  isActive,
  activeClass,
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
        className={`${buttonClasses} ${isActive && activeClass}`}
      >
        {Icon && <Icon className={`${isActive && "fill-current"}`} />}
        {count ? <span>{count}</span> : null}
      </Button>
    </div>
  );
};
export default Interactions;
