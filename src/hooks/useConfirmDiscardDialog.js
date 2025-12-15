import { ConfirmDiscardDialogContext } from "@/contexts/ConfirmDiscardDialogContext";
import { useContext } from "react";

export const useConfirmDiscardDialog = () => {
  const context = useContext(ConfirmDiscardDialogContext);
  if (!context) {
    console.warn(
      "useConfirmDiscardDialog phải được dùng trong ConfirmDiscardDialogProvider",
    );
    return { showSaveOption: true };
  }
  return context;
};
