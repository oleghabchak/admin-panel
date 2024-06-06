import React, { useEffect, useRef } from "react";
import { LineChart, LineChartProps } from "@opd/g2plot-react";
import { Line } from "@antv/g2plot";
import insertCss from "insert-css";
import berry from "../../assets/lineChart/Photo.png";
import icon from "../../assets/lineChart/Marks.svg";
import icon2 from "../../assets/marks/Value=Calories.svg";
import noDataChart from "../../assets/no-data-icon/noDataChart.svg";
import { useAppStore } from "../../store/AppStoreProvider";
import { toJS } from "mobx";
import { addHours, format , } from "date-fns";
import { toZonedTime } from 'date-fns-tz';
import Events from "../../pages/Daily/Events";
import Notes from "../../pages/Daily/Notes";
import { right } from "@antv/g2plot/lib/plots/sankey/sankey";
import moment from "moment";

// console.log(format(new Date("2024-05-21T00:01:47.000Z"), "h aaa"));  // Output should be "1 AM" depending on your time zone
console.log(
  moment('Mon 03-Jul-2017, 11:00 AM', 
  'ddd DD-MMM-YYYY, hh:mm a')
      .format('hh a')
);
const data1 = [
  {
    timestamp: "06:00",
    type: "download",
    value: 4,
    temp: true,
  },
  {
    timestamp: "07:00",
    type: "download",
    value: 9,
  },
  {
    timestamp: "08:00",
    type: "download",
    value: 5,
  },
  {
    timestamp: "09:00",
    type: "download",
    icon: "berry",
    value: 16,
  },
  {
    timestamp: "10:00",
    type: "download",
    value: 6,
    temp: true,
  },
  {
    timestamp: "11:00",
    type: "download",
    icon: "berry2",
    value: 18,
    temp: true,
  },
  {
    timestamp: "12:00",
    type: "download",
    value: 4,
  },
  {
    timestamp: "13:00",
    type: "download",
    value: 2,
  },
  {
    timestamp: "14:00",
    type: "download",
    value: 13,
  },
  {
    timestamp: "15:00",
    type: "download",
    value: 12,
  },
  {
    timestamp: "16:00",
    type: "download",
    value: 4,
  },
  {
    timestamp: "17:00",
    type: "download",
    value: 1,
  },
  {
    timestamp: "18:00",
    type: "download",
    value: 21,
  },
  {
    timestamp: "19:00",
    type: "download",
    value: 16,
  },
  {
    timestamp: "21:00",
    type: "download",
    value: 21,
  },
];

insertCss(`
    .custom-tooltip-title {
        padding: 12px 0 16px;
        font-size: 14px;
        text-align: center;
        color: white;
    }

    .custom-tooltip-value {
      display: flex;
      jutify-content: space-between;
      color: white;
      margin: 12px;
      height: 20px;
    }

  .custom-tooltip-subtitle {
    font-size: 28px;
    text-align: center;
    color: white;
    margin:0  1px 5px 0;
  }
    .tooltip-footer {
      margin: 8px 12px 12px 12px;
      font-size: 14px;
      color: white;
      text-align: center;
    }

    .background-image {
      margin: 0 12px;
      width: 126px;
      height: 120px;
      border-radius: 8px
    }
    .image {
      width: 100, height: 85, position: 'relative', borderRadius: 4
    }
    .subtitle {
      color: 'white', fontSize: 14, fontFamily: 'Urbanist', fontWeight: '700', lineHeight: 18, wordWrap: 'break-word'    }

    .berry {
        background-image: url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiZx_FQrGyMowvbtY7PaAI-dxgwPfK_ApVeQ&s);
    }

    .berry2 {
      background-image: url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-D16-7hc3zWjXYPqtYbP_NKm0P2wOkdpWKQ&s);
    }
    .none {
      display:none
    }
`);

const config1: LineChartProps = {
  padding: 35,
  height: 475,
  autoFit: true,
  xField: "timestamp",
  yField: "value",
  yAxis: {
    label: {
      // Convert the timestamp string to a Date object before formatting
      formatter: (v) => `${v}`,
    },
  },

  xAxis: {
    label: {
      formatter: (v) => {
        // Ensure v is a valid date string or Date object
        if (!v) {
          return "";
        }
  
        const date = toZonedTime(v, 'UTC');
        // Check for invalid date
        if (isNaN(date.getTime())) {
          return "";
        }
        // console.log('STATE',moment(date)
        // .format('h a'))
        return moment(date)
        .format('h a')
          // hours = date.getHours();
          // let minutes = date.getMinutes();
          // const ampm = hours >= 12 ? 'pm' : 'am';
          
          // // Convert 24-hour format to 12-hour format
          // hours = hours % 12;
          // hours = hours ? hours : 12; // the hour '0' should be '12'
          // minutes = minutes < 0 ? '0' + minutes : minutes;
          // return hours + ' ' + ampm;
      }
    },
  },
  legend: {
    position: "right-top",
  },
  tooltip: {
    showMarkers: false,
    enterable: true,
    domStyles: {
      "g2-tooltip": {
        width: "150px",
        // height: "100px",
        padding: 0,
        marginBottom:110,
        marginLeft:"-85px",
        right:100,
        backgroundColor: "#414050",
      },
    },

    customContent: (title, items) => {
      const data = items[0]?.data || {};
      const tempDom = `<div class = "custom-tooltip-value">
  <p>🍎 Fruit Carbs 20g</p>
  </div>`;
      let domClass;
      if (data.icon === "berry") {
        domClass = "berry";
      } else if (data.icon === "berry2") {
        domClass = "berry2";
      } else {
        domClass = "none";
      }
      let range;
      if (data.icon === "berry") {
        range = "berry";
      } else if (data.icon === "berry2") {
        range = "berry2";
      } else {
        range = "none";
      }
      let rangeTitle;
      if (data.value < 3) {
        rangeTitle = "Very Low";
      } else if (data.value > 3 && data.value < 3.9) {
        rangeTitle = "Low";
      } else if (data.value > 3.9 && data.value < 9.9) {
        rangeTitle = "In Range";
      } else if (data.value > 9.9 && data.value < 13.9) {
        rangeTitle = "Hight";
      } else {
        rangeTitle = "Very High";
      }
      const titleDom = `<div class ="custom-tooltip-title">${rangeTitle}</div>`;
      const subtitleDom = `<div class="custom-tooltip-subtitle" style="flex> 
  <span class="custom-tooltip-subtitle">${data.value}</span>
  <span class ="custom-tooltip-title">mmol/L</span>
  </div>`;
      const time = data.timestamp?.slice(11, 16);
      const hour = data.timestamp?.slice(11, 13);
      let hours;
      if (data.timestamp) {
        hours = Number(hour) < 12 ? "am" : "pm";
        // console.log('hours',hours);
      }
      const timeDom = `<div class="tooltip-footer">${time} ${hours}</div>`;
      return `<div >
  ${titleDom}
  ${subtitleDom}
  <div class="background-image ${domClass}"> </div>
  ${data.temp ? tempDom : ""}
  ${timeDom}
  </div>`;
    },
  },

  annotations: [
    {
      type: "html",
      position: ["09:00", 16],
      html: (container, view) => {
        return `<div style="transform:translate(-50%,-46%)">
            <img width="24" height="24" alt="" src=${icon}>
          </div>`;
      },
    },
    {
      type: "html",
      position: ["11:00", 18],
      html: (container, view) => {
        return `<div style="transform:translate(-50%,-46%)">
            <img width="24" height="24" alt="" src=${icon2}>
          </div>`;
      },
    },
    {
      type: "regionFilter",
      start: [0, "max"],
      end: ["max", 13.9],
      color: "#E6834A",
    },
    {
      type: "regionFilter",
      start: [0, 13.9],
      end: ["max", 9.9],
      color: "#EFD861",
    },
    {
      type: "regionFilter",
      start: [0, 9.9],
      end: ["max", 3.9],
      color: "#52B4A8",
    },
    {
      type: "regionFilter",
      start: [0, 3.9],
      end: ["max", 3],
      color: "#DA5A6A",
    },
    {
      type: "regionFilter",
      start: [0, 3],
      end: ["max", 0],
      color: "#B54957",
    },
    {
      type: "line",
      start: [0, 9.9],
      end: ["max", 9.9],
      style: {
        stroke: "#EFD861",
        lineWidth: 2,
        height: 2,
      },
    },
    {
      type: "line",
      start: [0, 3.9],
      end: ["max", 3.9],
      style: {
        stroke: "#DA5A6A",
        lineWidth: 2,
        height: 2,
      },
    },
  ],
  seriesField: "type",
};

export default ({ data }) => {
  const store = useAppStore();

  useEffect(() => {
    // This effect will run whenever store?.DaysGlucose?.days?.[0] changes
    console.log('DaysGlucose', toJS(store?.DaysGlucose?.days?.[0]));
  }, [store?.DaysGlucose?.days?.[0]]);

  const lineChartRef = useRef<Line>();

  useEffect(() => {
    if (lineChartRef.current) {
      const plot = lineChartRef.current;
      plot.on("line:click", (e) => {
        console.log(e);
      });
    }
  }, []);
  // console.log('STATE',toJS(data?.[0]?.glucoseData))
  return (
    <section>
      {data?.map((data, index) => (
        // console.log('ST12ATE',toJS(data)),
        <div key={index}>
          <div className="w-full mt-10 mb-4 h-7 justify-between items-center inline-flex">
            <div className="text-gray-700 text-xl font-semibold   leading-7">
              {format(new Date(data.date), "EEE, d MMM")}
            </div>
            <div className="justify-start items-center gap-2 flex">
              <div className="text-center text-primary text-base font-bold   leading-normal">
                24h view
              </div>
              <div className="w-16 text-center text-zinc-400 text-base font-medium   leading-normal">
                6h view
              </div>
              <div className="w-16 text-center text-zinc-400 text-base font-medium   leading-normal">
                3h view
              </div>
            </div>
          </div>
          {data?.glucoseData?.[0] ? <LineChart data={data?.glucoseData} {...config1} /> : <img src={noDataChart} className="w-full blur-sm"/>}

          <div className="w-full my-6 h-1 flex-col justify-center items-start gap-2.5 inline-flex">
            <div className="w-full h-1 relative bg-slate-100 rounded-lg" />
          </div>

          <div className="w-full h-12 justify-start items-start gap-4 inline-flex">
            <div className="grow shrink basis-0 flex-col justify-start items-center gap-2 inline-flex">
              <div className="justify-start items-center gap-1 inline-flex">
                <div className="w-3.5 h-3.5 bg-green rounded-full" />
                <div className="text-gray-700 text-base font-bold   leading-normal">
                  10,6 mmol/L
                </div>
              </div>
              <div className="text-zinc-400 text-sm font-medium   leading-tight">
                Average glucose value{" "}
              </div>
            </div>
            <div className="grow shrink basis-0 flex-col justify-start items-center gap-2 inline-flex">
              <div className="justify-start items-center gap-1 inline-flex">
                <div className="w-3.5 h-3.5 bg-orange rounded-full" />
                <div className="text-gray-700 text-base font-bold   leading-normal">
                  12%{" "}
                </div>
                <div className="text-gray-700 text-base font-bold   leading-normal">
                  Very High{" "}
                </div>
              </div>
              <div className="text-zinc-400 text-sm font-medium   leading-tight">
                {">13.9 mmol/L "}
              </div>
            </div>
            <div className="grow shrink basis-0 flex-col justify-start items-center gap-2 inline-flex">
              <div className="justify-start items-center gap-1 inline-flex">
                <div className="w-3.5 h-3.5 bg-yellow rounded-full" />
                <div className="text-gray-700 text-base font-bold   leading-normal">
                  20%{" "}
                </div>
                <div className="text-gray-700 text-base font-bold   leading-normal">
                  High{" "}
                </div>
              </div>
              <div className="text-zinc-400 text-sm font-medium   leading-tight">
                {" "}
                9.9 - 13.9 mmol/L
              </div>
            </div>
            <div className="grow shrink basis-0 flex-col justify-start items-center gap-2 inline-flex">
              <div className="justify-start items-center gap-1 inline-flex">
                <div className="w-3.5 h-3.5 bg-green rounded-full" />
                <div className="text-gray-700 text-base font-bold   leading-normal">
                  64%{" "}
                </div>
                <div className="text-gray-700 text-base font-bold   leading-normal">
                  In Range{" "}
                </div>
              </div>
              <div className="text-zinc-400 text-sm font-medium   leading-tight">
                3.9 - 9.9 mmol/L
              </div>
            </div>
            <div className="grow shrink basis-0 flex-col justify-start items-center gap-2 inline-flex">
              <div className="justify-start items-center gap-1 inline-flex">
                <div className="w-3.5 h-3.5 bg-burgundy rounded-full" />
                <div className="text-gray-700 text-base font-bold   leading-normal">
                  3%{" "}
                </div>
                <div className="text-gray-700 text-base font-bold   leading-normal">
                  Low
                </div>
              </div>
              <div className="text-zinc-400 text-sm font-medium   leading-tight">
                3 - 3.9 mmol/L
              </div>
            </div>
            <div className="grow shrink basis-0 flex-col justify-start items-center gap-2 inline-flex">
              <div className="justify-start items-center gap-1 inline-flex">
                <div className="w-3.5 h-3.5 bg-red rounded-full" />
                <div className="text-gray-700 text-base font-bold   leading-normal">
                  1%{" "}
                </div>
                <div className="text-gray-700 text-base font-bold   leading-normal">
                  Very Low
                </div>
              </div>
              <div className="text-zinc-400 text-sm font-medium   leading-tight">
                {"<3 mmol/L"}
              </div>
            </div>
          </div>
          <Events />
          <Notes />
        </div>
      ))}

       {!data && <img src={noDataChart} className="w-full blur-sm my-8"/>}
      {/* <p className="mt-10  text-black text-xl font-semibold leading-7">
        MOCKED data ↓ (test only){" "}
      </p> */}

      {/* <LineChart data={data1} {...config1} /> */}
    </section>
  );
};
