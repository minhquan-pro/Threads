import { useIsDesktop } from "@/hooks";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect } from "react";

const ImageLightbox = ({
  images,
  currentIndex,
  onClose,
  onPrevious,
  onNext,
}) => {
  const isDeskTop = useIsDesktop();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && onPrevious) onPrevious();
      if (e.key === "ArrowRight" && onNext) onNext();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    document.body.classList.add("imageOverlay");

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
      document.body.classList.remove("imageOverlay");
    };
  }, [onClose, onPrevious, onNext]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95"
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

      {/* Image */}
      <div className="pointer-events-none relative z-10 h-full w-full">
        <img
          src={images[currentIndex]}
          alt={`Image ${currentIndex + 1}`}
          className="pointer-events-auto z-50 h-full w-full object-contain"
          onClick={(e) => e.stopPropagation()}
        />

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
