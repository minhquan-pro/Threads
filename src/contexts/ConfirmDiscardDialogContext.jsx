import { createContext } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const ConfirmDiscardDialogContext = createContext({
  showSaveOption: false,
});

export const ConfirmDiscardDialogProvider = ({
  children,
  showSaveOption = false,
  title = "Lưu làm bản nháp?",
  desc = "Lưu bản nháp để chỉnh sửa và đăng vào lúc khác.",
}) => {
  return (
    <ConfirmDiscardDialogContext.Provider
      value={{ showSaveOption, title, desc }}
    >
      {children}
    </ConfirmDiscardDialogContext.Provider>
  );
};
