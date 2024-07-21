import React from "react";
import ReactECharts from "echarts-for-react";

const HorizontalBarChartWithLine = ({ color, options}) => {
  console.log(options)
  const option = {
    xAxis: {
      type: "value",
      axisLine: {
        lineStyle: {
          color: color === "darkBlue" ? "#ffffff" : "#000",
        },
      },
      axisLabel: {
        color: color === "darkBlue" ? "#ffffff" : "#000",
      },
      axisTick: {
        show: false,
      },
      splitLine: {
        show: false,
      },
      splitArea: {
        show: false
    }
    },
    yAxis: {
      type: "category",
      axisLine: {
        lineStyle: {
          color: color === "darkBlue" ? "#ffffff" : "#000",
        },
      },
      axisTick: {
        show: false,
      },
      splitLine: {
        show: false,
      },
      axisLabel: {
        color: color === "darkBlue" ? "#ffffff" : "#000",
      },
      splitArea: {
        show: false
    },
      data: options?.length ? options?.map(v => v?.city): [
        "Tuecaloosa",
        "Montgomery",
        "Mobile",
        "Huntsvile",
        "Hoover",
        "Florence",
        "Decature",
        "Auburn",
      ],
    },
    series: [
      {
        data: options?.length ? options?.map(v => v?.sales): [120, 200, 150, 80, 70, 110, 130, 200],
        type: "bar",
        showBackground: true,
        backgroundStyle: {
          color: "#d6eff3",
        },
        itemStyle: {
          color: "#8bd0e0",
        },
      },
    ],
  };

  return (
    <div style={{ height: "400px", width: "100%" }}>
      <ReactECharts option={option} theme="light" />
    </div>
  );
};

export default HorizontalBarChartWithLine;
