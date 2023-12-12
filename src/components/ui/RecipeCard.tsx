import { cn } from "@/utils/cn";
import { DownloadingIcon, FavoriteIcon, ShareIcon } from "../icons";
import MealSymbol from "../symbols/MealSymbol";
import Badge from "./Badge";

type Props = {
  isGridView: Boolean;
  isLoading: Boolean;
  label: string;
  img?: string;
  badges: string[];
};

function RecipeCard({ isGridView, isLoading, label, img, badges }: Props) {
  return (
    <div
      className={cn(
        isGridView &&
          "h-[280px] w-[196px] overflow-hidden rounded-2xl border-2 border-primary-300/30",
        !isGridView &&
          "flex h-[70px] w-[1080px] flex-row overflow-hidden rounded-2xl border-2 border-primary-300/30",
        isLoading && "border-gray-200"
      )}
    >
      {isLoading ? (
        <>
          {isGridView && (
            // Loading placeholder for the grid view
            <>
              <div className="flex h-[120px] w-full items-center justify-center bg-gray-200">
                {/* <MealSymbol className="animate-pulse text-gray-500" /> */}
              </div>
              <div className="flex flex-grow flex-col justify-between bg-white p-[16px]">
                <div className="mb-4 text-sm font-bold">
                  <div className="inline-block h-4 w-full animate-pulse rounded-full bg-gray-500"></div>
                  <div className="inline-block h-4 w-full animate-pulse rounded-full bg-gray-500"></div>
                  <div className="inline-block h-4 w-7 animate-pulse rounded-full bg-gray-500"></div>
                </div>
                <div className="flex flex-col space-y-[4px] pb-20">
                  <div className="inline-block h-4 w-16 animate-pulse rounded-full bg-gray-200"></div>
                  <div className="inline-block h-4 w-16 animate-pulse rounded-full bg-gray-200"></div>
                </div>
              </div>
            </>
          )}
        </>
      ) : (
        <>
          {!isGridView && (
            // Loading placeholder for the row view
            <></>
          )}
        </>
      )}
      <></>
      {isGridView ? (
        // Card with grid layout
        <>
          <div className="flex h-[120px] w-full items-start justify-end bg-primary-300/30">
            <div className="right-20 top-6 z-50 flex space-x-2 p-2">
              <div className="flex items-center justify-center rounded-full border-2 border-primary-300/30 bg-white">
                <FavoriteIcon size={36} className="p-1" />
              </div>
              <div className="flex items-center justify-center rounded-full border-2 border-primary-300/30 bg-white">
                <ShareIcon size={36} className="p-1" />
              </div>
              <div className="flex items-center justify-center rounded-full border-2 border-primary-300/30 bg-white">
                <DownloadingIcon size={36} className="p-1" />
              </div>
            </div>
          </div>
          <div className="flex flex-grow flex-col justify-between bg-white p-[16px]">
            <div className="mb-4 text-sm font-bold">
              <p>{label}</p>
            </div>
            <div className="space-y-[4px] ">
              {badges.map((badge, index) => (
                <Badge key={index} className="md:px-1.5 md:py-0.5 md:text-xs">
                  {badge}
                </Badge>
              ))}
            </div>
          </div>
        </>
      ) : (
        // Card with row layout
        <>
          <div className="flex flex-grow flex-row items-center bg-white">
            <div className="bg-primary-300/30 p-3">
              <MealSymbol />
            </div>
            <div className="flex flex-grow flex-row items-center justify-between">
              <div className="pl-[20px] text-sm font-bold">
                <p>{label}</p>
              </div>

              <div className="flex flex-grow justify-center space-x-[4px]">
                {badges.map((badge, index) => (
                  <Badge key={index}>{badge}</Badge>
                ))}
              </div>

              <div className="items-center bg-white">
                <div className="flex space-x-2 p-3">
                  <div className="flex items-center justify-center rounded-full border-2 border-primary-300/30 bg-white">
                    <FavoriteIcon size={36} className="p-1" />
                  </div>
                  <div className="flex items-center justify-center rounded-full border-2 border-primary-300/30 bg-white">
                    <ShareIcon size={36} className="p-1" />
                  </div>
                  <div className="flex items-center justify-center rounded-full border-2 border-primary-300/30 bg-white">
                    <DownloadingIcon size={36} className="p-1" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default RecipeCard;
