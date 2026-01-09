import useEmblaCarousel from "embla-carousel-react";

const PostContent = ({ content, mediaUrls }) => {
  const [emblaRef] = useEmblaCarousel({
    align: "start",
    slidesToScroll: 1,
    containScroll: "trimSnaps",
  });

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
          {mediaUrls.length <= 2 ? (
            // Grid layout cho 1-2 ảnh
            <div
              className="mb-1 grid gap-2"
              style={{
                gridTemplateColumns: `repeat(${mediaUrls.length}, 1fr)`,
              }}
            >
              {mediaUrls.map((url, index) => (
                <div key={url} className="relative">
                  <img
                    src={url}
                    alt={`Image ${index + 1}`}
                    className="h-80 w-full rounded-md object-cover"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          ) : (
            // Embla Carousel cho 3+ ảnh - Hiển thị 2.5 ảnh
            <div className="mb-1 overflow-hidden" ref={emblaRef}>
              <div className="flex touch-pan-y gap-2">
                {mediaUrls.map((url, index) => (
                  <div
                    key={url}
                    className="relative min-w-0 shrink-0"
                    style={{ flex: "0 0 calc((100% - 16px) / 2.5)" }}
                  >
                    <img
                      src={url}
                      alt={`Image ${index + 1}`}
                      className="h-56 w-full rounded-md object-cover"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PostContent;
