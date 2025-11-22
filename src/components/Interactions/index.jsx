import AuthRequiredDialog from "@/components/AuthRequiredDialog";
import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/features/auth";

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
      <AuthRequiredDialog
        type="button"
        title={title}
        description={description}
        Icon={Icon}
        count={count}
      />
    );
  }

  return (
    <Button
      onClick={onClick}
      variant="outline"
      className={`border-none shadow-none ${isActive && activeClass}`}
    >
      {Icon && <Icon className={`${isActive && "fill-current"}`} />}
      {count ? <span>{count}</span> : null}
    </Button>
  );
};
export default Interactions;
