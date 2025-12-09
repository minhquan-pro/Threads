import useEmblaCarousel from "embla-carousel-react";

const PostContent = ({ content, mediaUrls }) => {
  const [emblaRef] = useEmblaCarousel();

  return (
    <div className="mt-1">
      {content && (
        <p
          className="mb-1 overflow-hidden text-[15px] wrap-break-word whitespace-pre-wrap text-gray-900 dark:text-gray-100"
          style={{ overflowWrap: "anywhere" }}
        >
          {content}
        </p>
      )}

      {mediaUrls && mediaUrls.length > 0 && (
        <div ref={emblaRef} className="embla mb-1 w-full overflow-hidden">
          <div className="embla__container flex items-center gap-2">
            {mediaUrls.map((url, index) => {
              return (
                <div
                  key={url}
                  className="embla__slide relative min-w-0 flex-[0_0_100%]"
                >
                  <img
                    src={url}
                    alt={`Image ${index + 1}`}
                    className="max-h-80 min-w-40 rounded-md object-cover ring-1 ring-gray-200 dark:ring-gray-800"
                    loading="lazy"
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default PostContent;
