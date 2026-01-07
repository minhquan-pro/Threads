import { Check } from "lucide-react";

export const ToastSuccess = ({ message, onView, viewLabel = "Xem" }) => {
  return (
    <div className="flex w-full items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <Check size={18} className="shrink-0" />
        <span>{message}</span>
      </div>
      {onView && (
        <button
          className="mr-3 shrink-0 text-sm shadow-none hover:opacity-80"
          onClick={onView}
        >
          {viewLabel}
        </button>
      )}
    </div>
  );
};
