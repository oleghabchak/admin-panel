import { Line } from '@ant-design/plots';
import React from 'react';
import ReactDOM from 'react-dom';
import berry from "../../assets/lineChart/Photo.png";
import icon from "../../assets/lineChart/Marks.svg";

const DemoLine = () => {
  const config = {
    data: [{"date":1,"value":3},{"date":2,"value":5},{"date":3,"value":3},{"date":4,"value":11},{"date":5,"value":16},{"date":6,"value":18},{"date":7,"value":5},{"date":8,"value":6},{"date":9,"value":1},{"date":10,"value":7}],
    xField: "date",
    // xField: (d) => new Date(d.date),
    yField: 'value',
    // shapeField: 'hvh',
    colorField: 'value',
    axis: {
      x: { title: 'date' },
    },
    style: {
      gradient: 'y',
      lineWidth: 2,
      // lineJoin: 'round',
    },
    scale: {
      x: { utc: true },
      y: { nice: true },
      color: { type: 'threshold', domain: [ 3,5,10,15], range: ['black','#DA5A6A', '#52B4A8', '#EFD861','#E6834A'] },
    },
    tooltip: {
      title: 'a',
      items: [{ channel: 'x' }, { channel: 'y' }],
    },
    annotations: [
      {
        data: [
          {
            date: 8,
            value: 6,
            url: icon,
          },
        ],
        type: "image",
        xField: 'date',
        yField: 'value',
        srcField: 'url',
      },
    ],
  };
  return <Line {...config} />;
};

export default DemoLine;

// import { Line } from '@ant-design/plots';

// const DemoLine = () => {
//   const config = {
//     data: {
//       type: 'fetch',
//       value: 'https://gw.alipayobjects.com/os/antvdemo/assets/data/blockchain.json',
//       transform: [
//         {
//           type: 'fold',
//           fields: ['blockchain', 'nlp'],
//           key: 'type',
//           value: 'value',
//         },
//       ],
//     },
//     xField: (d) => new Date(d.date),
//     yField: 'value',
//     // shapeField: 'hvh',
//     colorField: 'type',
//     axis: {
//       x: { labelAutoHide: 'greedy' },
//     },
//     point: {
//       shapeField: 'square',
//       image:'',
//       sizeField: 1,
//     },
//     tooltip: {
//       title: 'a',
//       items:  [
//         {
//           name: "Internet Explorer",
//           value: 55,
//           url: "https://gw.alipayobjects.com/zos/rmsportal/eOYRaLPOmkieVvjyjTzM.png",
//         }],
//         type: "image",

//     },
//     // annotations: [
//     //   {
//     //     data: [
//     //       {
//     //         name: "Internet Explorer",
//     //         value: 62.7,
//     //         url: "https://gw.alipayobjects.com/zos/rmsportal/eOYRaLPOmkieVvjyjTzM.png",
//     //       },
//     //       {
//     //         name: "Chrome",
//     //         value: 49,
//     //         url: "https://gw.alipayobjects.com/zos/rmsportal/dWJWRLWfpOEbwCyxmZwu.png",
//     //       },
//     //     ],
//     //     type: "image",
//     //     onclick: console.log('STATE',1234),
//     //     xField: 'value',
//     //     yField: 'value',
//     //     srcField: 'url',
//     //     scale: { x: { type: "band" }, y: { domain: [0, 50] } },
//     //   },
//     // ],
//     style: {
//       gradient: 'y',
//       lineWidth: 2,
//       // lineJoin: 'vertical',
//     },
//     // scale: {
//     //   x: { utc: true },
//     //   y: { nice: true },
//     //   color: { type: 'threshold', domain: [45,50,55,63], range: ['black','#DA5A6A', '#52B4A8', '#EFD861','#E6834A'] },
//     // },
//   };
//   return <Line {...config} />;
// };
// export default DemoLine;
