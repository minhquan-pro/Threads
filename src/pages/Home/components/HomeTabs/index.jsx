import CurvedBorderBottom from "@/components/common/CurvedBorderBottom";
import SnowOverlay from "@/components/common/SnowOverlay";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TAB_VALUES } from "@/constants";
import { useBodyClass } from "@/hooks/useBodyClass";

const HomeTabs = ({ children, currentTab, handleValueChange }) => {
  const imageOverlay = useBodyClass("imageOverlay");

  return (
    <>
      <Tabs
        defaultValue={TAB_VALUES.FOR_YOU}
        value={currentTab}
        onValueChange={handleValueChange}
      >
        <div
          className={`fixed top-0 right-0 left-0 ${!imageOverlay && "z-50"} m-auto hidden w-[700px] md:block`}
        >
          <div className="flex items-center">
            <TabsList className="relative min-h-16 w-full gap-5 rounded-none border-gray-800 bg-white dark:border-[#323030] dark:bg-black">
              <TabsTrigger value="for-you">Dành cho bạn</TabsTrigger>
              <TabsTrigger value="following">Đang theo dõi</TabsTrigger>
              <TabsTrigger value="ghost-posts">Bài viết tự hủy</TabsTrigger>
            </TabsList>
          </div>
          <CurvedBorderBottom />
        </div>

        <TabsContent value={currentTab} className="m-auto flex justify-center">
          <div className="relative z-10 mt-0 min-h-screen w-[650px] overflow-y-auto border-gray-200 bg-white shadow-md md:border-x md:border-b dark:border-[#181818] dark:bg-[#181818]">
            {children}
          </div>
        </TabsContent>
      </Tabs>

      <SnowOverlay />
    </>
  );
};

export default HomeTabs;
