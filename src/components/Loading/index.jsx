const Loading = ({ children, size, className }) => {
  return (
    <div className="flex items-center gap-2">
      <div
        className={`${size} animate-spin rounded-full border-2 border-t-transparent ${className && className}`}
      />
      {children}
    </div>
  );
};
export default Loading;
