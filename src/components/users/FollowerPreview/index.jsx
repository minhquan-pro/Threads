import defaultImageUser from "@/assets/images/defaultImageUser.png";

const FollowerPreview = ({ followerCount = 100 }) => {
  return (
    <div className="mt-3 flex gap-1">
      <div className="flex items-center -space-x-2">
        <img
          src={defaultImageUser}
          alt="Follower 1"
          className="h-5 w-5 rounded-full border-2 border-white dark:border-[#181818]"
        />
        <img
          src={defaultImageUser}
          alt="Follower 2"
          className="h-5 w-5 rounded-full border-2 border-white dark:border-[#181818]"
        />
        <img
          src={defaultImageUser}
          alt="Follower 3"
          className="h-5 w-5 rounded-full border-2 border-white dark:border-[#181818]"
        />
      </div>
      <p className="text-sm font-semibold dark:text-gray-500">
        {followerCount} người theo dõi
      </p>
    </div>
  );
};

export default FollowerPreview;
