import useEmblaCarousel from "embla-carousel-react";

const PostContent = ({ content, mediaUrls }) => {
  const [emblaRef] = useEmblaCarousel();
  return (
    <div className="mt-1">
      <p className="mb-1 text-[15px] wrap-break-word">{content}</p>
      {mediaUrls && (
        <div ref={emblaRef} className="w-full">
          <div className="flex items-center gap-2">
            {mediaUrls.map((url) => {
              return (
                <img
                  key={url}
                  src={url}
                  alt=""
                  className="max-h-80 min-w-40 rounded-md object-cover"
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
export default PostContent;
