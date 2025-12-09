const Loading = ({ children, size = "w-6 h-6", className }) => {
  return (
    <div className="flex items-center gap-2">
      <div
        className={`${size} animate-spin rounded-full border-2 border-gray-800 border-t-transparent dark:border-gray-300 dark:border-t-transparent ${className || ""}`}
      />
      {children && (
        <span className="text-gray-600 dark:text-gray-400">{children}</span>
      )}
    </div>
  );
};

export default Loading;
