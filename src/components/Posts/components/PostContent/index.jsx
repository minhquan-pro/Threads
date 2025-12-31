import useEmblaCarousel from "embla-carousel-react";

const PostContent = ({ content, mediaUrls }) => {
  const [emblaRef] = useEmblaCarousel();

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
        <div ref={emblaRef} className="embla mb-1 overflow-hidden">
          <div className={`flex items-center gap-2`}>
            {mediaUrls.map((url, index) => {
              return (
                <div
                  key={url}
                  className="embla__slide relative min-w-0 flex-[0_0_100%]"
                >
                  <img
                    src={url}
                    alt={`Image ${index + 1}`}
                    className="h-80 rounded-md object-cover"
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
