import useEmblaCarousel from "embla-carousel-react";
import { useState } from "react";
import ImageLightbox from "@/components/common/ImageLightbox";

const PostContent = ({ content, mediaUrls }) => {
  const [emblaRef] = useEmblaCarousel({
    align: "start",
    slidesToScroll: 1,
    containScroll: "trimSnaps",
  });
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openLightbox = (index) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const goToPrevious = () => {
    setCurrentImageIndex((prev) => Math.max(0, prev - 1));
  };

  const goToNext = () => {
    setCurrentImageIndex((prev) => Math.min(mediaUrls.length - 1, prev + 1));
  };

  return (
    <div className="-mt-0.5">
      {content && (
        <p
          className="mb-1 overflow-hidden text-[15px] wrap-break-word whitespace-pre-wrap text-gray-900 dark:text-gray-100"
          style={{ overflowWrap: "anywhere" }}
        >
          {content}
        </p>
      )}

      {mediaUrls && mediaUrls.length > 0 && (
        <>
          {mediaUrls.length === 1 ? (
            <div
              onClick={(e) => {
                e.stopPropagation();
              }}
              className="mb-1 flex items-start justify-start"
            >
              {mediaUrls.map((url, index) => (
                <div key={url} className="relative" style={{ height: "200px" }}>
                  <img
                    src={url}
                    alt={`Image ${index + 1}`}
                    className="h-full w-auto cursor-pointer rounded-md object-contain transition-opacity hover:opacity-90"
                    loading="lazy"
                    onClick={(e) => {
                      e.stopPropagation();
                      openLightbox(index);
                    }}
                  />
                </div>
              ))}
            </div>
          ) : mediaUrls.length === 2 ? (
            <div
              onClick={(e) => {
                e.stopPropagation();
              }}
              className="mb-1 flex gap-2"
              style={{ justifyContent: "flex-start" }}
            >
              {mediaUrls.map((url, index) => (
                <div key={url} className="relative" style={{ height: "200px" }}>
                  <img
                    src={url}
                    alt={`Image ${index + 1}`}
                    className="h-full w-auto cursor-pointer rounded-md object-contain transition-opacity hover:opacity-90"
                    loading="lazy"
                    onClick={(e) => {
                      e.stopPropagation();
                      openLightbox(index);
                    }}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div
              onClick={(e) => {
                e.stopPropagation();
              }}
              className="mb-1 overflow-hidden"
              ref={emblaRef}
            >
              <div className="flex touch-pan-y items-start gap-2">
                {mediaUrls.map((url, index) => (
                  <div
                    key={url}
                    className="relative min-w-0 shrink-0"
                    style={{ height: "200px" }}
                  >
                    <img
                      src={url}
                      alt={`Image ${index + 1}`}
                      className="h-full w-auto cursor-pointer rounded-md object-contain transition-opacity hover:opacity-90"
                      loading="lazy"
                      onClick={(e) => {
                        e.stopPropagation();
                        openLightbox(index);
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      {lightboxOpen && (
        <ImageLightbox
          images={mediaUrls}
          currentIndex={currentImageIndex}
          onClose={closeLightbox}
          onPrevious={goToPrevious}
          onNext={goToNext}
        />
      )}
    </div>
  );
};

export default PostContent;
