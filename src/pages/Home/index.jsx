import Posts from "@/components/Posts";
import CreatePost from "@/components/Posts/components/CreatePost";

const Home = () => {
  const currentUser = null;
  return (
    <div className="flex h-screen flex-1 flex-col items-center">
      <h1 className="text-md mb-3 font-semibold">Trang chủ</h1>
      <div className="min-w-[640px] overflow-auto rounded-4xl border border-gray-300">
        {/* CreatePost */}
        {!currentUser && <CreatePost />}
        {/* Posts */}
        <Posts />
      </div>
    </div>
  );
};
export default Home;
