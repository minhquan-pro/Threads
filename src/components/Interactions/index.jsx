import AuthRequiredDialog from "@/components/auth/AuthRequiredDialog";
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
      variant="ghost"
      size="sm"
      className={`flex items-center gap-1 border-none text-gray-600 shadow-none dark:text-gray-400 dark:hover:bg-gray-800 ${
        isActive ? activeClass : ""
      }`}
    >
      {Icon && <Icon className={`h-4 w-4 ${isActive ? "fill-current" : ""}`} />}
      {count > 0 && <span className="text-sm">{count}</span>}
    </Button>
  );
};

export default Interactions;
