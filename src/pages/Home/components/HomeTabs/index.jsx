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
      <div className="sticky top-0 z-50">
        <TabsList className="relative min-h-16 w-full gap-5 rounded-none bg-white">
          <TabsTrigger value="for-you">Dành cho bạn</TabsTrigger>
          <TabsTrigger value="following">Đang theo dõi</TabsTrigger>
          <TabsTrigger value="ghost-posts">Bài viết tự hủy</TabsTrigger>
        </TabsList>

        <div>
          <div className="bottom-0 h-1 w-[calc(100%-40px)] border-b border-gray-300" />
          <div className="absolute -bottom-[35px] left-0 h-9 w-9 bg-white">
            <div className="absolute left-0 h-12 w-12 rounded-tl-[36px] border-t border-l border-gray-300" />
          </div>
          <div className="absolute right-0 -bottom-[35px] h-9 w-9 bg-white">
            <div className="absolute right-0 h-12 w-12 rounded-tr-[36px] border-t border-r border-gray-300" />
          </div>
        </div>
      </div>
      <TabsContent
        value={currentTab}
        className="relative z-10 mt-0 min-w-[640px] overflow-y-auto rounded-b-3xl border-x border-b border-gray-300 bg-white"
      >
        <div>{children}</div>
      </TabsContent>
    </Tabs>
  );
};

export default HomeTabs;
// ...existing code...
