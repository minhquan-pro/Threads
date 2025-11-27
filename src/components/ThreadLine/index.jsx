const ThreadLine = ({ show }) => {
  if (!show) return null;
  return (
    <div
      className="absolute top-12 left-5 w-0.5 bg-gray-300"
      style={{ height: "calc(100% - 2.5rem)" }}
    />
  );
};

export default ThreadLine;
