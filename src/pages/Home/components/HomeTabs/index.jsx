// ...existing code...
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TAB_VALUES } from "@/constants";

const HomeTabs = ({ children, currentTab, handleValueChange }) => {
  return (
    <Tabs
      defaultValue={TAB_VALUES.FOR_YOU}
      value={currentTab}
      onValueChange={handleValueChange}
    >
      <div className="sticky top-0 z-50 border-b border-gray-300">
        <TabsList className="relative min-h-16 w-full gap-5 rounded-none bg-white">
          <TabsTrigger value="for-you">Dành cho bạn</TabsTrigger>
          <TabsTrigger value="following">Đang theo dõi</TabsTrigger>
          <TabsTrigger value="ghost-posts">Bài viết tự hủy</TabsTrigger>
        </TabsList>
      </div>
      <TabsContent
        value={currentTab}
        className="relative z-10 mt-0 min-w-[640px] overflow-y-auto border-x border-b border-gray-300 bg-white"
      >
        <div>{children}</div>
      </TabsContent>
    </Tabs>
  );
};

export default HomeTabs;
// ...existing code...
