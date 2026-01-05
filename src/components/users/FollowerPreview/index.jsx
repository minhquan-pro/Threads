import defaultImageUser from "@/assets/images/defaultImageUser.png";

const avatars = [
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
  defaultImageUser,
];

const FollowerPreview = ({ followerCount = 100 }) => {
  return (
    <div className="mt-3 flex gap-1">
      <div className="flex items-center -space-x-2">
        {avatars.map((avatar) => {
          return (
            <img
              key={avatar}
              src={avatar}
              alt="Follower 1"
              className="h-5 w-5 rounded-full border-2 border-white object-cover dark:border-[#181818]"
            />
          );
        })}
      </div>
      <p className="text-sm font-semibold dark:text-gray-500">
        {followerCount} người theo dõi
      </p>
    </div>
  );
};

export default FollowerPreview;
