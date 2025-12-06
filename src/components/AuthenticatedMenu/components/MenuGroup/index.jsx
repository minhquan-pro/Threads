import { DropdownMenuGroup } from "@/components/ui/dropdown-menu";

const MenuGroup = ({ items, renderMenuItem }) => {
  return (
    <DropdownMenuGroup>
      {items.map((menu) => {
        return renderMenuItem(menu);
      })}
    </DropdownMenuGroup>
  );
};
export default MenuGroup;
