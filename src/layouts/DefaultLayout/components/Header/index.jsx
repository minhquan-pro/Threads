import CurvedBorderBottom from "@/components/CurvedBorderBottom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";

const Header = ({ title }) => {
  const navigate = useNavigate();
  return (
    <div className="sticky top-0 z-50 w-[700px] border-gray-200 bg-white p-4">
      <div className="flex items-center justify-between">
        {title === "Thread" && (
          <Button
            variant={"outline"}
            className={"ml-5 h-6 w-6 rounded-full border bg-white shadow"}
            onClick={() => {
              navigate(-1);
            }}
          >
            <ArrowLeft />
          </Button>
        )}
        <h1 className="text-md m-auto text-center font-semibold">{title}</h1>
      </div>
      <CurvedBorderBottom />
    </div>
  );
};
export default Header;
