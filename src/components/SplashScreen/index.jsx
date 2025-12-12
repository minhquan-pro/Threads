import { faMeta, faThreads } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SplashScreen = ({ isFading }) => {
  return (
    <>
      <style>{`
        @keyframes scaleIn {
          0% { transform: scale(0.5); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }
      `}</style>

      <div
        className={`bg-background fixed inset-0 z-60 flex flex-col items-center justify-between ${isFading ? "animate-fade-out" : "animate-fade-in"}`}
      >
        <div></div>
        <div className="relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-32 w-32 animate-pulse rounded-full"></div>
          </div>

          <FontAwesomeIcon
            className={`relative z-10 text-7xl font-bold dark:text-white ${
              isFading ? "scale-150 opacity-0 transition-all duration-300" : ""
            }`}
            icon={faThreads}
            style={{
              animation: isFading ? "none" : "scaleIn 1s ease-out forwards",
            }}
          />
        </div>

        <div className="mb-8 flex flex-col items-center gap-3">
          <div className="flex flex-col items-center text-sm text-gray-500 dark:text-gray-400">
            from
            <span className="mt-1 text-center text-3xl text-black dark:text-white">
              <FontAwesomeIcon icon={faMeta} className="mr-3" />
              Meta
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default SplashScreen;
