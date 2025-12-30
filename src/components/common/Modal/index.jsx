import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useScrollLock } from "@/hooks/useScrollLock";

const TRANSITION_DURATION = 200;

export const Modal = ({ isOpen, onClose, children, className = "" }) => {
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  useScrollLock(isOpen);

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (!containerRef.current) {
      const container = document.createElement("div");
      container.id = "modal-container";
      containerRef.current = container;
    }
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    if (isOpen) {
      if (!document.body.contains(containerRef.current)) {
        document.body.appendChild(containerRef.current);
      }
      setShouldRender(true);

      requestAnimationFrame(() => {
        setIsVisible(true);
      });

      document.documentElement.style.scrollbarGutter = "stable";
      document.body.style.overflow = "hidden";

      const handleEscape = (e) => {
        if (e.key === "Escape") {
          handleClose();
        }
      };
      document.addEventListener("keydown", handleEscape);

      return () => {
        document.removeEventListener("keydown", handleEscape);
      };
    } else {
      setIsVisible(false);

      const timer = setTimeout(() => {
        setShouldRender(false);
        document.body.style.overflow = "";
        document.documentElement.style.scrollbarGutter = "";
        if (document.body.contains(containerRef.current)) {
          document.body.removeChild(containerRef.current);
        }
      }, TRANSITION_DURATION);

      return () => clearTimeout(timer);
    }
  }, [isOpen, handleClose]);

  const handleBackdropClick = () => {
    handleClose();
  };

  if (!shouldRender) return null;

  return createPortal(
    <div
      className={`fixed inset-0 z-50 transition-all duration-200 ${
        isVisible ? "bg-black/80" : "bg-black/0"
      }`}
      onClick={handleBackdropClick}
      role="presentation"
    >
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-200 ${
          isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"
        } ${className}`}
      >
        {children}
      </div>
    </div>,
    containerRef.current,
  );
};

export const ModalContent = ({ children, className = "" }) => {
  return (
    <div
      className={`relative w-full rounded-2xl bg-white shadow-2xl transition-all duration-200 dark:bg-[#181818] ${
        className || ""
      }`}
      onClick={(e) => e.stopPropagation()}
    >
      {children}
    </div>
  );
};

export const ModalTitle = ({ children, className = "" }) => {
  return (
    <h2
      className={`text-lg leading-tight font-semibold ${className || ""}`}
      role="heading"
      aria-level="2"
    >
      {children}
    </h2>
  );
};
