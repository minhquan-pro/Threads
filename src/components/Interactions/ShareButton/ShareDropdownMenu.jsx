/* eslint-disable no-unused-vars */
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

const ShareDropdownMenu = ({ items }) => {
  return (
    <>
      {items.map(({ id, label, Icon, onClick }) => {
        return (
          <DropdownMenuItem
            key={id}
            className="text-md flex justify-between p-3 font-semibold"
            onClick={onClick}
          >
            <span>{label}</span>
            <Icon className="mr-2 h-4 w-4" />
          </DropdownMenuItem>
        );
      })}
    </>
  );
};
export default ShareDropdownMenu;
