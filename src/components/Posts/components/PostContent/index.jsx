import useEmblaCarousel from "embla-carousel-react";
import { useState, useRef, useEffect } from "react";
import ImageLightbox from "@/components/common/ImageLightbox";
import { Volume2, VolumeX } from "lucide-react";

const PostContent = ({ content, mediaUrls }) => {
  const [emblaRef] = useEmblaCarousel({
    align: "start",
    slidesToScroll: 1,
    containScroll: "trimSnaps",
  });
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [mutedVideos, setMutedVideos] = useState({});
  const videoRefs = useRef({});

  const isVideo = (url) => {
    const videoExtensions = [".mp4", ".webm", ".ogg", ".mov"];
    return videoExtensions.some((ext) => url.toLowerCase().endsWith(ext));
  };

  const toggleMute = (index) => {
    const videoElement = videoRefs.current[index];
    if (videoElement) {
      videoElement.muted = !videoElement.muted;
      setMutedVideos((prev) => ({
        ...prev,
        [index]: videoElement.muted,
      }));
    }
  };

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

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target;
          if (entry.isIntersecting) {
            // Chỉ tự động play nếu có autoplay attribute hoặc là video duy nhất
            if (video.hasAttribute("autoplay") || mediaUrls.length === 1) {
              video.play();
            }
          } else {
            video.pause();
          }
        });
      },
      {
        threshold: 0.5,
      },
    );

    Object.values(videoRefs.current).forEach((video) => {
      if (video) {
        observer.observe(video);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [mediaUrls]);

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
                <div
                  key={url}
                  className="relative"
                  style={{ height: isVideo(url) ? "350px" : "320px" }}
                >
                  {isVideo(url) ? (
                    <div className="relative h-full">
                      <video
                        ref={(el) => (videoRefs.current[index] = el)}
                        src={url}
                        className="h-full w-auto cursor-pointer rounded-lg object-cover transition-opacity select-none hover:opacity-90"
                        autoPlay
                        muted
                        loop
                        playsInline
                        onClick={(e) => {
                          e.stopPropagation();
                          openLightbox(index);
                        }}
                      />
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleMute(index);
                        }}
                        className="absolute right-2 bottom-2 rounded-full bg-black/50 p-2 text-white transition-colors hover:bg-black/70"
                        aria-label="Toggle mute"
                      >
                        {mutedVideos[index] !== false ? (
                          <VolumeX size={16} />
                        ) : (
                          <Volume2 size={16} />
                        )}
                      </button>
                    </div>
                  ) : (
                    <img
                      src={url}
                      alt={`Image ${index + 1}`}
                      className="h-full w-auto cursor-pointer rounded-md object-cover transition-opacity select-none hover:opacity-90"
                      loading="lazy"
                      onClick={(e) => {
                        e.stopPropagation();
                        openLightbox(index);
                      }}
                    />
                  )}
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
                <div
                  key={url}
                  className="relative"
                  style={{ height: isVideo(url) ? "350px" : "200px" }}
                >
                  {isVideo(url) ? (
                    <div className="relative h-full">
                      <video
                        ref={(el) => (videoRefs.current[index] = el)}
                        src={url}
                        className="h-full w-auto cursor-pointer rounded-lg object-cover transition-opacity select-none hover:opacity-90"
                        autoPlay={index === 0}
                        muted
                        loop
                        playsInline
                        onClick={(e) => {
                          e.stopPropagation();
                          openLightbox(index);
                        }}
                      />
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleMute(index);
                        }}
                        className="absolute right-2 bottom-2 rounded-full bg-black/50 p-2 text-white transition-colors hover:bg-black/70"
                        aria-label="Toggle mute"
                      >
                        {mutedVideos[index] !== false ? (
                          <VolumeX size={16} />
                        ) : (
                          <Volume2 size={16} />
                        )}
                      </button>
                    </div>
                  ) : (
                    <img
                      src={url}
                      alt={`Image ${index + 1}`}
                      className="h-full w-auto cursor-pointer rounded-md object-cover transition-opacity select-none hover:opacity-90"
                      loading="lazy"
                      onClick={(e) => {
                        e.stopPropagation();
                        openLightbox(index);
                      }}
                    />
                  )}
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
                    style={{ height: isVideo(url) ? "350px" : "200px" }}
                  >
                    {isVideo(url) ? (
                      <div className="relative">
                        <video
                          ref={(el) => (videoRefs.current[index] = el)}
                          src={url}
                          className="h-full w-auto cursor-pointer rounded-lg object-cover transition-opacity select-none hover:opacity-90"
                          autoPlay={index === 0}
                          muted
                          loop
                          playsInline
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                        />
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleMute(index);
                          }}
                          className="absolute right-2 bottom-2 rounded-full bg-black/50 p-2 text-white transition-colors hover:bg-black/70"
                          aria-label="Toggle mute"
                        >
                          {mutedVideos[index] !== false ? (
                            <VolumeX size={16} />
                          ) : (
                            <Volume2 size={16} />
                          )}
                        </button>
                      </div>
                    ) : (
                      <img
                        src={url}
                        alt={`Image ${index + 1}`}
                        className="h-full w-auto cursor-pointer rounded-md object-cover transition-opacity select-none hover:opacity-90"
                        loading="lazy"
                        onClick={(e) => {
                          e.stopPropagation();
                          openLightbox(index);
                        }}
                      />
                    )}
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
