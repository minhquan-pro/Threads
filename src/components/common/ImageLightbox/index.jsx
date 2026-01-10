import { useEffect, useState } from "react";
import { useIsDesktop } from "@/hooks";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const ImageLightbox = ({
  images,
  currentIndex,
  onClose,
  onPrevious,
  onNext,
}) => {
  const isDeskTop = useIsDesktop();
  const [isClosing, setIsClosing] = useState(false);

  const isVideo = (url) => {
    const videoExtensions = [".mp4", ".webm", ".ogg", ".mov"];
    return videoExtensions.some((ext) => url.toLowerCase().endsWith(ext));
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && onPrevious) onPrevious();
      if (e.key === "ArrowRight" && onNext) onNext();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    document.body.classList.add("imageOverlay");

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.documentElement.style.overflow = "unset";
      document.body.style.overflow = "unset";
      document.body.classList.remove("imageOverlay");
    };
  }, [onClose, onPrevious, onNext]);

  useEffect(() => {
    const handleEvent = (event) => {
      if (event.deltaY <= -100) {
        setIsClosing(true);
        setTimeout(() => {
          onClose();
        }, 300);
      }
    };

    window.addEventListener("wheel", handleEvent, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleEvent);
    };
  }, [onClose]);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/95 transition-opacity duration-900 ${
        isClosing ? "opacity-0" : "opacity-100"
      }`}
      onClick={onClose}
    >
      {/* Close Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        className="absolute top-10 left-5 z-50 rounded-full bg-[#0a0a0a] p-2 text-gray-300 shadow-md transition-colors hover:opacity-80"
        aria-label="Close"
      >
        <X size={28} />
      </button>

      {/* Previous Button */}
      {images.length > 1 && currentIndex > 0 && isDeskTop && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onPrevious();
          }}
          className="absolute left-4 z-50 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
          aria-label="Previous image"
        >
          <ChevronLeft size={32} />
        </button>
      )}

      {/* Next Button */}
      {images.length > 1 && isDeskTop && currentIndex < images.length - 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          className="absolute right-4 z-50 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
          aria-label="Next image"
        >
          <ChevronRight size={32} />
        </button>
      )}

      {/* Media (Image or Video) */}
      <div
        className={`pointer-events-none relative z-10 h-full w-full transition-all duration-300 ${
          isClosing ? "translate-y-full opacity-0" : "translate-y-0 opacity-100"
        }`}
      >
        {isVideo(images[currentIndex]) ? (
          <video
            src={images[currentIndex]}
            className="pointer-events-auto z-50 h-full w-full object-contain"
            controls
            autoPlay
            onClick={(e) => e.stopPropagation()}
          />
        ) : (
          <img
            src={images[currentIndex]}
            alt={`Image ${currentIndex + 1}`}
            className="pointer-events-auto z-50 h-full w-full object-contain transition-opacity duration-300"
            onClick={(e) => e.stopPropagation()}
          />
        )}

        {/* Image Counter */}
        {images.length > 1 && (
          <div className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-3 py-1 text-sm text-white">
            {currentIndex + 1} / {images.length}
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageLightbox;
