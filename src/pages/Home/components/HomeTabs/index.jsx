// ...existing code...
import CurvedBorderBottom from "@/components/CurvedBorderBottom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TAB_VALUES } from "@/constants";

const HomeTabs = ({ children, currentTab, handleValueChange }) => {
  return (
    <Tabs
      defaultValue={TAB_VALUES.FOR_YOU}
      value={currentTab}
      onValueChange={handleValueChange}
    >
      <div className="sticky top-0 z-50 w-[700px]">
        <TabsList className="relative min-h-16 w-full gap-5 rounded-none border-gray-300 bg-white">
          <TabsTrigger value="for-you">Dành cho bạn</TabsTrigger>
          <TabsTrigger value="following">Đang theo dõi</TabsTrigger>
          <TabsTrigger value="ghost-posts">Bài viết tự hủy</TabsTrigger>
        </TabsList>
        <CurvedBorderBottom />
      </div>
      <TabsContent
        value={currentTab}
        className="m-auto flex min-h-screen justify-center"
      >
        <div className="relative z-10 mt-0 w-[650px] overflow-y-auto border-x border-b border-gray-200 bg-white py-2 shadow-md">
          {children}
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default HomeTabs;
