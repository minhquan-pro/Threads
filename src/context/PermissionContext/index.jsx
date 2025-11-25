import { createContext } from "react";

export const PermissionContext = createContext();

const Provider = ({ children, permission }) => {
  return (
    <PermissionContext.Provider value={{ permission }}>
      {children}
    </PermissionContext.Provider>
  );
};
export default Provider;
