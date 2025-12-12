import CurvedBorderBottom from "@/components/CurvedBorderBottom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";

const Header = ({ title }) => {
  const navigate = useNavigate();

  return (
    <div className="sticky top-0 z-50 w-[700px] bg-white pt-4 dark:bg-black">
      <div className="flex items-center justify-between">
        {title === "Thread" && (
          <Button
            variant="outline"
            size="icon"
            className="absolute bottom-3 z-50 ml-8 h-6 w-6 rounded-full border border-gray-300 bg-white shadow dark:border-gray-700 dark:bg-[#181818] dark:text-white dark:hover:bg-gray-700"
            onClick={() => navigate(-1)}
            aria-label="Go back"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
        )}
        <h1 className="text-md m-auto mb-3 font-semibold text-gray-900 dark:text-white">
          {title}
        </h1>
      </div>
      <CurvedBorderBottom />
    </div>
  );
};

export default Header;
