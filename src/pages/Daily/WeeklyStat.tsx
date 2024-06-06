import cookie from "./../../assets/metrics/Cookie.svg";
import fire from "./../../assets/metrics/FireSimple.svg";
import foot from "./../../assets/metrics/Footprints.svg";
import head from "./../../assets/metrics/Head.svg";
import moon from "./../../assets/metrics/Moon.svg";
import angry from "./../../assets/mood/Mood=Angry.svg";
import happy from "./../../assets/mood/Mood=Happy.svg";
import meh from "./../../assets/mood/Mood=Meh.svg";
import melting from "./../../assets/mood/Mood=Melting.svg";
import sad from "./../../assets/mood/Mood=Sad.svg";
import { useAppStore } from "../../store/AppStoreProvider";
import { toJS } from "mobx";
import { observer } from "mobx-react-lite";

const moods = [
  {
    image: angry,
    userId: "1",
  },
  {
    image: happy,
    userId: "2",
  },
  {
    image: sad,
    userId: "3",
  },
  {
    image: melting,
    userId: "4",
  },
  {
    image: meh,
    userId: "5",
  },
  {
    image: melting,
    userId: "6",
  },
  {
    image: meh,
    userId: "7",
  },
];

const ranges = [
  {
    day: "Mon",
  },
  {
    day: "Tue",
  },
  {
    day: "Wed",
  },
  {
    day: "Thu",
  },
  {
    day: "Fri",
  },
  {
    day: "Sat",
  },
  {
    day: "Sun",
  },
];

const WeeklyStat = observer((stat) => {
  const store = useAppStore();

  // console.log('STATE',toJS(store.DaysGlucose));

  return (
    <div className="grid  gap-4 md:gap-2  sm::grid-cols-1 md:grid-cols-2 2xl:grid-cols-2 xl:gap-2">
      <div
        style={{ width: "" }}
        className=" self-stretch p-6 bg-white dark:bg-boxdark dark:border-white rounded-xl border border-zinc-200 flex-col justify-start items-center gap-8 inline-flex"
      >
        {/* {-- WEEK DAYS --} */}
        <div className="w-full flex justify-between items-center">
          <div className="w-40  flex items-center flex-row gap-2 text-gray-700 text-sm font-bold"></div>
          <div className="w-full grid grid-cols-7 gap-1 justify-center text-sm font-bold items-center">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
              (day, index) => (
                <div
                  key={index + 0.5}
                  className="ml-3 text-gray-700 text-sm font-bold leading-tight"
                >
                  {day}
                </div>
              )
            )}
          </div>
        </div>
        {/* {-- MOOD --} */}
        <div className="w-full justify-start items-center inline-flex">
          <div className="w-40  flex items-center flex-row gap-1  text-gray-700 text-sm font-bold">
            <img src={head} />
            <p>Mood</p>
          </div>
          <div className="w-full grid grid-cols-7 gap-1 justify-start items-center">
            {moods?.map((mood, index) => (
              <div
                key={index}
                className="w-12 justify-center items-center flex"
              >
                <img src={mood?.image} key={index + 0.1} />
              </div>
            ))}
          </div>
        </div>
        {/* {-- CARBS --} */}
        <div className="w-full justify-start items-center inline-flex">
          <div className="w-40  flex items-center flex-row gap-1  text-gray-700 text-sm font-bold">
            <img src={cookie} />
            <p>Carbs intake (g)</p>
          </div>
          <div className="w-full  grid grid-cols-7 gap-1 justify-start items-center">
            {store?.WeeklyStat
              ? store?.WeeklyStat?.map((stat, index) => (
                  // console.log('STATEcarbs',stat.carbs),
                  <div
                    key={index}
                    className="w-12 xl:w-12 lg:w-10 md:w-8  grow shrink basis-0 text-center text-gray-700 text-sm font-bold  leading-tight"
                  >
                    {stat.carbs ? `${stat.carbs.toFixed(1)}` : "-"}
                  </div>
                ))
              : Array.from({ length: 7 }, (_, index) => index).map(
                  (_, index) => (
                    <div
                      key={index}
                      className=" w-15 grow shrink basis-0 text-center text-gray-700 text-sm font-bold  leading-tight"
                    >
                      -
                    </div>
                  )
                )}
          </div>
        </div>

        {/* {-- STEPS --} */}
        <div className="w-full justify-start items-center inline-flex">
          <div className="w-40  flex items-center flex-row gap-1  text-gray-700 text-sm font-bold">
            <img src={foot} />
            <p>Steps</p>
          </div>
          <div className="w-full  grid grid-cols-7 gap-1 justify-start items-center">
            {store?.WeeklyStat
              ? store?.WeeklyStat.map((stat, index) => (
                  <div
                    key={index}
                    className=" w-15 grow shrink basis-0 text-center text-gray-700 text-sm font-bold  leading-tight"
                  >
                    {stat.steps ? stat.steps : "-"}
                  </div>
                ))
              : Array.from({ length: 7 }, (_, index) => index).map(
                  (_, index) => (
                    <div
                      key={index}
                      className=" w-15 grow shrink basis-0 text-center text-gray-700 text-sm font-bold  leading-tight"
                    >
                      -
                    </div>
                  )
                )}
          </div>
        </div>

        {/* {-- CALORIES --} */}
        <div className="w-full justify-start items-center inline-flex">
          <div className="w-40  flex items-center flex-row gap-1  text-gray-700 text-sm font-bold">
            <img src={fire} />
            <p>Calories (kCal)</p>
          </div>
          <div className="w-full  grid grid-cols-7 gap-1 justify-start items-center">
            {store?.WeeklyStat
              ? store?.WeeklyStat?.map((stat, index) => (
                  <div
                    key={index}
                    className=" w-15 grow shrink basis-0 text-center text-gray-700 text-sm font-bold  leading-tight"
                  >
                    {" "}
                    {store?.WeeklyStat && stat.calories
                      ? `${stat.calories.toFixed(1)} `
                      : "-"}
                  </div>
                ))
              : Array.from({ length: 7 }, (_, index) => index).map(
                  (_, index) => (
                    <div
                      key={index}
                      className=" w-15 grow shrink basis-0 text-center text-gray-700 text-sm font-bold  leading-tight"
                    >
                      -
                    </div>
                  )
                )}
          </div>
        </div>

        {/* {-- SLEEP --} */}
        <div className="w-full justify-start items-center inline-flex">
          <div className="w-40  flex items-center flex-row gap-1  text-gray-700 text-sm font-bold">
            <img src={moon} />
            <p>Sleep hours (h)</p>
          </div>
          <div className="w-full  grid grid-cols-7 gap-1 justify-start items-center">
            {store?.WeeklyStat
              ? store?.WeeklyStat?.map((stat, index) => (
                  <div
                    key={index}
                    className=" w-15 grow shrink basis-0 text-center text-gray-700 text-sm font-bold  leading-tight"
                  >
                    {stat.sleepHours ? `${stat.sleepHours.toFixed(1)}` : "-"}
                  </div>
                ))
              : Array.from({ length: 7 }, (_, index) => index).map(
                  (_, index) => (
                    <div
                      key={index}
                      className=" w-15 grow shrink basis-0 text-center text-gray-700 text-sm font-bold  leading-tight"
                    >
                      -
                    </div>
                  )
                )}
          </div>
        </div>
      </div>

      {/* Right Column, split into two divs stacked vertically */}
      <div className="col-span-1 flex flex-col gap-6">
        {/* First div on the right */}
        <div className="w-full min-w-100 h-36 bg-white dark:bg-boxdark rounded-xl flex flex-col justify-start items-start gap-3">
          {/* Content for the first right div */}
          <div className="text-gray-700 text-sm font-bold leading-tight">
            Time in ranges this week, %
          </div>
          <div className="self-stretch grow shrink basis-0 justify-start items-center gap-4 inline-flex">
            {store?.DaysGlucose?.days?.map((range, index) => (
              // console.log('RANGE',toJS(range)),
              <div
                key={range.day}
                className="grow basis-0 self-stretch flex-col justify-start items-center gap-2 inline-flex"
              >
                {" "}
                {/* Added key prop */}
                <div className="w-10 text-center text-gray-700 text-sm font-bold leading-none">
                  {ranges[index].day}
                </div>
                {range.timeInRanges.very_low +
                  range.timeInRanges.low +
                  range.timeInRanges.low +
                  range.timeInRanges.normal +
                  range.timeInRanges.high +
                  range.timeInRanges.very_high ===
                0 ? (
                  <div className="w-8 grow shrink basis-0 rounded-md overflow-hidden flex-col justify-center items-start flex">
                    <div
                      className="self-stretch bg-gray"
                      style={{ height: ` 100%` }}
                    />
                  </div>
                ) : (
                  <div className="w-8 grow shrink basis-0 rounded-md overflow-hidden flex-col justify-center items-start flex">
                    <div
                      className="self-stretch bg-orange"
                      style={{ height: ` ${range.timeInRanges.very_low}%` }}
                    />
                    <div
                      className="self-stretch bg-yellow"
                      style={{ height: `${range.timeInRanges.low}%` }}
                    />
                    <div
                      className="self-stretch bg-green"
                      style={{ height: `${range.timeInRanges.normal}%` }}
                    />
                    <div
                      className="self-stretch bg-burgundy"
                      style={{ height: `${range.timeInRanges.high}%` }}
                    />
                    <div
                      className="self-stretch bg-red"
                      style={{ height: `${range.timeInRanges.very_high}%` }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Second div on the right */}
        <div className="w-full min-w-100 p-6 rounded-xl border border-zinc-200 justify-start items-start gap-4 inline-flex">
          <div className="grow shrink basis-0 self-stretch flex-col justify-start items-start gap-2 inline-flex">
            <div className="self-stretch justify-between items-center inline-flex">
              <div className="text-gray-700 text-base font-bold  leading-normal">
                GMI
              </div>
              <div className="text-gray-700 text-base font-semibold  leading-normal">
                {store.DaysGlucose.statisticOfWeek?.activeCGM
                  ? `${store.DaysGlucose.statisticOfWeek?.activeCGM?.toFixed(
                      2
                    )} ${store.measurementUnit}`
                  : "-"}
              </div>
            </div>
            <div className="self-stretch justify-between items-center inline-flex">
              <div className="text-gray-700 text-base font-bold  leading-normal">
                Average
              </div>
              <div className="text-gray-700 text-base font-semibold  leading-normal">
                {store.DaysGlucose.statisticOfWeek?.average
                  ? `${store.DaysGlucose.statisticOfWeek?.average?.toFixed(
                      2
                    )} ${store.measurementUnit}`
                  : "-"}
              </div>
            </div>
            <div className="self-stretch justify-between items-center inline-flex">
              <div className="text-gray-700 text-base font-bold  leading-normal">
                SD
              </div>
              <div className="text-gray-700 text-base font-semibold  leading-normal">
                {store.DaysGlucose.statisticOfWeek?.sd
                  ? `${store.DaysGlucose.statisticOfWeek?.sd?.toFixed(
                      2
                    )} ${store.measurementUnit}`
                  : "-"}
              </div>
            </div>
            <div className="self-stretch justify-between items-center inline-flex">
              <div className="text-gray-700 text-base font-bold  leading-normal">
                CV
              </div>
              <div className="text-gray-700 text-base font-semibold  leading-normal">
                {store.DaysGlucose.statisticOfWeek?.cv
                  ? `${store.DaysGlucose.statisticOfWeek?.average?.toFixed(
                      2
                    )} %`
                  : "-"}
              </div>
            </div>
          </div>
          <div className="w-px h-28 relative bg-zinc-200" />
          <div className="grow shrink basis-0 flex-col justify-start items-start gap-2 inline-flex">
            <div className="self-stretch justify-between items-center inline-flex">
              <div className="text-gray-700 text-base font-bold  leading-normal">
                Median
              </div>
              <div className="text-gray-700 text-base font-semibold  leading-normal">
                {store.DaysGlucose.statisticOfWeek?.median
                  ? `${store.DaysGlucose.statisticOfWeek?.median?.toFixed(
                      2
                    )} ${store.measurementUnit}`
                  : "-"}
              </div>
            </div>
            <div className="self-stretch justify-between items-center inline-flex">
              <div className="text-gray-700 text-base font-bold  leading-normal">
                Highest
              </div>
              <div className="text-gray-700 text-base font-semibold  leading-normal">
                {store.DaysGlucose.statisticOfWeek?.highest
                  ? `${store.DaysGlucose.statisticOfWeek?.highest?.toFixed(
                      2
                    )} ${store.measurementUnit}`
                  : "-"}
              </div>
            </div>
            <div className="self-stretch justify-between items-center inline-flex">
              <div className="text-gray-700 text-base font-bold  leading-normal">
                Lowest
              </div>
              <div className="text-gray-700 text-base font-semibold  leading-normal">
                {store.DaysGlucose.statisticOfWeek?.lowest
                  ? `${store.DaysGlucose.statisticOfWeek?.lowest?.toFixed(
                      2
                    )} ${store.measurementUnit}`
                  : "-"}
              </div>
            </div>
            <div className="self-stretch justify-between items-center inline-flex">
              <div className="text-gray-700 text-base font-bold  leading-normal">
                Active CGM{" "}
              </div>
              <div className="text-gray-700 text-base font-semibold  leading-normal">
                {store.DaysGlucose.statisticOfWeek?.gmi
                  ? `${store.DaysGlucose.statisticOfWeek.gmi?.toFixed(2)} %`
                  : "-"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default WeeklyStat;
