const CurvedBorderBottom = () => {
  return (
    <div className="relative">
      {/* Center horizontal border */}
      <div className="dark:bg-card-dark absolute bottom-0 m-auto flex w-[calc(100%-10px)] border-b border-gray-200 dark:border-[#181818]" />

      {/* Left curved corner */}
      <div className="absolute -bottom-[21px] left-1 h-8 w-8 bg-white dark:bg-black">
        <div className="bg absolute -bottom-[26px] left-[21px] h-12 w-4 rounded-tl-4xl border border-gray-200 border-r-transparent border-b-transparent bg-white dark:border-[#181818] dark:border-r-transparent dark:border-b-transparent dark:bg-[#181818]" />
      </div>

      {/* Right curved corner */}
      <div className="absolute right-1 -bottom-[20.5px] h-8 w-8 bg-white dark:bg-black">
        <div className="absolute right-[20.5px] -bottom-[26.5px] h-12 w-4 rounded-tr-4xl border border-gray-200 border-b-transparent border-l-transparent bg-white dark:border-[#181818] dark:border-b-transparent dark:border-l-transparent dark:bg-[#181818]" />
      </div>
    </div>
  );
};

export default CurvedBorderBottom;
