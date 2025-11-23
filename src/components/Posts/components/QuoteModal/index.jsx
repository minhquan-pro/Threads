import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import PostHeader from "../PostHeader";
import { useCurrentUser } from "@/features/auth";
import UserProfileDialog from "@/components/UserProfileDialog";
import { Gift, GiftIcon, Image } from "lucide-react";
import PostCard from "../PostCard";

const QuoteModal = ({ isOpen, handleQuote }) => {
  const currentUser = useCurrentUser();
  return (
    <Dialog open={isOpen} onOpenChange={handleQuote} className="border-none">
      <DialogContent className="max-w-[600px] min-w-[500px]">
        <DialogHeader>
          <div className="flex items-center">
            <Button variant="outline" className="border-none shadow-none">
              Hủy
            </Button>
            <DialogTitle className="m-auto">Thread mới</DialogTitle>
          </div>
        </DialogHeader>
        <div className="flex gap-3 p-2">
          <UserProfileDialog user={currentUser} />
          <div>
            <PostHeader user={currentUser} hideDate />
            <input
              className="w-full border-none p-0 text-sm shadow-none outline-none placeholder:text-gray-600"
              placeholder="Hãy chia sẻ suy nghĩ của bạn..."
            />
            <div className="mt-3 flex items-center gap-3">
              <Image color="gray" size={20} />
              <Image color="gray" size={20} />
              <Image color="gray" size={20} />
              <Image color="gray" size={20} />
              <Image color="gray" size={20} />
              <Image color="gray" size={20} />
            </div>
            <div className="mt-5 rounded-md border border-gray-400 p-2">
              <PostCard
                post={{
                  id: 12906,
                  content:
                    "Là một sinh viên Bách Khoa Hai đôi mắt của t vẫn 10/10. T biết vị xôi, vị phở, vị bánh cuốn, vị dookki, vị bò, vị gà, vị cơm, vị bánh tiramisu, vị bánh mì,... như nào. Điểm Văn hồi thi THPTQG của t là 8,5. T rất lười sửa đồ đạc trong nhà. T coi việc giảng giải tích đại số vật lý như là một hình thức khẩu dâm.T không bao giờ có ý định đối xử tệ bạc với ai. ",
                  user: currentUser,
                  replies_count: 12,
                  likes_count: 12,
                  media_urls: [
                    "https://thanhnien.mediacdn.vn/Uploaded/quyhien/2021_04_07/svbkhn_BBRI.jpg",
                    "https://media-cdn-v2.laodong.vn/storage/newsportal/2024/8/28/1385990/Dai-Hoc-Bach-Khoa-Ha-01.jpg",
                  ],
                  reposts_and_quotes_count: 12,
                  is_liked_by_auth: true,
                  is_reposted_by_auth: true,
                }}
                disableInteractions={false}
              />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button>Đăng</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default QuoteModal;
