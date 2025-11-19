import { useState } from "react";

export const useMenuSubmenu = () => {
  const [activeSubmenu, setActiveSubmenu] = useState(null);

  const handleActiveSubmenu = (submenu) => {
    console.log(submenu);

    setActiveSubmenu(submenu);
  };

  const handleBack = () => {
    setActiveSubmenu(false);
  };

  return { handleActiveSubmenu, handleBack, activeSubmenu };
};
