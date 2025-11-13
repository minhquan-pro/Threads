import AuthRequiredDialog from "@/components/AuthRequiredDialog";
import { Button } from "@/components/ui/button";

const buttonClasses = `m-auto cursor-pointer border-none text-gray-500 shadow-none`;

const PostInteractions = ({ onClick, count, Icon, title, description }) => {
  const currentUser = null;

  if (currentUser) {
    return (
      <div>
        <Button onClick={onClick} variant="outline" className={buttonClasses}>
          <Icon />
          {count ? <span>{count}</span> : null}
        </Button>
      </div>
    );
  }

  return (
    <div>
      <AuthRequiredDialog
        type="button"
        title={title}
        description={description}
        Component={Icon}
        count={count}
        buttonClasses={buttonClasses}
      />
    </div>
  );
};
export default PostInteractions;
