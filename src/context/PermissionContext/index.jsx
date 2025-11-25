import { createContext } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const PermissionContext = createContext();

const Provider = ({ children, permission }) => {
  return (
    <PermissionContext.Provider value={{ permission }}>
      {children}
    </PermissionContext.Provider>
  );
};
export default Provider;
