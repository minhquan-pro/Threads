const CurvedBorderBottom = () => {
  return (
    <div>
      <div className="absolute bottom-0 m-auto flex w-[calc(100%-55px)] border border-gray-100"></div>
      {/* Left */}
      <div className="absolute -bottom-5 left-1 h-8 w-8 bg-white">
        <div className="absolute -bottom-[26px] left-[21px] h-12 w-4 rounded-tl-4xl border border-gray-200 border-r-transparent border-b-transparent"></div>
      </div>
      {/* Right */}
      <div className="absolute right-1 -bottom-5 h-8 w-8 bg-white">
        <div className="absolute right-[20.5px] -bottom-[26.5px] h-12 w-4 rounded-tr-4xl border border-gray-200 border-b-transparent border-l-transparent"></div>
      </div>
    </div>
  );
};
export default CurvedBorderBottom;
