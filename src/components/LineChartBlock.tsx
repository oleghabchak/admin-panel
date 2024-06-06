import React, { useState } from "react";
import ChartOne from "./Charts/ChartOne";

type ViewType = "24h" | "6h" | "3h";

const LineChartBlock: React.FC = () => {
  const [selectedView, setSelectedView] = useState<ViewType>("24h");
  const handleViewSelection = (view: ViewType) => {
    setSelectedView(view);
  };

  return (
    <div className="">
      <div className="flex justify-between items-center mt-10">
        <div className="text-black dark:text-lightGrey text-xl font-semibold leading-7">
          Mon, 11 April{" "}
        </div>
        <div className="justify-start items-center gap-2 flex">
          <div
            className={`text-center text-base font-medium leading-normal cursor-pointer ${
              selectedView === "24h"
                ? "text-primary font-bold"
                : "text-darkGrey"
            }`}
            onClick={() => handleViewSelection("24h")}
          >
            24h view
          </div>
          <div
            className={`w-16 text-center text-base font-medium leading-normal cursor-pointer ${
              selectedView === "6h" ? "text-primary font-bold" : "text-darkGrey"
            }`}
            onClick={() => handleViewSelection("6h")}
          >
            6h view
          </div>
          <div
            className={`w-16 text-center text-base font-medium leading-normal cursor-pointer ${
              selectedView === "3h" ? "text-primary font-bold" : "text-darkGrey"
            }`}
            onClick={() => handleViewSelection("3h")}
          >
            3h view
          </div>
        </div>
      </div>

      <ChartOne/>
      
              <div className="w-full h-12 justify-start items-start gap-4 inline-flex">
                <div className="grow shrink basis-0 flex-col justify-start items-center gap-2 inline-flex">
                  <div className="justify-start items-center gap-1 inline-flex">
                    <div className="w-3.5 h-3.5 bg-green rounded-full" />
                    <div className="text-gray-700 text-base font-bold   leading-normal">10,6 mmol/L</div>
                  </div>
                  <div className="text-zinc-400 text-sm font-medium   leading-tight">Average glucose value </div>
                </div>
                <div className="grow shrink basis-0 flex-col justify-start items-center gap-2 inline-flex">
                  <div className="justify-start items-center gap-1 inline-flex">
                    <div className="w-3.5 h-3.5 bg-orange rounded-full" />
                    <div className="text-gray-700 text-base font-bold   leading-normal">12% </div>
                    <div className="text-gray-700 text-base font-bold   leading-normal">Very High </div>
                  </div>
                  <div className="text-zinc-400 text-sm font-medium   leading-tight">{"> 13.9 mmol/L "}</div>
                </div>
                <div className="grow shrink basis-0 flex-col justify-start items-center gap-2 inline-flex">
                  <div className="justify-start items-center gap-1 inline-flex">
                    <div className="w-3.5 h-3.5 bg-yellow rounded-full" />
                    <div className="text-gray-700 text-base font-bold   leading-normal">20% </div>
                    <div className="text-gray-700 text-base font-bold   leading-normal">High </div>
                  </div>
                  <div className="text-zinc-400 text-sm font-medium   leading-tight">10 - 13.9 mmol/L</div>
                </div>
                <div className="grow shrink basis-0 flex-col justify-start items-center gap-2 inline-flex">
                  <div className="justify-start items-center gap-1 inline-flex">
                    <div className="w-3.5 h-3.5 bg-green rounded-full" />
                    <div className="text-gray-700 text-base font-bold   leading-normal">64% </div>
                    <div className="text-gray-700 text-base font-bold   leading-normal">In Range </div>
                  </div>
                  <div className="text-zinc-400 text-sm font-medium   leading-tight">3.9 - 9.9 mmol/L</div>
                </div>
                <div className="grow shrink basis-0 flex-col justify-start items-center gap-2 inline-flex">
                  <div className="justify-start items-center gap-1 inline-flex">
                    <div className="w-3.5 h-3.5 bg-burgundy rounded-full" />
                    <div className="text-gray-700 text-base font-bold   leading-normal">3% </div>
                    <div className="text-gray-700 text-base font-bold   leading-normal">Low</div>
                  </div>
                  <div className="text-zinc-400 text-sm font-medium   leading-tight">3 - 3.9 mmol/L</div>
                </div>
                <div className="grow shrink basis-0 flex-col justify-start items-center gap-2 inline-flex">
                  <div className="justify-start items-center gap-1 inline-flex">
                    <div className="w-3.5 h-3.5 bg-red rounded-full" />
                    <div className="text-gray-700 text-base font-bold   leading-normal">1%</div>
                    <div className="text-gray-700 text-base font-bold   leading-normal">Very Low</div>
                  </div>
                  <div className="text-zinc-400 text-sm font-medium   leading-tight">{"< 3 mmol/L"}</div>
                </div>
              </div>
      
    </div>
  );
};

export default LineChartBlock;
