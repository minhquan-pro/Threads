const Loading = ({ size }) => {
  return (
    <div
      className={`${size} animate-spin rounded-full border-2 border-t-transparent`}
    />
  );
};
export default Loading;
