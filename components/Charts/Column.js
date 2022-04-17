import CanvasJSReact from "../../canvasjs.react";
const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSChart = CanvasJSReact.CanvasJSChart;
import React from "react";

const Column = () => {
  const options = {
    animationEnabled: true,
    // exportEnabled: true,
    theme: "light1", //"light1", "dark1", "dark2"
    title: {
      text: "Time vs Sale",
    },
    axisY: {
      includeZero: true,
    },
    data: [
      {
        type: "column",
        indexLabelFontColor: "#5A5757",
        // indexLabelPlacement: "outside",
        dataPoints: [
          { label: "Apple", y: 10 },
          { label: "Orange", y: 15 },
          { label: "Banana", y: 25 },
          { label: "Mango", y: 30 },
        ],
      },
    ],
  };
  return (
    <CanvasJSChart
      options={options}
      /* onRef = {ref => this.chart = ref} */
    />
  );
};

export default Column;
