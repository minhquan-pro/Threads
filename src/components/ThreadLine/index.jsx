import classNames from "classnames";

const ThreadLine = ({ show, lineStyle }) => {
  if (!show) return null;
  return (
    <div
      className={classNames(
        "absolute top-12 left-5 w-0.5 bg-gray-400 dark:bg-white",
        lineStyle,
      )}
      style={{ height: "calc(100% - 2.5rem)" }}
    />
  );
};

export default ThreadLine;
