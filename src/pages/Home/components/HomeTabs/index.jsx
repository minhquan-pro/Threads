import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TAB_VALUES } from "@/constants";

const HomeTabs = ({ children, currentTab, handleValueChange }) => {
  return (
    <Tabs
      defaultValue={TAB_VALUES.FOR_YOU}
      value={currentTab}
      onValueChange={handleValueChange}
    >
      <TabsList className="sticky top-0 z-50 flex min-h-16 w-full justify-center gap-5 rounded-none border-gray-300 bg-white">
        <TabsTrigger value="for-you">Dành cho bạn</TabsTrigger>
        <TabsTrigger value="following">Đang theo dõi</TabsTrigger>
        <TabsTrigger value="ghost-posts">Bài viết tự hủy</TabsTrigger>

        <div className="absolute bottom-0 h-1 w-[calc(100%-60px)] border-b border-gray-300" />
        <div className="absolute -bottom-[35px] left-0 h-9 w-9 bg-white">
          <div className="absolute left-0 h-12 w-12 rounded-tl-[36px] border-t border-l border-gray-300" />
        </div>
        <div className="absolute right-0 -bottom-[35px] h-9 w-9 bg-white">
          <div className="absolute right-0 h-12 w-12 rounded-tr-[36px] border-t border-r border-gray-300" />
        </div>
      </TabsList>

      <TabsContent
        value={currentTab}
        className="mt-0 min-w-[640px] overflow-y-auto rounded-b-3xl border-x border-b border-gray-300 px-5"
      >
        {children}
      </TabsContent>
    </Tabs>
  );
};

export default HomeTabs;
