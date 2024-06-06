import normal from "./../../assets/marks/Value=Normal.svg";
import low from "./../../assets/marks/Value=Down-Red.svg";
import high from "./../../assets/marks/Value=Up-Orange.svg";

import { useAppStore } from "../../store/AppStoreProvider";
import { toJS } from "mobx";
import { observer } from "mobx-react-lite";

const AverageGlucose = observer((stat) => {
  const store = useAppStore();

  return (
    <div className="w-full h-fit justify-between items-start gap-4 inline-flex">
      {store.WeekChartData.averageGlucose ? (
        <>
          <div className="w-1/3h-full p-4 bg-white dark:bg-boxdark rounded-xl border border-zinc-200 flex-col justify-center items-start gap-3 inline-flex">
            <div className="justify-start items-center gap-2 inline-flex">
              <img src={normal} />
              <div className="grow shrink basis-0 text-gray-700 text-base font-bold   leading-normal">
                Average glucose level is within target range
              </div>
            </div>
            <div className="self-stretch text-gray-700 text-base font-semibold  leading-normal">{`Average glucose level is ${store.WeekChartData.averageGlucose?.min?.toFixed(
              2
            )}-${store.WeekChartData.averageGlucose?.max?.toFixed(2)} ${
              store.WeekChartData.measureUnit
            }.`}</div>
          </div>

          {store.WeekChartData.lowLevel && (
            <div className="w-1/3 h-full dark:bg-boxdark  grow shrink basis-0 p-4 bg-white rounded-xl border border-zinc-200 flex-col justify-start items-start gap-3 inline-flex">
              <div className="self-stretch justify-start items-center gap-2 inline-flex">
                <img src={low} />
                <div className="grow shrink basis-0 text-gray-700 text-base font-bold   leading-normal">
                  Low level{" "}
                </div>
              </div>
              <div className="self-stretch text-gray-700 text-base font-semibold   leading-normal">{`Glucose levels were below 3.9 ${store.WeekChartData.measureUnit} at ${store.WeekChartData.lowLevel?.start} - ${store.WeekChartData.lowLevel?.end} in ${store.WeekChartData.lowLevel?.frequencyInPercentage}% of cases.`}</div>
            </div>
          )}

          {store.WeekChartData.highLevel && (
            <div className="w-1/2 h-full dark:bg-boxdark  grow shrink basis-0 p-4 bg-white rounded-xl border border-zinc-200 flex-col justify-start items-start gap-3 inline-flex">
              <div className="self-stretch justify-start items-center gap-2 inline-flex">
                <img src={high} />
                <div className="grow shrink basis-0 text-gray-700 text-base font-bold   leading-normal">
                  High level{" "}
                </div>
              </div>
              <div className="self-stretch text-gray-700 text-base font-semibold   leading-normal">{`Glucose levels were more that 9.9 ${store.WeekChartData.measureUnit} at ${store.WeekChartData.highLevel?.start} - ${store.WeekChartData.highLevel?.end} in ${store.WeekChartData.highLevel?.frequencyInPercentage}% of cases.`}</div>
            </div>
          )}
        </>
      ) : (
        <div className="h-full grow shrink basis-0 p-4 dark:bg-boxdark  bg-white rounded-xl border border-zinc-200 flex-col justify-center items-start gap-3 inline-flex">
          <div className="self-stretch justify-start items-center gap-2 inline-flex">
            <div className="grow shrink basis-0 text-gray-700 text-base font-bold   leading-normal">
              At the moment, we don't have any ideas{" "}
            </div>
          </div>

          <div className="self-stretch text-gray-700 text-base font-semibold   leading-normal">
            It's crucial to gather more information from the patient.
          </div>
        </div>
      )}
    </div>
  );
});

export default AverageGlucose;
