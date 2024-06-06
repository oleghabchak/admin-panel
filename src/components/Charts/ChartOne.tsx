import { ApexOptions } from "apexcharts";
import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";
import icon from "../../assets/lineChart/Marks.svg";
import berry from "../../assets/lineChart/Photo.png";
const hours = [
  "12 am",
  "1 am",
  "2 am",
  "3 am",
  "4 am",
  "5 am",
  "6 am",
  "7 am",
  "8 am",
  "9 am",
  "10 am",
  "11 am",
  "12 pm",
  "1 pm",
  "2 pm",
  "3 pm",
  "4 pm",
  "5 pm",
  "6 pm",
  "7 pm",
  "8 pm",
  "9 pm",
  "10 pm",
  "11 pm",
  "12 am",
];
const options: ApexOptions = {
  legend: {
    show: false,
    position: "top",
    horizontalAlign: "left",
  },
  colors: ["red", "green",],
  chart: {
    fontFamily: "Urbanist",
    height: 335,
    type: "line",

    toolbar: {
      show: false,
    },
  },
  fill: {
    type: "gradient",
    gradient: {
      type: "vertical",
      shadeIntensity: 0,
      opacityFrom: 1,
      opacityTo: 1,
      colorStops: [
        {
          offset: 45,
          color: "#EFD861",
          opacity: 1
        },
        {
          offset: 45,
          color: "#52B4A8",
          opacity: 1
        },
        {
          offset: 83,
          color: "#52B4A8",
          opacity: 1
        },
        {
          offset: 83,
          color: "#DA5A6A",
          opacity: 1
        }
      ]   }
    
  },
  annotations: {
    yaxis: [ {
      y: 11.9,
      y2: 12.1,
      borderColor: 'transparent',
      fillColor: '#EFD861',
      opacity: 1,
      label: {
        borderColor: '#333',
        style: {
          fontSize: '10px',
          color: '#333',
          background: '#FEB019',
        },
        // text: 'Y-axis range',
      }
    },{
      y: 4.2,
      y2: 4.4,
      borderColor: 'transparent',
      fillColor: '#DA5A6A',
      opacity: 1,
      label: {
        borderColor: '#333',
        style: {
          fontSize: '10px',
          color: '#333',
          background: '#FEB019',
        },
        // text: 'Y-axis range',
      }
    }],
    xaxis: [{
      x: new Date('23 Nov 2017').getTime(),
      strokeDashArray: 0,
      borderColor: '#775DD0',
      label: {
        borderColor: '#775DD0',
        style: {
          color: '#fff',
          background: '#775DD0',
        },
        text: 'Anno Test',
      }
    }, {
      x: new Date('26 Nov 2017').getTime(),
      x2: new Date('28 Nov 2017').getTime(),
      fillColor: '#B3F7CA',
      opacity: 0.4,
      label: {
        borderColor: '#B3F7CA',
        style: {
          fontSize: '10px',
          color: '#fff',
          background: '#00E396',
        },
        offsetY: -10,
        text: 'X-axis range',
      }
    }],
    points: [ {
      x: 241,
      y: 17.3,
      image: {
        path: icon,
        width:24
      }
    }]
  },
  responsive: [
    {
      breakpoint: 1024,
      options: {
        chart: {
          height: 300,
        },
      },
    },
    {
      breakpoint: 1366,
      options: {
        chart: {
          height: 350,
        },
      },
    },
  ],
  stroke: {
    width: [3, 3],
    curve: "straight",
  },
  // labels: {
  //   show: false,
  //   position: "top",
  // },
  grid: {
    xaxis: {
      lines: {
        show: true,
      },
    },
    yaxis: {
      lines: {
        show: true,
      },
    },
  },
  dataLabels: {
    enabled: false,
  },
  markers: {
    size: 0,
    colors: "#fff",
    strokeColors: ["#3056D3", "#80CAEE"],
    strokeWidth: 0,
    strokeOpacity: 0.9,
    strokeDashArray: 0,
    fillOpacity: 1,
    discrete: [],
    hover: {
      size: undefined,
      sizeOffset: 5,
    },
  },
  xaxis: {
    type: "category",
    categories: hours,

    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    title: {
      style: {
        fontSize: "0px",
      },
    },

    min: 0,
    max: 21.0,
  },
  tooltip: {
    custom: function({ series, seriesIndex, dataPointIndex, w }) {
      var country = w.globals.labels[dataPointIndex];
      var value = series[seriesIndex][dataPointIndex];
      var imageUrl = '../../assets/lineChart/Photo.png';


      return (
        '<div class="arrow_box" style="display: flex; align-items: center;">' +
          '<img src="' + berry + '" alt="' + country + ' flag" style="width: 80px; height: 50px; margin-right: 8px;" />' +
          "<span>" +
            country +
            ": " +
            value +
          "</span>" +
        "</div>"
      );
    }
  }
}

interface ChartOneState {
  series: {
    name: string;
    data: number[];
  }[];
}

const ChartOne: React.FC = () => {
  const [state, setState] = useState<ChartOneState>({
    series: [
      {
        name: "Glucose level",
        data: [21,0
        ],
      },
      {
        name: "Glucose level",
        data: [
          12, 14, 1, 19, 13, 12, 17, 11, 4, 2, 10, 5, 11, 12, 17, 3, 12, 7, 21,
          4, 4, 4, 5,  15,
        ],
      },
    ],
  });

  const handleReset = () => {
    setState((prevState) => ({
      ...prevState,
    }));
  };
  handleReset;

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-8">
      {/* <div className="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
        <div className="flex w-full flex-wrap gap-3 sm:gap-5">
          <div className="flex min-w-47.5">
            <span className="mt-1 mr-2 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-primary">
              <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-primary"></span>
            </span>
            <div className="w-full">
              <p className="font-semibold text-primary">Total Revenue</p>
              <p className="text-sm font-medium">12.04.2022 - 12.05.2022</p>
            </div>
          </div>
          <div className="flex min-w-47.5">
            <span className="mt-1 mr-2 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-secondary">
              <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-secondary"></span>
            </span>
            <div className="w-full">
              <p className="font-semibold text-secondary">Total Sales</p>
              <p className="text-sm font-medium">12.04.2022 - 12.05.2022</p>
            </div>
          </div>
        </div>
        <div className="flex w-full max-w-45 justify-end">
          <div className="inline-flex items-center rounded-md bg-whiter p-1.5 dark:bg-meta-4">
            <button className="rounded bg-white py-1 px-3 text-xs font-medium text-black shadow-card hover:bg-white hover:shadow-card dark:bg-boxdark dark:text-white dark:hover:bg-boxdark">
              Day
            </button>
            <button className="rounded py-1 px-3 text-xs font-medium text-black hover:bg-white hover:shadow-card dark:text-white dark:hover:bg-boxdark">
              Week
            </button>
            <button className="rounded py-1 px-3 text-xs font-medium text-black hover:bg-white hover:shadow-card dark:text-white dark:hover:bg-boxdark">
              Month
            </button>
          </div>
        </div>
      </div> */}

      <div>
        <div id="chartOne" className="-ml-5">
          <img src={berry} alt="" />
          <ReactApexChart
            options={options}
            series={state.series}
            type="line"
            height={350}
          />
        </div>
      </div>
    </div>
  );
};

export default ChartOne;
