import React, { useEffect, useRef, useState } from "react";
import { LineChart, LineChartProps } from "@opd/g2plot-react";
import { Line } from "@antv/g2plot";
import insertCss from "insert-css";
import noDataChart from "../../assets/no-data-icon/noDataChart.svg";
import { useAppStore } from "../../store/AppStoreProvider";
import { toJS } from "mobx";
import { format } from "date-fns";
import Events from "../../pages/Daily/Events";
import Notes from "../../pages/Daily/Notes";

const transformData = (data) => {
  if (!data || data.length === 0) {
    return [];
  }

  // Define the new date to be used
  const newDate = "2024-01-01";

  // Transform the data
  const transformedData = data.map((item) => {
    // Extract the necessary properties from the item
    const { id, measurementUnit, day, value } = item;

    // Extract the time part from the original timestamp
    const timePart = item.timestamp.substring(11, 19);

    // Construct the new timestamp with the specified date and the extracted time
    const timestamp = `${newDate}T${timePart}.000Z`;

    // Return the transformed object
    return { id, measurementUnit, day, timestamp, value };
  });

  // Sort the transformed data by timestamp in ascending order
  transformedData.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

  return transformedData;
};

const data1 = [
  // Monday
  { timestamp: "00:00", day: "monday", value: 5 },
  { timestamp: "01:00", day: "monday", value: 12 },
  { timestamp: "02:00", day: "monday", value: 7 },
  { timestamp: "03:00", day: "monday", value: 10 },
  { timestamp: "04:00", day: "monday", value: 3 },
  { timestamp: "05:00", day: "monday", value: 19 },

  {
    id: "6650b0977dd8264f333b3c8a",
    timestamp: "2024-05-15T00:01:52.000Z",
    value: 7.21,
    measurementUnit: "mmol/L",
    day: "wednesday",
  },
  {
    id: "6650b0977dd8264f333b3c8b",
    timestamp: "2024-05-15T00:06:52.000Z",
    value: 7.16,
    measurementUnit: "mmol/L",
    day: "wednesday",
  },
  {
    id: "6650b0977dd8264f333b3c8c",
    timestamp: "2024-05-15T00:11:52.000Z",
    value: 1.99,
    measurementUnit: "mmol/L",
    day: "wednesday",
  },
  {
    id: "6650b0977dd8264f333b3c8d",
    timestamp: "2024-05-15T00:16:52.000Z",
    value: 6.88,
    measurementUnit: "mmol/L",
    day: "wednesday",
  },
  {
    id: "6650b0977dd8264f333b3c8e",
    timestamp: "2024-05-15T00:21:52.000Z",
    value: 12.77,
    measurementUnit: "mmol/L",
    day: "wednesday",
  },
  {
    id: "6650b0977dd8264f333b3c8f",
    timestamp: "2024-05-15T00:26:52.000Z",
    value: 6.72,
    measurementUnit: "mmol/L",
    day: "wednesday",
  },
  {
    id: "6650b0977dd8264f333b3c90",
    timestamp: "2024-05-15T00:31:52.000Z",
    value: 6.72,
    measurementUnit: "mmol/L",
    day: "wednesday",
  },
  {
    id: "6650b0977dd8264f333b3c91",
    timestamp: "2024-05-15T00:36:52.000Z",
    value: 6.66,
    measurementUnit: "mmol/L",
    day: "wednesday",
  },
  {
    id: "6650b0977dd8264f333b3c92",
    timestamp: "2024-05-15T00:41:52.000Z",
    value: 6.66,
    measurementUnit: "mmol/L",
    day: "wednesday",
  },

  { timestamp: "06:00", day: "monday", value: 2 },
  { timestamp: "07:00", day: "monday", value: 17 },
  { timestamp: "08:00", day: "monday", value: 1 },
  { timestamp: "09:00", day: "monday", value: 6 },
  { timestamp: "10:00", day: "monday", value: 14 },
  { timestamp: "11:00", day: "monday", value: 9 },
  { timestamp: "12:00", day: "monday", value: 20 },
  { timestamp: "13:00", day: "monday", value: 11 },
  { timestamp: "14:00", day: "monday", value: 4 },
  { timestamp: "15:00", day: "monday", value: 15 },
  { timestamp: "16:00", day: "monday", value: 8 },
  { timestamp: "17:00", day: "monday", value: 13 },
  { timestamp: "18:00", day: "monday", value: 16 },
  { timestamp: "19:00", day: "monday", value: 18 },
  { timestamp: "20:00", day: "monday", value: 7 },
  { timestamp: "21:00", day: "monday", value: 5 },
  { timestamp: "22:00", day: "monday", value: 21 },
  { timestamp: "23:00", day: "monday", value: 14 },

  // Tuesday
  { timestamp: "00:00", day: "tuesday", value: 6 },
  { timestamp: "01:00", day: "tuesday", value: 18 },
  { timestamp: "02:00", day: "tuesday", value: 11 },
  { timestamp: "03:00", day: "tuesday", value: 3 },
  { timestamp: "04:00", day: "tuesday", value: 13 },
  { timestamp: "05:00", day: "tuesday", value: 2 },
  { timestamp: "06:00", day: "tuesday", value: 8 },
  { timestamp: "07:00", day: "tuesday", value: 17 },
  { timestamp: "08:00", day: "tuesday", value: 4 },
  { timestamp: "09:00", day: "tuesday", value: 16 },
  { timestamp: "10:00", day: "tuesday", value: 12 },
  { timestamp: "11:00", day: "tuesday", value: 7 },
  { timestamp: "12:00", day: "tuesday", value: 15 },
  { timestamp: "13:00", day: "tuesday", value: 9 },
  { timestamp: "14:00", day: "tuesday", value: 20 },
  { timestamp: "15:00", day: "tuesday", value: 1 },
  { timestamp: "16:00", day: "tuesday", value: 5 },
  { timestamp: "17:00", day: "tuesday", value: 19 },
  { timestamp: "18:00", day: "tuesday", value: 14 },
  { timestamp: "19:00", day: "tuesday", value: 10 },
  { timestamp: "20:00", day: "tuesday", value: 21 },
  { timestamp: "21:00", day: "tuesday", value: 8 },
  { timestamp: "22:00", day: "tuesday", value: 6 },
  { timestamp: "23:00", day: "tuesday", value: 12 },

  // Thursday
  { timestamp: "00:00", day: "thursday", value: 14 },
  { timestamp: "01:00", day: "thursday", value: 11 },
  { timestamp: "02:00", day: "thursday", value: 7 },
  { timestamp: "03:00", day: "thursday", value: 19 },
  { timestamp: "04:00", day: "thursday", value: 8 },
  { timestamp: "05:00", day: "thursday", value: 17 },
  { timestamp: "06:00", day: "thursday", value: 3 },
  { timestamp: "07:00", day: "thursday", value: 20 },
  { timestamp: "08:00", day: "thursday", value: 5 },
  { timestamp: "09:00", day: "thursday", value: 13 },
  { timestamp: "10:00", day: "thursday", value: 16 },
  { timestamp: "11:00", day: "thursday", value: 1 },
  { timestamp: "12:00", day: "thursday", value: 6 },
  { timestamp: "13:00", day: "thursday", value: 12 },
  { timestamp: "14:00", day: "thursday", value: 21 },
  { timestamp: "15:00", day: "thursday", value: 9 },
  { timestamp: "16:00", day: "thursday", value: 2 },
  { timestamp: "17:00", day: "thursday", value: 18 },
  { timestamp: "18:00", day: "thursday", value: 10 },
  { timestamp: "19:00", day: "thursday", value: 4 },
  { timestamp: "20:00", day: "thursday", value: 15 },
  { timestamp: "21:00", day: "thursday", value: 11 },
  { timestamp: "22:00", day: "thursday", value: 8 },
  { timestamp: "23:00", day: "thursday", value: 13 },

  // Friday
  { timestamp: "00:00", day: "friday", value: 9 },
  { timestamp: "01:00", day: "friday", value: 14 },
  { timestamp: "02:00", day: "friday", value: 11 },
  { timestamp: "03:00", day: "friday", value: 20 },
  { timestamp: "04:00", day: "friday", value: 6 },
  { timestamp: "05:00", day: "friday", value: 13 },
  { timestamp: "06:00", day: "friday", value: 3 },
  { timestamp: "07:00", day: "friday", value: 15 },
  { timestamp: "08:00", day: "friday", value: 10 },
  { timestamp: "09:00", day: "friday", value: 1 },
  { timestamp: "10:00", day: "friday", value: 18 },
  { timestamp: "11:00", day: "friday", value: 7 },
  { timestamp: "12:00", day: "friday", value: 4 },
  { timestamp: "13:00", day: "friday", value: 19 },
  { timestamp: "14:00", day: "friday", value: 8 },
  { timestamp: "15:00", day: "friday", value: 17 },
  { timestamp: "16:00", day: "friday", value: 21 },
  { timestamp: "17:00", day: "friday", value: 5 },
  { timestamp: "18:00", day: "friday", value: 12 },
  { timestamp: "19:00", day: "friday", value: 2 },
  { timestamp: "20:00", day: "friday", value: 16 },
  { timestamp: "21:00", day: "friday", value: 9 },
  { timestamp: "22:00", day: "friday", value: 11 },
  { timestamp: "23:00", day: "friday", value: 8 },

  // Saturday
  { timestamp: "00:00", day: "saturday", value: 13 },
  { timestamp: "01:00", day: "saturday", value: 7 },
  { timestamp: "02:00", day: "saturday", value: 18 },
  { timestamp: "03:00", day: "saturday", value: 5 },
  { timestamp: "04:00", day: "saturday", value: 21 },
  { timestamp: "05:00", day: "saturday", value: 6 },
  { timestamp: "06:00", day: "saturday", value: 10 },
  { timestamp: "07:00", day: "saturday", value: 14 },
  { timestamp: "08:00", day: "saturday", value: 3 },
  { timestamp: "09:00", day: "saturday", value: 19 },
  { timestamp: "10:00", day: "saturday", value: 12 },
  { timestamp: "11:00", day: "saturday", value: 4 },
  { timestamp: "12:00", day: "saturday", value: 16 },
  { timestamp: "13:00", day: "saturday", value: 8 },
  { timestamp: "14:00", day: "saturday", value: 11 },
  { timestamp: "15:00", day: "saturday", value: 17 },
  { timestamp: "16:00", day: "saturday", value: 1 },
  { timestamp: "17:00", day: "saturday", value: 15 },
  { timestamp: "18:00", day: "saturday", value: 9 },
  { timestamp: "19:00", day: "saturday", value: 20 },
  { timestamp: "20:00", day: "saturday", value: 2 },
  { timestamp: "21:00", day: "saturday", value: 13 },
  { timestamp: "22:00", day: "saturday", value: 7 },
  { timestamp: "23:00", day: "saturday", value: 14 },

  // Sunday
  { timestamp: "00:00", day: "sunday", value: 18 },
  { timestamp: "01:00", day: "sunday", value: 11 },
  { timestamp: "02:00", day: "sunday", value: 6 },
  { timestamp: "03:00", day: "sunday", value: 19 },
  { timestamp: "04:00", day: "sunday", value: 5 },
  { timestamp: "05:00", day: "sunday", value: 13 },
  { timestamp: "06:00", day: "sunday", value: 7 },
  { timestamp: "07:00", day: "sunday", value: 10 },
  { timestamp: "08:00", day: "sunday", value: 21 },
  { timestamp: "09:00", day: "sunday", value: 3 },
  { timestamp: "10:00", day: "sunday", value: 17 },
  { timestamp: "11:00", day: "sunday", value: 1 },
  { timestamp: "12:00", day: "sunday", value: 15 },
  { timestamp: "13:00", day: "sunday", value: 8 },
  { timestamp: "14:00", day: "sunday", value: 12 },
  { timestamp: "15:00", day: "sunday", value: 20 },
  { timestamp: "16:00", day: "sunday", value: 9 },
  { timestamp: "17:00", day: "sunday", value: 2 },
  { timestamp: "18:00", day: "sunday", value: 14 },
  { timestamp: "19:00", day: "sunday", value: 4 },
  { timestamp: "20:00", day: "sunday", value: 11 },
  { timestamp: "21:00", day: "sunday", value: 16 },
  { timestamp: "22:00", day: "sunday", value: 6 },
  { timestamp: "23:00", day: "sunday", value: 18 },
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
  style: { marginBottom: 0 },
  autoFit: true,
  // data: data1,
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

        const date = new Date(v);

        // Check for invalid date
        if (isNaN(date.getTime())) {
          return "";
        }

        // Format the date to "h aaa" (e.g., "1 AM")
        return format(date, "h aaa");
      },
    },
  },
  legend: {
    position: "top-left",
    itemName: {
      style: {
        fill: "#000",
      },
      formatter: (name) => name,
    },
    itemMarginBottom: 122,
    marker: {
      style: ({ day }) => {
        let style;

        switch (day) {
          case "monday":
            style = {
              lineDash: [3, 3],
              stroke: "#C0448E",
              opacity: 1,
            };
            break;
          case "tuesday":
            style = {
              lineDash: [2, 4],
              stroke: "#8460B3",
              opacity: 1,
            };
            break;
          case "wednesday":
            style = {
              stroke: "#3B8AAB",
              opacity: 1,
            };
            break;
          case "thursday":
            style = {
              lineDash: [1, 2],
              stroke: "#C08FFF",
              opacity: 1,
            };
            break;
          case "friday":
            style = {
              lineDash: [3, 4],
              stroke: "#2424E4",
              opacity: 1,
            };
            break;
          case "saturday":
            style = {
              lineDash: [12, 8],
              stroke: "#FF65DD",
              opacity: 1,
            };
            break;
          case "sunday":
            style = {
              lineDash: [10, 4],
              stroke: "#22C9E3",
              opacity: 1,
            };
            break;
          default:
            style = {
              lineDash: [10, 4],
              stroke: "#22C9E3",
              opacity: 1,
            };
            break;
        }

        return style;
      },
    },
  },
  tooltip: {
    showMarkers: false,
    enterable: true,
    domStyles: {
      "g2-tooltip": {
        width: "150px",
        padding: 0,
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

  // annotations: [
  //   {
  //     type: "html",
  //     position: ["09:00", 16],
  //     html: (container, view) => {
  //       return `<div style="transform:translate(-50%,-46%)">
  //           <img width="24" height="24" alt="" src=${icon}>
  //         </div>`;
  //     },
  //   },
  //   {
  //     type: "html",
  //     position: ["11:00", 18],
  //     html: (container, view) => {
  //       return `<div style="transform:translate(-50%,-46%)">
  //           <img width="24" height="24" alt="" src=${icon2}>
  //         </div>`;
  //     },
  //   },
  //   {
  //     type: "regionFilter",
  //     start: [0, "max"],
  //     end: ["max", 13.9],
  //     color: "#E6834A",
  //   },
  //   {
  //     type: "regionFilter",
  //     start: [0, 13.9],
  //     end: ["max", 9.9],
  //     color: "#EFD861",
  //   },
  //   {
  //     type: "regionFilter",
  //     start: [0, 9.9],
  //     end: ["max", 3.9],
  //     color: "#52B4A8",
  //   },
  //   {
  //     type: "regionFilter",
  //     start: [0, 3.9],
  //     end: ["max", 3],
  //     color: "#DA5A6A",
  //   },
  //   {
  //     type: "regionFilter",
  //     start: [0, 3],
  //     end: ["max", 0],
  //     color: "#B54957",
  //   },
  //   {
  //     type: "line",
  //     start: [0, 9.9],
  //     end: ["max", 9.9],
  //     style: {
  //       stroke: "#EFD861",
  //       lineWidth: 2,
  //       height: 2,
  //     },
  //   },
  //   {
  //     type: "line",
  //     start: [0, 3.9],
  //     end: ["max", 3.9],
  //     style: {
  //       stroke: "#DA5A6A",
  //       lineWidth: 2,
  //       height: 2,
  //     },
  //   },
  // ],
  seriesField: "day",
  lineStyle: ({ day }) => {
    let lineStyle;

    switch (day) {
      case "monday":
        lineStyle = {
          lineDash: [3, 3],
          stroke: "#C0448E",
          opacity: 1,
        };
        break;
      case "tuesday":
        lineStyle = {
          lineDash: [2, 4],
          stroke: "#8460B3",
          opacity: 1,
        };
        break;
      case "wednesday":
        lineStyle = {
          stroke: "#3B8AAB",
          opacity: 1,
        };
        break;
      case "thursday":
        lineStyle = {
          lineDash: [1, 2],
          stroke: "#C08FFF",
          opacity: 1,
        };
        break;
      case "friday":
        lineStyle = {
          lineDash: [3, 4],
          stroke: "#2424E4",
          opacity: 1,
        };
        break;
      case "saturday":
        lineStyle = {
          lineDash: [12, 8],
          stroke: "#FF65DD",
          opacity: 1,
        };
        break;
      case "sunday":
        lineStyle = {
          lineDash: [10, 4],
          stroke: "#22C9E3",
          opacity: 1,
        };
        break;
      default:
        lineStyle = {
          opacity: 0.5,
        };
        break;
    }

    return lineStyle;
  },
};

export default ({ data }) => {
  const [glucoseData, setGlucoseData] = useState();
  const store = useAppStore();

  useEffect(() => {
    if (data && data.data) {
      setGlucoseData(transformData(data.data));
    } else {
      setGlucoseData([]);
    }
  }, [data]);

  // const lineChartRef = useRef<Line>();

  // useEffect(() => {
  //   if (lineChartRef.current) {
  //     const plot = lineChartRef.current;
  //     plot.on("line:click", (e) => {
  //       console.log(e);
  //     });
  //   }
  // }, []);
  console.log("STATEdata", toJS(data.data));
  console.log("STATglucoseData", glucoseData);
  // console.log('STATE',toJS(transformData(data?.[0]?.glucoseData)))
  return (
    <section>
      <div className="w-full mt-10 h-7 justify-between items-center inline-flex">
        <div className="flex-col">
          <div className="text-black text-base font-bold leading-6">Week 1</div>
          <div className="text-black text-base font-medium leading-6">
            {format(new Date(store.startDate), "EEE, d MMM YYY")} -{" "}
            {format(new Date(store.endDate), "EEE, d MMM YYY")}
          </div>
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

      {glucoseData?.[0] ? (
        <LineChart data={glucoseData} {...config1} />
      ) : (
        <img
          src={noDataChart}
          className="w-full blur-sm my-8
        "
        />
      )}
      <div className="w-96 h-48 justify-start items-start gap-6 border-dotted inline-flex">
        <div className="w-12  flex-col justify-start items-center gap-1 inline-flex">
          <div className="text-center text-gray-700 text-base font-bold  leading-normal">
            Mon
          </div>
          <div
            style={{
              content: "",
              display: "block",
              width: 48,
              height: 2,
              background:
                "repeating-linear-gradient( 90deg, transparent,  transparent 4px, #C0448E 4px, #C0448E 7px )",
            }}
          />
        </div>
        <div className="w-12  flex-col justify-start items-center gap-1 inline-flex">
          <div className="text-center text-gray-700 text-base font-bold  leading-normal">
            Tue
          </div>
          <div
            style={{
              content: "",
              display: "block",
              width: 48,
              height: 2,
              background:
                "repeating-linear-gradient( 90deg, transparent,  transparent 3px, #8460B3 3px, #8460B3 6px )",
            }}
          />
        </div>
        <div className="w-12  flex-col justify-start items-center gap-1 inline-flex">
          <div className="text-center text-gray-700 text-base font-bold  leading-normal">
            Wed
          </div>
          <div
            style={{
              content: "",
              display: "block",
              width: 48,
              height: 2,
              background:
                "#3B8AAB",
            }}
          />
        </div>
        <div className="w-12  flex-col justify-start items-center gap-1 inline-flex">
          <div className="text-center text-gray-700 text-base font-bold  leading-normal">
            Thu
          </div>
          <div
            style={{
              content: "",
              display: "block",
              width: 48,
              height: 2,
              background:
                "repeating-linear-gradient( 90deg, transparent,  transparent 1px, #C08FFF 2px, #C08FFF 4px )",
            }}
          />
        </div>
        <div className="w-12  flex-col justify-start items-center gap-1 inline-flex">
          <div className="text-center text-gray-700 text-base font-bold  leading-normal">
            Fri
          </div>
          <div
            style={{
              content: "",
              display: "block",
              width: 48,
              height: 2,
              background:
                "repeating-linear-gradient( 90deg, transparent, transparent 4px, #2424E4 4px, #2424E4 11px )",
            }}
          />
        </div>
        <div className="w-12  flex-col justify-start items-center gap-1 inline-flex">
          <div className="text-center text-gray-700 text-base font-bold  leading-normal">
            Sat
          </div>
          <div
            style={{
              content: "",
              display: "block",
              width: 48,
              height: 2,
              background:
                "repeating-linear-gradient( 90deg, transparent,  transparent 6px, #FF65DD 2px, #FF65DD 16px )",
            }}
          />
        </div>
        <div className="w-12  flex-col justify-start items-center gap-1 inline-flex">
          <div className="text-center text-gray-700 text-base font-bold  leading-normal">
            Sun
          </div>
          <div
            style={{
              content: "",
              display: "block",
              width: 48,
              height: 2,
              background:
              "repeating-linear-gradient( 90deg, transparent,  transparent 2px, #22C9E3 2px, #22C9E3 16px )",
            }}
          />
        </div>

      </div>
    </section>
  );
};
